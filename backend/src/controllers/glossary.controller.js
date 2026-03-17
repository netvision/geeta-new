const Glossary = require('../models/Glossary.model');
const { sendSuccess, sendError } = require('../utils/response.utils');

// ── GET /api/v1/glossary ─────────────────────────────────────────────────────
const getAllTerms = async (req, res) => {
  try {
    const lang = req.lang || 'hi';
    const { search, paath, page = 1, limit = 50 } = req.query;

    const filter = {};
    if (paath) filter.related_paaths = parseInt(paath);
    if (search) {
      filter.$or = [
        { term: { $regex: search, $options: 'i' } },
        { term_transliterated: { $regex: search, $options: 'i' } },
      ];
    }

    const total = await Glossary.countDocuments(filter);
    const terms = await Glossary.find(filter)
      .sort({ term: 1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const localised = terms.map((t) => localiseterm(t, lang));

    return sendSuccess(res, 200, 'Glossary terms fetched.', {
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      terms: localised,
    });
  } catch (err) {
    return sendError(res, 500, err.message);
  }
};

// ── GET /api/v1/glossary/:term ───────────────────────────────────────────────
const getTerm = async (req, res) => {
  try {
    const lang = req.lang || 'hi';
    const term = await Glossary.findOne({
      $or: [
        { term: req.params.term },
        { term_transliterated: { $regex: `^${req.params.term}$`, $options: 'i' } },
      ],
    });

    if (!term) return sendError(res, 404, 'Term not found.');
    return sendSuccess(res, 200, 'Term fetched.', { term: localiseterm(term, lang) });
  } catch (err) {
    return sendError(res, 500, err.message);
  }
};

// ── Admin: POST /api/v1/glossary ─────────────────────────────────────────────
const createTerm = async (req, res) => {
  try {
    const term = await Glossary.create(req.body);
    return sendSuccess(res, 201, 'Term created.', { term });
  } catch (err) {
    if (err.code === 11000) return sendError(res, 409, 'Term already exists.');
    return sendError(res, 500, err.message);
  }
};

// ── Admin: PUT /api/v1/glossary/:id ─────────────────────────────────────────
const updateTerm = async (req, res) => {
  try {
    const term = await Glossary.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!term) return sendError(res, 404, 'Term not found.');
    return sendSuccess(res, 200, 'Term updated.', { term });
  } catch (err) {
    return sendError(res, 500, err.message);
  }
};

// ── Admin: DELETE /api/v1/glossary/:id ──────────────────────────────────────
const deleteTerm = async (req, res) => {
  try {
    const term = await Glossary.findByIdAndDelete(req.params.id);
    if (!term) return sendError(res, 404, 'Term not found.');
    return sendSuccess(res, 200, 'Term deleted.');
  } catch (err) {
    return sendError(res, 500, err.message);
  }
};

// ── Helper ────────────────────────────────────────────────────────────────────
const localiseterm = (doc, lang) => {
  const t = doc.toObject();
  return {
    id: t._id,
    term: t.term,
    term_transliterated: t.term_transliterated,
    definition: t.definition[lang] || t.definition.hi,
    related_paaths: t.related_paaths,
    related_terms: t.related_terms,
  };
};

module.exports = { getAllTerms, getTerm, createTerm, updateTerm, deleteTerm };
