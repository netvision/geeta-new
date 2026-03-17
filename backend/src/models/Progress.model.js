const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    chapter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Chapter',
      required: true,
    },
    status: {
      type: String,
      enum: ['not_started', 'reading', 'completed'],
      default: 'not_started',
    },
    sections_seen: { type: [Number], default: [] }, // section order numbers
    time_spent_seconds: { type: Number, default: 0 },
    started_at: { type: Date, default: null },
    completed_at: { type: Date, default: null },
    last_read_at: { type: Date, default: null },
  },
  { timestamps: true }
);

// One progress record per user per chapter
progressSchema.index({ user: 1, chapter: 1 }, { unique: true });

module.exports = mongoose.model('Progress', progressSchema);
