const MAX_LENGTH = 160;
const MIN_PARAGRAPH = 40;
const toText = (html) =>
  html
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

/**
 * A description for a post that has none in its front matter: the first
 * paragraph of prose, without markup, cut at a word boundary. Figures, code
 * and note boxes are skipped.
 * @param {string} html - The rendered post.
 * @returns {string} Plain text, at most MAX_LENGTH characters.
 */
export const getSummary = (html) => {
  const prose = html
    .replace(/<figure\b[\s\S]*?<\/figure>/gi, '')
    .replace(/<pre\b[\s\S]*?<\/pre>/gi, '')
    .replace(/<div class="[^"]*\bmessage\b[^"]*">[\s\S]*?<\/div>/gi, '');
  const paragraphs = [...prose.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/gi)]
    .map(([, paragraph]) => toText(paragraph))
    .filter(Boolean);
  const text =
    paragraphs.find((paragraph) => paragraph.length >= MIN_PARAGRAPH) ??
    paragraphs.join(' ');

  if (text.length <= MAX_LENGTH) return text;

  const cut = text.slice(0, MAX_LENGTH - 1);

  return `${cut.slice(0, cut.lastIndexOf(' ')).replace(/[\s.,;:!?]+$/, '')}…`;
};
