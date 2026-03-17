require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
const fs = require('fs');
const path = require('path');
const connectDB = require('../../src/config/db');

const Chapter = require('../../src/models/Chapter.model');
const ContentBlock = require('../../src/models/ContentBlock.model');
const Shloka = require('../../src/models/Shloka.model');

const CONTENT_FILE = path.join(__dirname, '../../../geetapath.md');

// Journey phases for 5 chapters
const JOURNEY_PHASES = {
  1: 'problem',
  2: 'problem',
  3: 'path',
  4: 'path',
  5: 'path',
};

// Parse the markdown file
function parseGeetapath(content) {
  const chapters = [];

  // Split by chapter markers (# पाठ)
  const chapterRegex = /#\s*पाठ\s*(\d+)\s*\n/g;
  const matches = [...content.matchAll(chapterRegex)];

  for (let i = 0; i < matches.length; i++) {
    const match = matches[i];
    const chapterNum = parseInt(match[1]);
    const startIdx = match.index;
    const endIdx = i < matches.length - 1 ? matches[i + 1].index : content.length;
    const chapterContent = content.slice(startIdx, endIdx);

    const chapter = parseChapter(chapterNum, chapterContent);
    chapters.push(chapter);
  }

  return chapters;
}

function parseChapter(number, content) {
  const lines = content.split('\n');

  // Extract title (first # line is chapter number, second # line is title)
  let title = '';
  let contentStartIdx = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith('# ') && !line.includes('पाठ')) {
      title = line.replace('# ', '').trim();
      contentStartIdx = i + 1;
      break;
    }
  }

  // Parse content blocks
  const blocks = parseContentBlocks(lines.slice(contentStartIdx), number);

  return {
    number,
    title: { hi: title, en: '' },
    journey_phase: JOURNEY_PHASES[number] || 'path',
    order: number,
    is_published: true,
    published_at: new Date(),
    blocks,
  };
}

