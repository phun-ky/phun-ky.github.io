/* eslint-disable import/no-named-as-default-member */
import Markdoc from '@markdoc/markdoc';

import fs, { globSync } from 'node:fs';

import { parseMarkdocFrontmatter } from './parse-markdoc-frontmatter.js';
import { processTokens } from './process-tokens.js';

export const createContentManifest = (ROOT_DIR) => {
  const files = globSync(`${ROOT_DIR}/*.md`);
  const manifest = {};

  files.forEach((file) => {
    const rawText = fs.readFileSync(file, 'utf-8');
    const tokenizer = new Markdoc.Tokenizer({ html: true });
    const tokens = tokenizer.tokenize(rawText);
    const processed = processTokens(tokens);
    const ast = Markdoc.parse(processed);
    const frontmatter = parseMarkdocFrontmatter(ast);

    manifest[frontmatter.route] = {
      ast,
      frontmatter
    };
  });

  return manifest;
};
