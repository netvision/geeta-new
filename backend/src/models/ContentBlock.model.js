const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema(
  {
    hi: { type: String, required: true },
    en: { type: String, default: '' },
    order: { type: Number, required: true },
  },
  { _id: false }
);

const sanskritVerseSchema = new mongoose.Schema(
  {
    verse: { type: String, required: true },
    ref: { type: String, required: true },
    order: { type: Number, required: true },
  },
  { _id: false }
);

const contentBlockSchema = new mongoose.Schema(
  {
    chapter_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Chapter',
      required: true,
    },
    type: {
      type: String,
      enum: ['shloka_group', 'prasang', 'tatparya', 'story', 'explanation', 'discussion'],
      required: true,
    },
    order: {
      type: Number,
      required: true,
    },
    // Optional section heading — groups logically related blocks under a heading
    section_title: {
      hi: { type: String, default: '' },
      en: { type: String, default: '' },
    },
    title: {
      hi: { type: String, default: '' },
      en: { type: String, default: '' },
    },
    content: {
      hi: { type: String, default: '' },
      en: { type: String, default: '' },
    },
    metadata: {
      // For shloka_group
      shloka_refs: [{ type: String }],
      sanskrit_verses: [sanskritVerseSchema],

      // For discussion
      questions: [questionSchema],

      // For story/example
      source: { type: String, default: '' },
      is_parable: { type: Boolean, default: false },
    },
  },
  { timestamps: true }
);

contentBlockSchema.index({ chapter_id: 1, order: 1 });
contentBlockSchema.index({ type: 1 });

module.exports = mongoose.model('ContentBlock', contentBlockSchema);