function parseContentBlocks(lines, chapterNum) {
  const blocks = [];
  let currentBlock = null;
  let blockOrder = 0;

  let i = 0;
  while (i < lines.length) {
    let line = lines[i];

    // Skip empty lines at start
    if (!line.trim() && !currentBlock) {
      i++;
      continue;
    }

    // Check for section headers
    const shlokaMatch = line.match(/###?\s*\*?([^\n]*श्लोक[^\n]*)\*?/i);
    const discussionMatch = line.match(/##?\s*\*?चर्चा\s*का\s*विषय\*?/i);

    if (shlokaMatch || line.includes('श्लोक')) {
      // Save previous block
      if (currentBlock) {
        blocks.push({ ...currentBlock, order: blockOrder++ });
      }

      // Start new shloka group
      currentBlock = {
        type: 'shloka_group',
        title: { hi: extractText(shlokaMatch ? shlokaMatch[1] : 'श्लोक'), en: '' },
        content: { hi: '', en: '' },
        metadata: {
          shloka_refs: [],
          sanskrit_verses: [],
        },
      };

      // Collect shlokas until next section
      i++;
      let verseOrder = 0;
      while (i < lines.length && !isNewSection(lines[i])) {
        const shlokaLine = lines[i].trim();

        // Check for verse reference (॥number॥)
        const verseMatch = shlokaLine.match(/॥(\d+)॥/);
        if (verseMatch) {
          const verseRef = `${chapterNum}.${verseMatch[1]}`;
          // Collect multi-line verse
          let verseText = shlokaLine;
          let j = i - 1;
          while (j >= 0 && lines[j].trim() && !lines[j].includes('श्लोक') && !lines[j].includes('प्रसंग')) {
            verseText = lines[j].trim() + ' ' + verseText;
            j--;
          }

          currentBlock.metadata.shloka_refs.push(verseRef);
          currentBlock.metadata.sanskrit_verses.push({
            verse: verseText.replace(/^\*+|\*+$/g, '').trim(),
            ref: verseRef,
            order: verseOrder++,
          });
        }

        i++;
      }
      continue;
    }

    // Check for Prasang
    if (line.includes('प्रसंग')) {
      if (currentBlock && currentBlock.type !== 'prasang') {
        blocks.push({ ...currentBlock, order: blockOrder++ });
        currentBlock = null;
      }

      if (!currentBlock) {
        currentBlock = {
          type: 'prasang',
          title: { hi: 'प्रसंग', en: 'Context' },
          content: { hi: '', en: '' },
          metadata: {},
        };
      }

      // Extract prasang content
      i++;
      while (i < lines.length && !isNewSection(lines[i])) {
        if (lines[i].trim()) {
          currentBlock.content.hi += lines[i] + '\n';
        }
        i++;
      }
      currentBlock.content.hi = currentBlock.content.hi.trim();
      continue;
    }

    // Check for Tatpary (तात्पर्य)
    if (line.includes('तात्पर्य')) {
      if (currentBlock) {
        blocks.push({ ...currentBlock, order: blockOrder++ });
      }

      currentBlock = {
        type: 'tatparya',
        title: { hi: 'तात्पर्य', en: 'Meaning' },
        content: { hi: '', en: '' },
        metadata: {},
      };

      i++;
      while (i < lines.length && !isNewSection(lines[i])) {
        if (lines[i].trim()) {
          currentBlock.content.hi += lines[i] + '\n';
        }
        i++;
      }
      currentBlock.content.hi = currentBlock.content.hi.trim();
      continue;
    }

    // Check for Discussion (चर्चा का विषय)
    if (discussionMatch || line.includes('चर्चा का विषय')) {
      if (currentBlock) {
        blocks.push({ ...currentBlock, order: blockOrder++ });
      }

      currentBlock = {
        type: 'discussion',
        title: { hi: 'चर्चा का विषय', en: 'Discussion Questions' },
        content: { hi: '', en: '' },
        metadata: {
          questions: [],
        },
      };

      // Extract questions
      i++;
      let qOrder = 0;
      while (i < lines.length && !isNewSection(lines[i])) {
        const qLine = lines[i].trim();
        if (qLine.match(/^\d+[\.\)]/)) {
          currentBlock.metadata.questions.push({
            hi: qLine.replace(/^\d+[\.\)]\s*/, ''),
            en: '',
            order: qOrder++,
          });
        } else if (qLine && currentBlock.metadata.questions.length > 0) {
          // Append to last question
          const lastQ = currentBlock.metadata.questions[currentBlock.metadata.questions.length - 1];
          lastQ.hi += ' ' + qLine;
        }
        i++;
      }
      continue;
    }

    // Check for Examples/Stories (उदाहरण)
    if (line.includes('उदाहरण') || line.match(/^##?\s*\*?उदाहरण/)) {
      if (currentBlock) {
        blocks.push({ ...currentBlock, order: blockOrder++ });
      }

      currentBlock = {
        type: 'story',
        title: { hi: 'उदाहरण', en: 'Example' },
        content: { hi: '', en: '' },
        metadata: {
          is_parable: true,
        },
      };

      i++;
      while (i < lines.length && !isNewSection(lines[i])) {
        if (lines[i].trim()) {
          currentBlock.content.hi += lines[i] + '\n';
        }
        i++;
      }
      currentBlock.content.hi = currentBlock.content.hi.trim();
      continue;
    }

    // Regular explanation text
    if (line.trim() && !currentBlock) {
      currentBlock = {
        type: 'explanation',
        title: { hi: '', en: '' },
        content: { hi: line + '\n', en: '' },
        metadata: {},
      };
    } else if (line.trim() && currentBlock) {
      currentBlock.content.hi += line + '\n';
    }

    i++;
  }

  // Don't forget the last block
  if (currentBlock) {
    blocks.push({ ...currentBlock, order: blockOrder });
  }

  return blocks;
}

function isNewSection(line) {
  if (!line) return false;
  const trimmed = line.trim();
  return (
    trimmed.startsWith('#') ||
    trimmed.includes('श्लोक') ||
    trimmed.includes('प्रसंग') ||
    trimmed.includes('तात्पर्य') ||
    trimmed.includes('चर्चा का विषय') ||
    trimmed.includes('उदाहरण')
  );
}

function extractText(markdown) {
  if (!markdown) return '';
  return markdown.replace(/\*+/g, '').trim();
}

// Import function
const importChapters = async () => {
  try {
    await connectDB();
    console.log('Connected to MongoDB.\n');

    const content = fs.readFileSync(CONTENT_FILE, 'utf-8');
    const chapters = parseGeetapath(content);

    console.log(`Parsed ${chapters.length} chapters from geetapath.md\n`);

    for (const chapterData of chapters) {
      const { blocks, ...chapterInfo } = chapterData;

      // Create chapter
      const chapter = await Chapter.create(chapterInfo);
      console.log(`✓ Created Chapter ${chapter.number}: ${chapter.title.hi}`);

      // Create content blocks
      for (const blockData of blocks) {
        const block = await ContentBlock.create({
          ...blockData,
          chapter_id: chapter._id,
        });

        // If shloka group, also create Shloka entries
        if (blockData.type === 'shloka_group' && blockData.metadata.sanskrit_verses) {
          for (const verse of blockData.metadata.sanskrit_verses) {
            await Shloka.create({
              chapter_id: chapter._id,
              content_block_id: block._id,
              reference: verse.ref,
              sanskrit: verse.verse,
              translation: { hi: '', en: '' },
              order: verse.order,
            });
          }
        }
      }

      console.log(`  ✓ Created ${blocks.length} content blocks`);
    }

    console.log('\n✅ Import complete!');
    process.exit(0);
  } catch (err) {
    console.error('Import failed:', err.message);
    console.error(err.stack);
    process.exit(1);
  }
};

importChapters();
