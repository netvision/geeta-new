const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false, // never returned in queries by default
    },
    role: {
      type: String,
      enum: ['superadmin', 'school_admin', 'teacher', 'student'],
      default: 'student',
    },
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'School',
      default: null,
    },
    language_preference: {
      type: String,
      enum: ['hi', 'en'],
      default: 'hi',
    },
    avatar: {
      type: String,
      default: null,
    },
    is_active: {
      type: Boolean,
      default: true,
    },
    last_login: {
      type: Date,
      default: null,
    },
    password_reset_token: {
      type: String,
      default: null,
      select: false,
    },
    password_reset_expires: {
      type: Date,
      default: null,
      select: false,
    },
    refresh_token: {
      type: String,
      default: null,
      select: false,
    },
  },
  { timestamps: true }
);

// Hash password before saving (Mongoose 9: async hooks don't receive next)
userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 12);
});

// Compare password helper
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
