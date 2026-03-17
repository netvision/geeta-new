/**
 * Seeds the DB with chapters 1–5 from geetapath.md.
 * Clears existing chapters & content blocks before inserting.
 *
 * Usage: node data/seed/seed-geetapath.js
 */
require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
const connectDB = require('../../src/config/db');
const Chapter = require('../../src/models/Chapter.model');
const ContentBlock = require('../../src/models/ContentBlock.model');
const { chapters, blocksByChapterNumber } = require('./geetapath.seed');

const seed = async () => {
  try {
    await connectDB();
    console.log('Connected to MongoDB.\n');

    // Clear existing
    await Chapter.deleteMany({});
    await ContentBlock.deleteMany({});
    console.log('✓ Cleared existing chapters and content blocks\n');

    // Insert chapters and their content blocks
    for (const chapterData of chapters) {
      const chapter = await Chapter.create(chapterData);
      console.log(`✓ Created chapter ${chapter.number}: ${chapter.title.hi}`);

      const blocks = blocksByChapterNumber[chapter.number] || [];
      for (const blockData of blocks) {
        await ContentBlock.create({ ...blockData, chapter_id: chapter._id });
      }
      console.log(`  → ${blocks.length} content blocks inserted`);
    }

    console.log('\n✅ Seed complete!');
    process.exit(0);
  } catch (err) {
    console.error('Seed failed:', err.message);
    console.error(err.stack);
    process.exit(1);
  }
};

seed();
