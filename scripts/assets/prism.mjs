import fs, { globSync } from 'node:fs';
import { basename, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

// Copies Prism from node_modules into the site, so no page loads it from a
// CDN. The layout matches the prismjs package, because the autoloader finds
// language files in `components/` next to its own `plugins/` folder.
const DIR_NAME = dirname(fileURLToPath(import.meta.url));
const SOURCE_DIR = join(DIR_NAME, '../../node_modules/prismjs');
const TARGET_DIR = join(DIR_NAME, '../../dist/js/prism');
const FILES = [
  'prism.js',
  'LICENSE',
  ...globSync('components/*.min.js', { cwd: SOURCE_DIR }),
  'plugins/autoloader/prism-autoloader.min.js',
  'plugins/inline-color/prism-inline-color.min.js',
  'plugins/inline-color/prism-inline-color.min.css'
];

FILES.forEach((file) => {
  const target = join(TARGET_DIR, file);

  fs.mkdirSync(dirname(target), { recursive: true });
  fs.copyFileSync(join(SOURCE_DIR, file), target);
});

console.log(`prism: copied ${FILES.length} files to ${basename(TARGET_DIR)}`);
