const { sendError } = require('../utils/response.utils');
const School = require('../models/School.model');
const Subscription = require('../models/Subscription.model');

// Attaches req.subscription — used by chapter and discussion routes to enforce paywall
const loadSubscription = async (req, res, next) => {
  try {
    // Superadmin bypasses all paywall checks
    if (req.user.role === 'superadmin') {
      req.subscription = { plan: 'premium', features: Subscription.planFeatures('premium'), active: true };
      return next();
    }

    if (!req.user.school) {
      req.subscription = null;
      return next();
    }

    const school = await School.findById(req.user.school).populate('subscription');
    if (!school || !school.subscription) {
      req.subscription = null;
      return next();
    }

    const sub = school.subscription;
    req.subscription = {
      plan: sub.plan,
      features: sub.features,
      active: sub.isActive(),
      end_date: sub.end_date,
    };
    next();
  } catch (err) {
    return sendError(res, 500, 'Failed to load subscription info.');
  }
};

// Gate: chapter must be free OR subscription must be active
const requireSubscription = (req, res, next) => {
  const chapter = req.chapter; // set by prior middleware if needed
  if (chapter && chapter.is_free) return next();

  if (!req.subscription || !req.subscription.active) {
    return sendError(
      res,
      403,
      'This content requires an active subscription.',
      { code: 'SUBSCRIPTION_REQUIRED' }
    );
  }
  next();
};

// Gate: specific feature (e.g. 'discussions', 'analytics')
const requireFeature = (feature) => (req, res, next) => {
  if (!req.subscription || !req.subscription.features[feature]) {
    return sendError(
      res,
      403,
      `Your current plan does not include access to ${feature}.`,
      { code: 'FEATURE_NOT_INCLUDED' }
    );
  }
  next();
};

module.exports = { loadSubscription, requireSubscription, requireFeature };
