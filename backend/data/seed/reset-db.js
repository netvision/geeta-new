require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
const connectDB = require('../../src/config/db');

const Chapter = require('../../src/models/Chapter.model');
const ContentBlock = require('../../src/models/ContentBlock.model');
const GlossaryTerm = require('../../src/models/GlossaryTerm.model');

const resetDB = async () => {
  try {
    await connectDB();
    console.log('Connected to MongoDB.\n');

    console.log('Dropping collections...');
    await Chapter.deleteMany({});
    console.log('✓ Chapters cleared');

    await ContentBlock.deleteMany({});
    console.log('✓ ContentBlocks cleared');

    await GlossaryTerm.deleteMany({});
    console.log('✓ GlossaryTerms cleared');

    console.log('\n✅ Database reset complete!');
    process.exit(0);
  } catch (err) {
    console.error('Reset failed:', err.message);
    console.error(err.stack);
    process.exit(1);
  }
};

resetDB();
