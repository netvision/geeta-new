const mongoose = require('mongoose');

const chapterSchema = new mongoose.Schema(
  {
    number: {
      type: Number,
      required: true,
      unique: true,
    },
    title: {
      hi: { type: String, required: true },
      en: { type: String, default: '' },
    },
    summary: {
      hi: { type: String, default: '' },
      en: { type: String, default: '' },
    },
    order: {
      type: Number,
      required: true,
    },
    is_published: {
      type: Boolean,
      default: false,
    },
    published_at: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

chapterSchema.index({ is_published: 1, order: 1 });

module.exports = mongoose.model('Chapter', chapterSchema);
