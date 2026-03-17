const mongoose = require('mongoose');

const glossarySchema = new mongoose.Schema(
  {
    term: { type: String, required: true, trim: true },
    term_transliterated: { type: String, trim: true, default: '' }, // e.g. "Samata"
    definition: {
      hi: { type: String, required: true },
      en: { type: String, default: '' },
    },
    related_paaths: { type: [Number], default: [] },
    related_terms: { type: [String], default: [] },
  },
  { timestamps: true }
);

glossarySchema.index({ term: 1 });

module.exports = mongoose.model('Glossary', glossarySchema);
