const crypto = require('crypto');
const Subscription = require('../models/Subscription.model');
const School = require('../models/School.model');
const razorpay = require('../config/razorpay');
const { sendSuccess, sendError } = require('../utils/response.utils');

// Plan pricing in paise (INR × 100)
const PLAN_PRICES = {
  basic: 199900,   // ₹1,999/year
  premium: 499900, // ₹4,999/year
};

// ── POST /api/v1/subscriptions/order ────────────────────────────────────────
// Creates a Razorpay order for a plan upgrade
const createOrder = async (req, res) => {
  try {
    const { plan, school_id } = req.body;

    if (!['basic', 'premium'].includes(plan)) {
      return sendError(res, 400, 'Invalid plan. Choose basic or premium.');
    }
    if (!school_id) return sendError(res, 400, 'school_id is required.');

    const school = await School.findById(school_id);
    if (!school) return sendError(res, 404, 'School not found.');

    // Only superadmin or that school's admin can upgrade
    if (
      req.user.role !== 'superadmin' &&
      school._id.toString() !== req.user.school?.toString()
    ) {
      return sendError(res, 403, 'Not authorised to upgrade this school.');
    }

    const amount = PLAN_PRICES[plan];
    const receipt = `geeta_${school_id}_${Date.now()}`;

    const order = await razorpay.orders.create({
      amount,
      currency: 'INR',
      receipt,
      notes: { school_id, plan },
    });

    return sendSuccess(res, 201, 'Razorpay order created.', {
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
      plan,
      school_id,
    });
  } catch (err) {
    return sendError(res, 500, err.message);
  }
};

// ── POST /api/v1/subscriptions/verify ────────────────────────────────────────
// Verifies Razorpay payment signature and activates subscription
const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      school_id,
      plan,
    } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return sendError(res, 400, 'Missing payment fields.');
    }

    // Verify HMAC signature
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      return sendError(res, 400, 'Payment verification failed. Invalid signature.');
    }

    const school = await School.findById(school_id).populate('subscription');
    if (!school) return sendError(res, 404, 'School not found.');

    const features = Subscription.planFeatures(plan);
    const startDate = new Date();
    const endDate = new Date(startDate);
    endDate.setFullYear(endDate.getFullYear() + 1); // 1-year subscription

    let subscription;
    if (school.subscription) {
      // Update existing subscription
      subscription = await Subscription.findByIdAndUpdate(
        school.subscription._id,
        {
          plan,
          status: 'active',
          start_date: startDate,
          end_date: endDate,
          amount: PLAN_PRICES[plan],
          currency: 'INR',
          razorpay_order_id,
          razorpay_payment_id,
          razorpay_signature,
          features,
        },
        { new: true }
      );
    } else {
      // Create new subscription
      subscription = await Subscription.create({
        school: school_id,
        plan,
        status: 'active',
        start_date: startDate,
        end_date: endDate,
        amount: PLAN_PRICES[plan],
        currency: 'INR',
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        features,
      });
      school.subscription = subscription._id;
      await school.save();
    }

    return sendSuccess(res, 200, 'Payment verified. Subscription activated.', {
      subscription: {
        id: subscription._id,
        plan: subscription.plan,
        status: subscription.status,
        end_date: subscription.end_date,
        features: subscription.features,
      },
    });
  } catch (err) {
    return sendError(res, 500, err.message);
  }
};

// ── POST /api/v1/subscriptions/webhook ──────────────────────────────────────
// Razorpay webhook for async events (payment.failed, subscription.cancelled, etc.)
const handleWebhook = async (req, res) => {
  try {
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
    if (webhookSecret) {
      const signature = req.headers['x-razorpay-signature'];
      const body = JSON.stringify(req.body);
      const expectedSig = crypto
        .createHmac('sha256', webhookSecret)
        .update(body)
        .digest('hex');

      if (signature !== expectedSig) {
        return res.status(400).json({ success: false, message: 'Invalid webhook signature.' });
      }
    }

    const { event, payload } = req.body;

    if (event === 'payment.failed') {
      const { order_id } = payload.payment.entity;
      await Subscription.findOneAndUpdate(
        { razorpay_order_id: order_id },
        { status: 'expired' }
      );
    }

    // Always return 200 to Razorpay
    res.status(200).json({ success: true });
  } catch (err) {
    // Still return 200 to avoid Razorpay retries for internal errors
    console.error('Webhook error:', err.message);
    res.status(200).json({ success: true });
  }
};

// ── GET /api/v1/subscriptions/:school_id ─────────────────────────────────────
// Returns the subscription for a school
const getSubscription = async (req, res) => {
  try {
    const school = await School.findById(req.params.school_id);
    if (!school) return sendError(res, 404, 'School not found.');

    // Access control
    if (
      req.user.role !== 'superadmin' &&
      school._id.toString() !== req.user.school?.toString()
    ) {
      return sendError(res, 403, 'Access denied.');
    }

    const subscription = await Subscription.findById(school.subscription);
    if (!subscription) return sendError(res, 404, 'No subscription found for this school.');

    return sendSuccess(res, 200, 'Subscription fetched.', {
      subscription: {
        id: subscription._id,
        plan: subscription.plan,
        status: subscription.isActive() ? 'active' : subscription.status,
        start_date: subscription.start_date,
        end_date: subscription.end_date,
        features: subscription.features,
        amount: subscription.amount,
      },
    });
  } catch (err) {
    return sendError(res, 500, err.message);
  }
};

// ── GET /api/v1/subscriptions/plans ──────────────────────────────────────────
// Public: returns available plans and pricing
const getPlans = async (req, res) => {
  const plans = [
    {
      id: 'free',
      name: 'निःशुल्क',
      name_en: 'Free',
      price: 0,
      currency: 'INR',
      duration: 'lifetime',
      features: Subscription.planFeatures('free'),
    },
    {
      id: 'basic',
      name: 'बेसिक',
      name_en: 'Basic',
      price: PLAN_PRICES.basic,
      display_price: '₹1,999/वर्ष',
      currency: 'INR',
      duration: '1 year',
      features: Subscription.planFeatures('basic'),
    },
    {
      id: 'premium',
      name: 'प्रीमियम',
      name_en: 'Premium',
      price: PLAN_PRICES.premium,
      display_price: '₹4,999/वर्ष',
      currency: 'INR',
      duration: '1 year',
      features: Subscription.planFeatures('premium'),
    },
  ];

  return sendSuccess(res, 200, 'Plans fetched.', { plans });
};

module.exports = {
  createOrder,
  verifyPayment,
  handleWebhook,
  getSubscription,
  getPlans,
};
