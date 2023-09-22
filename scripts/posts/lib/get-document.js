import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { createContentManifest } from './create-content-manifest';

export const getDocument = (req) => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const CONTENT_DIR = join(__dirname, '../../../../../@docs');
  const contentManifest = createContentManifest(CONTENT_DIR);
  const path = req.path.replace('/docs/', '/');
  const document = contentManifest[path];

  return document;
};
