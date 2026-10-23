import fs, { globSync } from 'node:fs';
import { basename, join } from 'node:path';
import process from 'node:process';

// Fails when the built site ships a font file that no page uses, directly or
// through a stylesheet a page loads. Copying a whole folder into `src/assets`
// once published licensed fonts nothing used.
const DIST_DIR = process.argv[2] ?? 'dist';

if (!fs.existsSync(DIST_DIR)) {
  console.error(`\`${DIST_DIR}\` does not exist, run \`npm run build\` first`);
  process.exit(1);
}

const read = (file) => fs.readFileSync(join(DIST_DIR, file), 'utf-8');
const fonts = globSync('**/*.{woff,woff2,ttf,otf,eot}', { cwd: DIST_DIR });
const pages = globSync('**/*.html', { cwd: DIST_DIR }).map(read);
const stylesheets = globSync('**/*.css', { cwd: DIST_DIR });
// A stylesheet counts once a page or a counted stylesheet refers to it.
const loaded = [...pages];
const pending = new Set(stylesheets);

let found = true;

while (found) {
  found = false;

  for (const stylesheet of pending) {
    if (loaded.some((source) => source.includes(basename(stylesheet)))) {
      loaded.push(read(stylesheet));
      pending.delete(stylesheet);
      found = true;
    }
  }
}

const unused = fonts.filter(
  (font) => !loaded.some((source) => source.includes(basename(font)))
);

if (unused.length !== 0) {
  console.error(
    `${unused.length} font file(s) in \`${DIST_DIR}\` are not used by any page or loaded stylesheet:`
  );
  unused.forEach((font) => console.error(`  ${font}`));
  process.exit(1);
}

console.log(`fonts: ${fonts.length} font file(s), all used`);
