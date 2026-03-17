const mongoose = require('mongoose');

const schoolSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'School name is required'],
      trim: true,
    },
    join_code: {
      type: String,
      unique: true,
      uppercase: true,
      trim: true,
    },
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    city: { type: String, trim: true, default: '' },
    state: { type: String, trim: true, default: '' },
    contact_email: {
      type: String,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
    },
    contact_phone: { type: String, trim: true, default: '' },
    subscription: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subscription',
      default: null,
    },
    is_active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Auto-generate a 6-char join code before saving
schoolSchema.pre('save', function () {
  if (!this.join_code) {
    this.join_code = Math.random().toString(36).substring(2, 8).toUpperCase();
  }
});

// Virtual: count of students in this school
schoolSchema.virtual('student_count', {
  ref: 'User',
  localField: '_id',
  foreignField: 'school',
  count: true,
});

module.exports = mongoose.model('School', schoolSchema);
