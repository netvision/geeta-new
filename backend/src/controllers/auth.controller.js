const crypto = require('crypto');
const User = require('../models/User.model');
const School = require('../models/School.model');
const Subscription = require('../models/Subscription.model');
const { signAccessToken, signRefreshToken, verifyRefreshToken } = require('../utils/jwt.utils');
const { sendSuccess, sendError } = require('../utils/response.utils');
const { sendPasswordResetEmail } = require('../services/email.service');

// ── helpers ──────────────────────────────────────────────────────────────────
const issueTokens = (user) => {
  const accessToken = signAccessToken(user._id, user.role);
  const refreshToken = signRefreshToken(user._id);
  return { accessToken, refreshToken };
};

// ── POST /api/v1/auth/register ───────────────────────────────────────────────
// School admins self-register; students register with a school join_code
const register = async (req, res) => {
  try {
    const { name, email, password, role, join_code, language_preference } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return sendError(res, 409, 'Email already registered.');

    let school = null;

    if (role === 'student' || role === 'teacher') {
      if (!join_code) return sendError(res, 400, 'School join code is required for students and teachers.');
      school = await School.findOne({ join_code: join_code.toUpperCase() });
      if (!school) return sendError(res, 404, 'Invalid school join code.');
      if (!school.is_active) return sendError(res, 403, 'This school account is inactive.');

      // Check student limit against subscription
      const sub = await Subscription.findById(school.subscription);
      if (sub && sub.features.max_students !== -1) {
        const studentCount = await User.countDocuments({ school: school._id, role: { $in: ['student', 'teacher'] } });
        if (studentCount >= sub.features.max_students) {
          return sendError(res, 403, 'School has reached its maximum number of users. Please contact your school admin.');
        }
      }
    }

    const user = await User.create({
      name,
      email,
      password,
      role: role || 'student',
      school: school ? school._id : null,
      language_preference: language_preference || 'hi',
    });

    const { accessToken, refreshToken } = issueTokens(user);

    // Store refresh token hash
    user.refresh_token = refreshToken;
    await user.save({ validateBeforeSave: false });

    return sendSuccess(res, 201, 'Registration successful.', {
      accessToken,
      refreshToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        school: user.school,
        language_preference: user.language_preference,
      },
    });
  } catch (err) {
    return sendError(res, 500, err.message);
  }
};

// ── POST /api/v1/auth/login ──────────────────────────────────────────────────
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return sendError(res, 400, 'Email and password are required.');

    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.comparePassword(password))) {
      return sendError(res, 401, 'Incorrect email or password.');
    }
    if (!user.is_active) return sendError(res, 403, 'Account is inactive. Contact support.');

    const { accessToken, refreshToken } = issueTokens(user);
    user.refresh_token = refreshToken;
    user.last_login = Date.now();
    await user.save({ validateBeforeSave: false });

    return sendSuccess(res, 200, 'Login successful.', {
      accessToken,
      refreshToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        school: user.school,
        language_preference: user.language_preference,
      },
    });
  } catch (err) {
    return sendError(res, 500, err.message);
  }
};

// ── POST /api/v1/auth/refresh-token ─────────────────────────────────────────
const refreshToken = async (req, res) => {
  try {
    const { refreshToken: token } = req.body;
    if (!token) return sendError(res, 400, 'Refresh token is required.');

    const decoded = verifyRefreshToken(token);
    const user = await User.findById(decoded.id).select('+refresh_token');
    if (!user || user.refresh_token !== token) {
      return sendError(res, 401, 'Invalid or expired refresh token.');
    }

    const { accessToken, refreshToken: newRefreshToken } = issueTokens(user);
    user.refresh_token = newRefreshToken;
    await user.save({ validateBeforeSave: false });

    return sendSuccess(res, 200, 'Token refreshed.', { accessToken, refreshToken: newRefreshToken });
  } catch (err) {
    return sendError(res, 401, 'Invalid or expired refresh token.');
  }
};

// ── POST /api/v1/auth/logout ─────────────────────────────────────────────────
const logout = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user._id, { refresh_token: null });
    return sendSuccess(res, 200, 'Logged out successfully.');
  } catch (err) {
    return sendError(res, 500, err.message);
  }
};

// ── POST /api/v1/auth/forgot-password ───────────────────────────────────────
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    // Always return success to avoid user enumeration
    if (!user) return sendSuccess(res, 200, 'If that email exists, a reset link has been sent.');

    const resetToken = crypto.randomBytes(32).toString('hex');
    user.password_reset_token = crypto.createHash('sha256').update(resetToken).digest('hex');
    user.password_reset_expires = Date.now() + 30 * 60 * 1000; // 30 min
    await user.save({ validateBeforeSave: false });

    await sendPasswordResetEmail(user.email, user.name, resetToken);
    return sendSuccess(res, 200, 'If that email exists, a reset link has been sent.');
  } catch (err) {
    return sendError(res, 500, err.message);
  }
};

// ── POST /api/v1/auth/reset-password ────────────────────────────────────────
const resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const user = await User.findOne({
      password_reset_token: hashedToken,
      password_reset_expires: { $gt: Date.now() },
    }).select('+password');

    if (!user) return sendError(res, 400, 'Reset token is invalid or has expired.');

    user.password = password;
    user.password_reset_token = null;
    user.password_reset_expires = null;
    await user.save();

    return sendSuccess(res, 200, 'Password has been reset. You can now log in.');
  } catch (err) {
    return sendError(res, 500, err.message);
  }
};

// ── GET /api/v1/auth/me ──────────────────────────────────────────────────────
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('school', 'name join_code city state subscription');
    return sendSuccess(res, 200, 'User profile fetched.', { user });
  } catch (err) {
    return sendError(res, 500, err.message);
  }
};

// ── PATCH /api/v1/auth/me ────────────────────────────────────────────────────
const updateMe = async (req, res) => {
  try {
    const allowed = ['name', 'language_preference', 'avatar'];
    const updates = {};
    allowed.forEach((field) => { if (req.body[field] !== undefined) updates[field] = req.body[field]; });

    const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true, runValidators: true });
    return sendSuccess(res, 200, 'Profile updated.', { user });
  } catch (err) {
    return sendError(res, 500, err.message);
  }
};

module.exports = { register, login, refreshToken, logout, forgotPassword, resetPassword, getMe, updateMe };
