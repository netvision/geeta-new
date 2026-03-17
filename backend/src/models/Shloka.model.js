const mongoose = require('mongoose');

const shlokaSchema = new mongoose.Schema(
  {
    chapter_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Chapter',
      required: true,
    },
    content_block_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ContentBlock',
      required: true,
    },
    reference: {
      type: String,
      required: true,
    },
    sanskrit: {
      type: String,
      required: true,
    },
    translation: {
      hi: { type: String, default: '' },
      en: { type: String, default: '' },
    },
    order: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

shlokaSchema.index({ reference: 1 });
shlokaSchema.index({ chapter_id: 1 });

module.exports = mongoose.model('Shloka', shlokaSchema);
