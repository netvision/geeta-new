const Chapter = require('../models/Chapter.model');
const ContentBlock = require('../models/ContentBlock.model');
const { sendSuccess, sendError } = require('../utils/response.utils');

// ── Public: GET /api/v1/chapters ─────────────────────────────────────────────
const getAllChapters = async (req, res) => {
  try {
    const lang = req.lang || 'hi';
    const chapters = await Chapter.find({ is_published: true })
      .select('number title order')
      .sort({ order: 1 });

    const localized = chapters.map((c) => ({
      id: c._id,
      number: c.number,
      title: c.title[lang] || c.title.hi,
      order: c.order,
    }));

    return sendSuccess(res, 200, 'Chapters fetched.', { chapters: localized });
  } catch (err) {
    return sendError(res, 500, err.message);
  }
};

// ── Public: GET /api/v1/chapters/:number ─────────────────────────────────────
const getChapterByNumber = async (req, res) => {
  try {
    const lang = req.lang || 'hi';
    const chapter = await Chapter.findOne({
      number: req.params.number,
      is_published: true,
    });

    if (!chapter) return sendError(res, 404, 'Chapter not found.');

    const contentBlocks = await ContentBlock.find({ chapter_id: chapter._id }).sort({ order: 1 });

    const localizedBlocks = contentBlocks.map((b) => ({
      id: b._id,
      type: b.type,
      order: b.order,
      section_title: b.section_title[lang] || b.section_title.hi || '',
      title: b.title[lang] || b.title.hi || '',
      content: b.content[lang] || b.content.hi || '',
      metadata: b.metadata,
    }));

    return sendSuccess(res, 200, 'Chapter fetched.', {
      chapter: {
        id: chapter._id,
        number: chapter.number,
        title: chapter.title[lang] || chapter.title.hi,
        summary: chapter.summary[lang] || chapter.summary.hi,
      },
      contentBlocks: localizedBlocks,
    });
  } catch (err) {
    return sendError(res, 500, err.message);
  }
};

// ── Admin: GET /api/v1/chapters/admin/all ────────────────────────────────────
const adminGetAllChapters = async (req, res) => {
  try {
    const chapters = await Chapter.find().select('number title order is_published published_at').sort({ order: 1 });
    return sendSuccess(res, 200, 'All chapters fetched.', { chapters });
  } catch (err) {
    return sendError(res, 500, err.message);
  }
};

// ── Admin: GET /api/v1/chapters/admin/:id ────────────────────────────────────
const adminGetChapterById = async (req, res) => {
  try {
    const chapter = await Chapter.findById(req.params.id);
    if (!chapter) return sendError(res, 404, 'Chapter not found.');

    const contentBlocks = await ContentBlock.find({ chapter_id: chapter._id }).sort({ order: 1 });

    return sendSuccess(res, 200, 'Chapter fetched.', { chapter, contentBlocks });
  } catch (err) {
    return sendError(res, 500, err.message);
  }
};

// ── Admin: POST /api/v1/chapters ─────────────────────────────────────────────
const createChapter = async (req, res) => {
  try {
    const chapter = await Chapter.create({
      ...req.body,
      order: req.body.order || req.body.number,
    });
    return sendSuccess(res, 201, 'Chapter created.', { chapter });
  } catch (err) {
    if (err.code === 11000) {
      return sendError(res, 409, 'Chapter number already exists.');
    }
    return sendError(res, 500, err.message);
  }
};

// ── Admin: PATCH /api/v1/chapters/:id ────────────────────────────────────────
const updateChapter = async (req, res) => {
  try {
    const chapter = await Chapter.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true, runValidators: true });
    if (!chapter) return sendError(res, 404, 'Chapter not found.');
    return sendSuccess(res, 200, 'Chapter updated.', { chapter });
  } catch (err) {
    return sendError(res, 500, err.message);
  }
};

// ── Admin: PATCH /api/v1/chapters/:id/publish ────────────────────────────────
const publishChapter = async (req, res) => {
  try {
    const chapter = await Chapter.findByIdAndUpdate(
      req.params.id,
      { $set: { is_published: true, published_at: new Date() } },
      { new: true }
    );
    if (!chapter) return sendError(res, 404, 'Chapter not found.');
    return sendSuccess(res, 200, 'Chapter published.', { chapter });
  } catch (err) {
    return sendError(res, 500, err.message);
  }
};

