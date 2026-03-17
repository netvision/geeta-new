const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema(
  {
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'School',
      required: false,
    },
    plan: {
      type: String,
      enum: ['free', 'basic', 'premium'],
      required: true,
      default: 'free',
    },
    status: {
      type: String,
      enum: ['trial', 'active', 'expired', 'cancelled'],
      default: 'trial',
    },
    start_date: { type: Date, default: Date.now },
    end_date: { type: Date, required: true },

    // Payment details (populated after successful Razorpay payment)
    amount: { type: Number, default: 0 },         // in paise
    currency: { type: String, default: 'INR' },
    razorpay_order_id: { type: String, default: null },
    razorpay_payment_id: { type: String, default: null },
    razorpay_signature: { type: String, default: null },

    // What this subscription unlocks
    features: {
      chapters_limit: { type: Number, default: 5 },   // -1 = unlimited
      max_students: { type: Number, default: 10 },
      discussions: { type: Boolean, default: false },
      analytics: { type: Boolean, default: false },
      hd_illustrations: { type: Boolean, default: false },
    },
  },
  { timestamps: true }
);

// Plan feature presets — used when creating or upgrading a subscription
const PLAN_FEATURES = {
  free: {
    chapters_limit: 5,
    max_students: 10,
    discussions: false,
    analytics: false,
    hd_illustrations: false,
  },
  basic: {
    chapters_limit: -1,
    max_students: 100,
    discussions: true,
    analytics: false,
    hd_illustrations: false,
  },
  premium: {
    chapters_limit: -1,
    max_students: -1,
    discussions: true,
    analytics: true,
    hd_illustrations: true,
  },
};

subscriptionSchema.statics.planFeatures = function (plan) {
  return PLAN_FEATURES[plan] || PLAN_FEATURES.free;
};

// Helper: is this subscription currently active?
subscriptionSchema.methods.isActive = function () {
  return this.status === 'active' || this.status === 'trial';
};

module.exports = mongoose.model('Subscription', subscriptionSchema);
