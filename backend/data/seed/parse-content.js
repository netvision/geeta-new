/**
 * parse-content.js
 * Parses geetapaath.md into structured chapter objects for seeding.
 *
 * Chapter format in the source file:
 *   **पाठ N**              — chapter number line (N = Arabic or Devanagari digit)
 *   **Title**              — chapter title (next bold line)
 *   Body: shlokas, प्रसंग, तात्पर्य, explanation, sub-headers, discussion
 *
 * Shloka formats:
 *   Ch 1 style:  line ending ।  \n  line ending ॥N॥
 *   Ch 2+ style: line ending |  \n  line ending ||N-N||
 */

'use strict';
const fs = require('fs');

// ── Devanagari digit conversion ───────────────────────────────────────────────
const DEVA_MAP = { '०':'0','१':'1','२':'2','३':'3','४':'4','५':'5','६':'6','७':'7','८':'8','९':'9' };
function devaToArabic(s) { return s.replace(/[०-९]/g, c => DEVA_MAP[c]); }

// ── Journey phase mapping ─────────────────────────────────────────────────────
const JOURNEY_PHASES = {
  1:'problem', 2:'problem', 3:'problem', 4:'path', 5:'path',
  6:'obstacle', 7:'obstacle', 8:'practice', 9:'practice', 10:'practice',
  11:'path', 12:'path', 13:'path', 14:'obstacle', 15:'obstacle',
  16:'obstacle', 17:'obstacle', 18:'obstacle', 19:'practice', 20:'practice',
  21:'practice', 22:'practice', 23:'obstacle', 24:'practice', 25:'practice',
  26:'practice', 27:'mastery', 28:'mastery', 29:'mastery', 30:'mastery',
};

// ── Illustration palettes ─────────────────────────────────────────────────────
const PALETTES = [
  ['#8B1A1A','#D4A017','#1A3A4A'], ['#D4A017','#4A6741','#3D1F10'],
  ['#1B3252','#4A6741','#D4A017'], ['#C2440B','#B8860B','#1B3252'],
  ['#C2440B','#FDF6E3','#4A6741'], ['#8B1A1A','#1B3252','#D4A017'],
  ['#4A2C0A','#B8860B','#FDF6E3'], ['#1B3252','#8B1A1A','#C2440B'],
  ['#4A6741','#D4A017','#1B3252'], ['#B8860B','#3D1F10','#4A6741'],
  ['#1B3252','#D4A017','#8B1A1A'], ['#C2440B','#4A6741','#FDF6E3'],
  ['#3D1F10','#B8860B','#1B3252'], ['#8B4513','#D4A017','#1A3A4A'],
  ['#1B3252','#8B1A1A','#FDF6E3'], ['#4A2C0A','#C2440B','#B8860B'],
  ['#6B2737','#D4A017','#1B3252'], ['#2C4A1A','#B8860B','#8B1A1A'],
  ['#1B3252','#C2440B','#4A6741'], ['#8B1A1A','#4A6741','#D4A017'],
  ['#B8860B','#1B3252','#FDF6E3'], ['#B8860B','#1B3252','#FDF6E3'],
  ['#1B3252','#8B1A1A','#4A6741'], ['#4A6741','#B8860B','#1B3252'],
  ['#C2440B','#1B3252','#D4A017'], ['#1B3252','#4A6741','#B8860B'],
  ['#8B1A1A','#B8860B','#1B3252'], ['#4A2C0A','#1B3252','#D4A017'],
  ['#1B3252','#C2440B','#B8860B'], ['#4A6741','#D4A017','#8B1A1A'],
];

