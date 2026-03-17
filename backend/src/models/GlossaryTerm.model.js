const mongoose = require('mongoose');

const glossaryTermSchema = new mongoose.Schema(
  {
    term: {
      hi: { type: String, required: true },
      en: { type: String, default: '' },
      sanskrit: { type: String, default: '' },
    },
    definition: {
      hi: { type: String, required: true },
      en: { type: String, default: '' },
    },
    related_chapters: [{ type: Number }],
    auto_link: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

glossaryTermSchema.index({ 'term.hi': 1 });
glossaryTermSchema.index({ auto_link: 1 });

module.exports = mongoose.model('GlossaryTerm', glossaryTermSchema);
