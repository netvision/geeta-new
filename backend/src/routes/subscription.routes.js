const express = require('express');
const router = express.Router();
const {
  createOrder,
  verifyPayment,
  handleWebhook,
  getSubscription,
  getPlans,
} = require('../controllers/subscription.controller');
const { protect } = require('../middleware/auth.middleware');
const { restrict } = require('../middleware/roles.middleware');

// Public
router.get('/plans', getPlans);

// Razorpay webhook — raw body needed; Razorpay sends JSON
router.post('/webhook', express.json(), handleWebhook);

// Protected
router.use(protect);

router.post('/order', restrict('superadmin', 'school_admin'), createOrder);
router.post('/verify', restrict('superadmin', 'school_admin'), verifyPayment);
router.get('/:school_id', restrict('superadmin', 'school_admin'), getSubscription);

module.exports = router;