// ── Slug builder ──────────────────────────────────────────────────────────────
const TITLE_MAP = {
  'मोह':'moh', 'परिस्थिति':'paristhiti', 'नित्य':'nitya', 'अनित्य':'anitya',
  'उद्देश्य':'uddeshya', 'करने':'karne', 'योग्य':'yogya', 'बाधा':'baadha',
  'कर्म':'karma', 'साधन':'sadhan', 'असाधन':'asadhan', 'समत्व':'samatva',
  'ध्यान':'dhyan', 'अभ्यास':'abhyas', 'शान्ति':'shanti', 'शांति':'shanti',
  'अन्तिम':'antim', 'स्थिति':'sthiti', 'चुप':'chup', 'विवेक':'vivek',
  'दृष्टि':'drishti', 'इन्द्रिय':'indriya', 'व्यक्तित्व':'vyaktitva',
  'विलक्षणता':'vilakshanata', 'महत्ता':'mahatta', 'आश्रय':'aashray',
  'केवल':'keval', 'सत्ता':'satta', 'प्रकृति':'prakriti', 'भक्ति':'bhakti',
  'त्याग':'tyaag', 'ज्ञान':'gyan', 'क्षेत्र':'kshetra', 'परिवर्तन':'parivartan',
  'गुण':'gun', 'पुरुष':'purush', 'मार्ग':'maarg', 'मोक्ष':'moksha',
  'स्मरण':'smaran', 'चिन्तन':'chintan', 'सिद्ध':'siddha', 'साधक':'sadhak',
  'परम्परा':'parampara', 'योग':'yog', 'अवतार':'avtar', 'यज्ञ':'yagya',
  'द्वन्द्व':'dvandva', 'संकल्प':'sankalp', 'समता':'samata',
  'आचरण':'aacharan', 'परिस्थिति':'paristhiti', 'कर्ता':'karta',
};

