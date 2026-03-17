const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const chapterController = require('../controllers/chapter.controller');
const { protect } = require('../middleware/auth.middleware');
const { restrict } = require('../middleware/roles.middleware');
const { setLanguage } = require('../middleware/language.middleware');

router.use(setLanguage);

// ── Public routes ─────────────────────────────────────────────────────────────
router.get('/', chapterController.getAllChapters);
router.get('/:number', chapterController.getChapterByNumber);

// ── Admin routes ─────────────────────────────────────────────────────────────
router.get('/admin/all', protect, restrict('superadmin'), chapterController.adminGetAllChapters);
router.get('/admin/:id', protect, restrict('superadmin'), chapterController.adminGetChapterById);

router.post(
  '/',
  protect,
  restrict('superadmin'),
  [body('number').isInt({ min: 1 }), body('title.hi').notEmpty()],
  chapterController.createChapter
);

router.patch('/:id', protect, restrict('superadmin'), chapterController.updateChapter);
router.patch('/:id/publish', protect, restrict('superadmin'), chapterController.publishChapter);
router.patch('/:id/unpublish', protect, restrict('superadmin'), chapterController.unpublishChapter);
router.delete('/:id', protect, restrict('superadmin'), chapterController.deleteChapter);

// ── Content block routes ──────────────────────────────────────────────────────
router.get('/:chapterId/blocks', protect, restrict('superadmin'), chapterController.getContentBlocks);
router.post('/:chapterId/blocks', protect, restrict('superadmin'), chapterController.addContentBlock);
router.post('/:chapterId/blocks/reorder', protect, restrict('superadmin'), chapterController.reorderBlocks);
router.patch('/:chapterId/blocks/:blockId', protect, restrict('superadmin'), chapterController.updateContentBlock);
router.delete('/:chapterId/blocks/:blockId', protect, restrict('superadmin'), chapterController.deleteContentBlock);

module.exports = router;
