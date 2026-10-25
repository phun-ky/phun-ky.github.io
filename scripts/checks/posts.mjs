import fs, { globSync } from 'node:fs';
import { join } from 'node:path';
import process from 'node:process';

// Fails on Markdown in the posts that the site's renderer (Markdoc) shows
// differently than the author meant: a code block indented by four spaces is
// shown as a plain paragraph, so code in posts must be fenced (```lang).
const POSTS_DIR = process.argv[2] ?? 'src/assets/posts';
const FENCE = /^\s*```/;
const INDENTED = /^ {4}\S/;
const LIST_ITEM = /^\s*([-*+]|\d+\.)\s/;
const failures = [];

globSync('*.md', { cwd: POSTS_DIR })
  .sort()
  .forEach((file) => {
    const lines = fs.readFileSync(join(POSTS_DIR, file), 'utf-8').split('\n');

    let inFence = false;

    lines.forEach((line, index) => {
      if (FENCE.test(line)) inFence = !inFence;

      if (inFence || index < 2 || !INDENTED.test(line)) return;

      const [before, beforeThat] = [lines[index - 1], lines[index - 2]];
      // An indented line after a blank line starts a code block, unless it
      // continues a list item or another indented block
      const startsCodeBlock =
        before.trim() === '' &&
        !LIST_ITEM.test(beforeThat) &&
        !/^\s+\S/.test(beforeThat);

      if (startsCodeBlock) {
        failures.push(
          `${file}:${index + 1}: indented code block, use a fenced block (\`\`\`lang)`
        );
      }
    });
  });

if (failures.length !== 0) {
  failures.forEach((failure) => console.error(failure));
  process.exit(1);
}

console.log('posts: no indented code blocks');