function slugify(num, title) {
  const n = String(num).padStart(2, '0');
  const words = title.replace(/["""\/]/g, ' ').split(/\s+/).slice(0, 3);
  const parts = words.map(w => TITLE_MAP[w]).filter(Boolean);
  return parts.length ? `paath-${n}-${parts.join('-')}` : `paath-${n}`;
}

// ── Shloka detection ──────────────────────────────────────────────────────────
// Takes current line + optional next line for lookahead (Ch 1 ।-ending first halves)
function isShloka(line, nextLine) {
  const t = line.trim();
  if (!t || t.length < 4) return false;
  if (!/[\u0900-\u097F]/.test(t)) return false;
  if (/^अर्थात/.test(t)) return false;
  // Definitive: line contains double danda ॥ or double pipe || (verse number markers)
  if (t.includes('॥') || t.includes('||')) return true;
  // First half of a two-line shloka: ends with single | or ।
  // BUT only count as shloka if the next non-blank line has a verse number marker
  // This prevents Hindi prose sentences ending with | (used as sentence terminator) from matching
  if ((t.endsWith('|') || t.endsWith('।')) && t.length <= 100 && nextLine !== undefined) {
    const n = nextLine.trim();
    if (n.includes('॥') || n.includes('||')) return true;
  }
  return false;
}

function isDiscussion(line) {
  return /चर्चा का विषय/.test(line);
}

function stripBold(line) {
  return line.replace(/\*\*/g, '').trim();
}

function isBoldOnly(line) {
  // A line that is ONLY a bold expression: **text** (with optional spaces)
  return /^\s*\*\*[^*]+\*\*\s*$/.test(line);
}

// ── Main parser ───────────────────────────────────────────────────────────────
function parseChapters(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const lines = raw.split('\n');
  const chapters = [];

  // ── Find chapter boundaries ─────────────────────────────────────────────────
  // Matches: **पाठ N** where N is Arabic (2, 10) or Devanagari (१, २०)
  const CHAPTER_RE = /^\s*\*\*पाठ\s+([\d०-९]+)\*\*/;
  const chapterStarts = [];
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(CHAPTER_RE);
    if (m) {
      chapterStarts.push({ lineNum: i, num: parseInt(devaToArabic(m[1])) });
    }
  }

  // ── Parse each chapter ──────────────────────────────────────────────────────
  for (let ci = 0; ci < chapterStarts.length; ci++) {
    const { lineNum, num } = chapterStarts[ci];
    const endLine = ci + 1 < chapterStarts.length ? chapterStarts[ci + 1].lineNum : lines.length;
    const cl = lines.slice(lineNum, endLine); // chapter lines

    // Title: first bold-only line after the **पाठ N** line (skip blanks)
    let title = '';
    let titleIdx = 0;
    for (let i = 1; i < Math.min(cl.length, 10); i++) {
      const t = cl[i].trim();
      if (!t) continue;
      if (isBoldOnly(cl[i]) && !cl[i].match(CHAPTER_RE)) {
        title = stripBold(cl[i]);
        titleIdx = i;
        break;
      }
      // If we hit non-blank non-bold content first, no separate title line
      break;
    }
    if (!title) title = `पाठ ${num}`;

    // ── Section parsing ───────────────────────────────────────────────────────
    const sections = [];
    let order = 0;
    let shlokaBuffer = [];
    let textBuffer = [];
    let inDiscussion = false;
    let discussionQs = [];

    const pushShloka = (meta) => {
      if (!shlokaBuffer.length) return;
      sections.push({
        type: 'shloka',
        order: ++order,
        title: { hi: meta || 'श्लोक', en: 'Shloka' },
        shloka_ref: '',
        sanskrit: shlokaBuffer.join('\n'),
        content: { hi: '', en: '' },
        questions: [],
      });
      shlokaBuffer = [];
    };

    const pushText = (type = 'explanation', titleHi = '', titleEn = '') => {
      const text = textBuffer.join('\n').trim();
      if (!text) { textBuffer = []; return; }
      sections.push({
        type,
        order: ++order,
        title: { hi: titleHi, en: titleEn },
        shloka_ref: '',
        sanskrit: '',
        content: { hi: text, en: '' },
        questions: [],
      });
      textBuffer = [];
    };

    let i = titleIdx + 1;
    let pendingSubheader = ''; // bold subheader waiting to be attached

    while (i < cl.length) {
      const raw = cl[i];
      const line = raw.trim();
      const nextLine = cl[i + 1] || '';
      i++;

      // blank line
      if (!line) {
        // If shloka buffer is active, check if next non-empty line continues shloka
        if (shlokaBuffer.length) {
          let j = i;
          while (j < cl.length && !cl[j].trim()) j++;
          const peek = cl[j] || '';
          if (!isShloka(peek, cl[j + 1] || '')) {
            pushShloka(pendingSubheader);
            pendingSubheader = '';
          }
        }
        continue;
      }

      // ── Discussion start ────────────────────────────────────────────────────
      if (isDiscussion(line)) {
        pushShloka(pendingSubheader); pendingSubheader = '';
        pushText();
        inDiscussion = true;
        continue;
      }

      // ── Inside discussion: collect questions ────────────────────────────────
      if (inDiscussion) {
        // Collect until next shloka, next bold subheader (not discussion), or end of chapter
        if (isShloka(line, nextLine)) {
          // Discussion ended (new shloka block inside same chapter — rare)
          inDiscussion = false;
          // fall through to shloka handling below
        } else {
          // Strip list markers: 1. 2. \- - *
          const q = line
            .replace(/^\d+[.)]\s*/, '')
            .replace(/^\\?[-–*]\s*/, '')
            .replace(/\*\*/g, '')
            .trim();
          if (q.length > 5) discussionQs.push({ hi: q, en: '' });
          continue;
        }
      }

      // ── Bold line ───────────────────────────────────────────────────────────
      if (isBoldOnly(raw)) {
        const headerText = stripBold(raw);
        // Skip if it's the chapter title or a "श्लोक" label
        if (headerText === title || /^श्लोक\s*[:.]?\s*$/.test(headerText)) continue;
        // If bold line is a discussion header, treat same as non-bold discussion
        if (isDiscussion(headerText)) {
          pushShloka(pendingSubheader); pendingSubheader = '';
          pushText();
          inDiscussion = true;
          continue;
        }

        pushShloka(pendingSubheader); pendingSubheader = '';
        pushText();

        // Peek: if next non-empty line is a shloka, this header is the shloka's label
        let j = i;
        while (j < cl.length && !cl[j].trim()) j++;
        const peek = cl[j] || '';
        if (isShloka(peek, cl[j + 1] || '')) {
          pendingSubheader = headerText;
        } else {
          // It's a content subheader — emit immediately
          sections.push({
            type: 'context',
            order: ++order,
            title: { hi: headerText, en: '' },
            shloka_ref: '',
            sanskrit: '',
            content: { hi: '', en: '' },
            questions: [],
          });
        }
        continue;
      }

      // ── Shloka line ─────────────────────────────────────────────────────────
      if (isShloka(line, nextLine)) {
        if (textBuffer.length) pushText();
        shlokaBuffer.push(line.replace(/\\$/, '').trim());
        continue;
      }

      // ── After shloka, flush it ──────────────────────────────────────────────
      if (shlokaBuffer.length) {
        pushShloka(pendingSubheader);
        pendingSubheader = '';
      }

      // ── प्रसंग section ──────────────────────────────────────────────────────
      if (/^प्रसंग\s*:/.test(line)) {
        pushText();
        const first = line.replace(/^प्रसंग\s*:\s*/, '').trim();
        const buf = first ? [first] : [];
        while (i < cl.length) {
          const t = cl[i].trim();
          if (!t) { i++; continue; }
          if (isShloka(t, cl[i + 1] || '') || isDiscussion(t) || isBoldOnly(cl[i]) ||
              /^तात्पर्य\s*:/.test(t)) break;
          buf.push(stripBold(t));
          i++;
        }
        sections.push({
          type: 'context', order: ++order,
          title: { hi: 'प्रसंग', en: 'Context' },
          shloka_ref: '', sanskrit: '',
          content: { hi: buf.join('\n').trim(), en: '' },
          questions: [],
        });
        continue;
      }

      // ── तात्पर्य section ────────────────────────────────────────────────────
      if (/^तात्पर्य\s*:/.test(line)) {
        pushText();
        const first = line.replace(/^तात्पर्य\s*:\s*/, '').trim();
        const buf = first ? [first] : [];
        while (i < cl.length) {
          const t = cl[i].trim();
          if (!t) { i++; continue; }
          if (isShloka(t, cl[i + 1] || '') || isDiscussion(t) || isBoldOnly(cl[i])) break;
          buf.push(stripBold(t));
          i++;
        }
        sections.push({
          type: 'tatparya', order: ++order,
          title: { hi: 'तात्पर्य', en: 'Essence' },
          shloka_ref: '', sanskrit: '',
          content: { hi: buf.join('\n').trim(), en: '' },
          questions: [],
        });
        continue;
      }

      // ── Regular explanation text ────────────────────────────────────────────
      textBuffer.push(stripBold(line));
    }

    // Flush remaining buffers
    pushShloka(pendingSubheader);
    pushText();

    // Add discussion section
    if (discussionQs.length) {
      sections.push({
        type: 'discussion', order: ++order,
        title: { hi: 'चर्चा का विषय', en: 'Discussion Topics' },
        shloka_ref: '', sanskrit: '',
        content: { hi: '', en: '' },
        questions: discussionQs,
      });
    }

    // ── Build chapter object ─────────────────────────────────────────────────
    const tatparyaText = sections.find(s => s.type === 'tatparya')?.content?.hi || '';
    chapters.push({
      number: num,
      number_devanagari: devaToArabic(String(num)).replace(/\d/g, d => '०१२३४५६७८९'[+d]),
      slug: slugify(num, title),
      title: { hi: title, en: '' },
      gita_chapters_referenced: [],
      journey_phase: JOURNEY_PHASES[num] || 'practice',
      theme_tags: [],
      essence: { hi: tatparyaText.slice(0, 200), en: '' },
      illustration: {
        cloudinary_url: null,
        cloudinary_id: null,
        alt: { hi: `पाठ ${num} — ${title}`, en: '' },
        palette: PALETTES[(num - 1) % PALETTES.length],
        type: 'placeholder',
        credit: '',
        fallback_devanagari: '०१२३४५६७८९'[num] || String(num),
      },
      sections,
      key_terms: [],
      related_paaths: [],
      is_free: num <= 5,
      is_published: true,
      order: num,
    });
  }

  return chapters;
}

module.exports = parseChapters;
