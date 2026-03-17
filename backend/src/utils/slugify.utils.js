// Generates a URL-safe slug for a chapter
// e.g. number=1, titleEn="Attachment" → "paath-01-attachment"
const generateChapterSlug = (number, titleEn = '') => {
  const paddedNum = String(number).padStart(2, '0');
  if (!titleEn.trim()) return `paath-${paddedNum}`;
  const cleanTitle = titleEn
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
  return `paath-${paddedNum}-${cleanTitle}`;
};

module.exports = { generateChapterSlug };
