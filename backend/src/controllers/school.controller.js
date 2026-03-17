const School = require('../models/School.model');
const User = require('../models/User.model');
const Subscription = require('../models/Subscription.model');
const { sendSuccess, sendError } = require('../utils/response.utils');

// ── POST /api/v1/schools ─────────────────────────────────────────────────────
// Superadmin creates a school and assigns a school_admin
const createSchool = async (req, res) => {
  try {
    const { name, city, state, contact_email, contact_phone, admin_id } = req.body;

    if (!name || !admin_id) {
      return sendError(res, 400, 'School name and admin_id are required.');
    }

    const admin = await User.findById(admin_id);
    if (!admin) return sendError(res, 404, 'Admin user not found.');
    if (admin.role !== 'school_admin') {
      return sendError(res, 400, 'The specified user must have the school_admin role.');
    }

    // Create free subscription for the school first
    const subscription = await Subscription.create({
      plan: 'free',
      status: 'active',
      start_date: new Date(),
      end_date: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year
      features: Subscription.planFeatures('free'),
    });

    const school = await School.create({
      name,
      city,
      state,
      contact_email,
      contact_phone,
      admin: admin_id,
      subscription: subscription._id,
    });

    // Back-link subscription to school
    subscription.school = school._id;
    await subscription.save();

    // Assign school to admin
    admin.school = school._id;
    await admin.save();

    return sendSuccess(res, 201, 'School created.', { school });
  } catch (err) {
    if (err.code === 11000) return sendError(res, 409, 'School name already exists.');
    return sendError(res, 500, err.message);
  }
};

// ── GET /api/v1/schools ──────────────────────────────────────────────────────
// Superadmin: all schools. School admin: only their own.
const getSchools = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const filter = req.user.role === 'superadmin' ? {} : { _id: req.user.school };

    const total = await School.countDocuments(filter);
    const schools = await School.find(filter)
      .populate('admin', 'name email')
      .populate('subscription', 'plan status end_date features')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    return sendSuccess(res, 200, 'Schools fetched.', {
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      schools,
    });
  } catch (err) {
    return sendError(res, 500, err.message);
  }
};

// ── GET /api/v1/schools/:id ──────────────────────────────────────────────────
const getSchool = async (req, res) => {
  try {
    const school = await School.findById(req.params.id)
      .populate('admin', 'name email')
      .populate('subscription', 'plan status end_date features');

    if (!school) return sendError(res, 404, 'School not found.');

    // School admin can only view their own school
    if (
      req.user.role === 'school_admin' &&
      school._id.toString() !== req.user.school?.toString()
    ) {
      return sendError(res, 403, 'Access denied.');
    }

    return sendSuccess(res, 200, 'School fetched.', { school });
  } catch (err) {
    return sendError(res, 500, err.message);
  }
};

// ── PUT /api/v1/schools/:id ──────────────────────────────────────────────────
const updateSchool = async (req, res) => {
  try {
    const allowedFields = ['name', 'city', 'state', 'contact_email', 'contact_phone', 'is_active'];
    const updates = {};
    allowedFields.forEach((f) => {
      if (req.body[f] !== undefined) updates[f] = req.body[f];
    });

    const school = await School.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    }).populate('admin', 'name email');

    if (!school) return sendError(res, 404, 'School not found.');
    return sendSuccess(res, 200, 'School updated.', { school });
  } catch (err) {
    return sendError(res, 500, err.message);
  }
};

// ── GET /api/v1/schools/:id/students ─────────────────────────────────────────
// Returns all students belonging to a school
const getStudents = async (req, res) => {
  try {
    const { page = 1, limit = 50 } = req.query;

    const school = await School.findById(req.params.id);
    if (!school) return sendError(res, 404, 'School not found.');

    // School admin can only see their own school's students
    if (
      req.user.role === 'school_admin' &&
      school._id.toString() !== req.user.school?.toString()
    ) {
      return sendError(res, 403, 'Access denied.');
    }

    const filter = { school: req.params.id, role: 'student' };
    const total = await User.countDocuments(filter);
    const students = await User.find(filter)
      .select('name email is_active last_login createdAt')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    return sendSuccess(res, 200, 'Students fetched.', {
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      students,
    });
  } catch (err) {
    return sendError(res, 500, err.message);
  }
};

// ── DELETE /api/v1/schools/:id/students/:userId ───────────────────────────────
// School admin or superadmin can remove a student from a school
const removeStudent = async (req, res) => {
  try {
    const student = await User.findOne({
      _id: req.params.userId,
      school: req.params.id,
      role: 'student',
    });

    if (!student) return sendError(res, 404, 'Student not found in this school.');

    student.school = null;
    student.is_active = false;
    await student.save();

    return sendSuccess(res, 200, 'Student removed from school.');
  } catch (err) {
    return sendError(res, 500, err.message);
  }
};

// ── GET /api/v1/schools/join-code/:code ──────────────────────────────────────
// Public: validate a join code before registration
const validateJoinCode = async (req, res) => {
  try {
    const school = await School.findOne({
      join_code: req.params.code.toUpperCase(),
      is_active: true,
    }).select('name city join_code');

    if (!school) return sendError(res, 404, 'Invalid or inactive join code.');
    return sendSuccess(res, 200, 'Valid join code.', { school });
  } catch (err) {
    return sendError(res, 500, err.message);
  }
};

module.exports = {
  createSchool,
  getSchools,
  getSchool,
  updateSchool,
  getStudents,
  removeStudent,
  validateJoinCode,
};
