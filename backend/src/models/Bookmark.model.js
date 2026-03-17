const mongoose = require('mongoose');

const bookmarkSchema = new mongoose.Schema(
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
    section_order: { type: Number, default: null },
    note: { type: String, default: '', maxlength: 500 },
  },
  { timestamps: true }
);

bookmarkSchema.index({ user: 1, chapter: 1, section_order: 1 }, { unique: true });

module.exports = mongoose.model('Bookmark', bookmarkSchema);
