const express = require('express');
const router = express.Router();
const {
  createSchool,
  getSchools,
  getSchool,
  updateSchool,
  getStudents,
  removeStudent,
  validateJoinCode,
} = require('../controllers/school.controller');
const { protect } = require('../middleware/auth.middleware');
const { restrict } = require('../middleware/roles.middleware');

// Public — validate a join code before student registration
router.get('/join-code/:code', validateJoinCode);

// Protected routes — all require authentication
router.use(protect);

// Superadmin: create school
router.post('/', restrict('superadmin'), createSchool);

// Superadmin: all schools; school_admin: their own school (filtered in controller)
router.get('/', restrict('superadmin', 'school_admin'), getSchools);
router.get('/:id', restrict('superadmin', 'school_admin'), getSchool);
router.put('/:id', restrict('superadmin'), updateSchool);

// Student management
router.get('/:id/students', restrict('superadmin', 'school_admin'), getStudents);
router.delete(
  '/:id/students/:userId',
  restrict('superadmin', 'school_admin'),
  removeStudent
);

module.exports = router;
