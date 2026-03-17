const express = require('express');
const router = express.Router();
const {
  getAllTerms,
  getTerm,
  createTerm,
  updateTerm,
  deleteTerm,
} = require('../controllers/glossary.controller');
const { protect } = require('../middleware/auth.middleware');
const { restrict } = require('../middleware/roles.middleware');
const { setLanguage } = require('../middleware/language.middleware');

router.use(setLanguage);

// Public
router.get('/', getAllTerms);
router.get('/:term', getTerm);

// Admin
router.post('/', protect, restrict('superadmin'), createTerm);
router.put('/:id', protect, restrict('superadmin'), updateTerm);
router.delete('/:id', protect, restrict('superadmin'), deleteTerm);

module.exports = router;
