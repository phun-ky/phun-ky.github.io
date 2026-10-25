import fs, { globSync } from 'node:fs';
import process from 'node:process';

// Fails when the built site ships source files: the posts' Markdown was once
// published next to the rendered pages because the whole of src/assets was
// copied into the site.
const DIST_DIR = process.argv[2] ?? 'dist';
const SOURCES = '**/*.{md,markdoc,mdoc}';

if (!fs.existsSync(DIST_DIR)) {
  console.error(`\`${DIST_DIR}\` does not exist, run \`npm run build\` first`);
  process.exit(1);
}

const sources = globSync(SOURCES, { cwd: DIST_DIR });

if (sources.length !== 0) {
  console.error(
    `${sources.length} source file(s) in \`${DIST_DIR}\`, e.g. ${sources.slice(0, 3).join(', ')}`
  );
  process.exit(1);
}

console.log(`sources: no source files in \`${DIST_DIR}\``);