// ── Admin: PATCH /api/v1/chapters/:id/unpublish ──────────────────────────────
const unpublishChapter = async (req, res) => {
  try {
    const chapter = await Chapter.findByIdAndUpdate(
      req.params.id,
      { $set: { is_published: false } },
      { new: true }
    );
    if (!chapter) return sendError(res, 404, 'Chapter not found.');
    return sendSuccess(res, 200, 'Chapter unpublished.', { chapter });
  } catch (err) {
    return sendError(res, 500, err.message);
  }
};

// ── Admin: DELETE /api/v1/chapters/:id ───────────────────────────────────────
const deleteChapter = async (req, res) => {
  try {
    const chapter = await Chapter.findById(req.params.id);
    if (!chapter) return sendError(res, 404, 'Chapter not found.');

    await ContentBlock.deleteMany({ chapter_id: chapter._id });
    await Chapter.findByIdAndDelete(req.params.id);

    return sendSuccess(res, 200, 'Chapter and all related content deleted.');
  } catch (err) {
    return sendError(res, 500, err.message);
  }
};

// ── Admin: POST /api/v1/chapters/:chapterId/blocks ───────────────────────────
const addContentBlock = async (req, res) => {
  try {
    const chapter = await Chapter.findById(req.params.chapterId);
    if (!chapter) return sendError(res, 404, 'Chapter not found.');

    const block = await ContentBlock.create({ ...req.body, chapter_id: chapter._id });
    return sendSuccess(res, 201, 'Content block created.', { block });
  } catch (err) {
    return sendError(res, 500, err.message);
  }
};

// ── Admin: PATCH /api/v1/chapters/:chapterId/blocks/:blockId ─────────────────
const updateContentBlock = async (req, res) => {
  try {
    const block = await ContentBlock.findOneAndUpdate(
      { _id: req.params.blockId, chapter_id: req.params.chapterId },
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!block) return sendError(res, 404, 'Content block not found.');
    return sendSuccess(res, 200, 'Content block updated.', { block });
  } catch (err) {
    return sendError(res, 500, err.message);
  }
};

// ── Admin: DELETE /api/v1/chapters/:chapterId/blocks/:blockId ────────────────
const deleteContentBlock = async (req, res) => {
  try {
    const block = await ContentBlock.findOneAndDelete({
      _id: req.params.blockId,
      chapter_id: req.params.chapterId,
    });

    if (!block) return sendError(res, 404, 'Content block not found.');
    return sendSuccess(res, 200, 'Content block deleted.');
  } catch (err) {
    return sendError(res, 500, err.message);
  }
};

// ── Admin: POST /api/v1/chapters/:chapterId/blocks/reorder ───────────────────
const reorderBlocks = async (req, res) => {
  try {
    const { blockOrders } = req.body; // [{ id, order }]
    const updates = blockOrders.map(({ id, order }) => ContentBlock.findByIdAndUpdate(id, { order }));
    await Promise.all(updates);
    return sendSuccess(res, 200, 'Blocks reordered.');
  } catch (err) {
    return sendError(res, 500, err.message);
  }
};

// ── Admin: GET /api/v1/chapters/:chapterId/blocks ────────────────────────────
const getContentBlocks = async (req, res) => {
  try {
    const blocks = await ContentBlock.find({ chapter_id: req.params.chapterId }).sort({ order: 1 });
    return sendSuccess(res, 200, 'Content blocks fetched.', { blocks });
  } catch (err) {
    return sendError(res, 500, err.message);
  }
};

module.exports = {
  getAllChapters,
  getChapterByNumber,
  adminGetAllChapters,
  adminGetChapterById,
  createChapter,
  updateChapter,
  publishChapter,
  unpublishChapter,
  deleteChapter,
  addContentBlock,
  updateContentBlock,
  deleteContentBlock,
  reorderBlocks,
  getContentBlocks,
};
