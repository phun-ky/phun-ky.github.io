import Markdoc from '@markdoc/markdoc';

import { processTokens } from './process-tokens.js';
import { parseMarkdocFrontmatter } from './parse-markdoc-frontmatter.js';
import { getMarkdocConfig } from './get-markdoc-config.js';

export const getHTMLfromMarkdown = md => {
  if(!md || md && md.length === 0) return '';

  const tokenizer = new Markdoc.Tokenizer({ html: true });
  const tokens = tokenizer.tokenize(md);
  const processed = processTokens(tokens);
  const ast = Markdoc.parse(processed);
  const frontmatter = parseMarkdocFrontmatter(ast);
  const config = getMarkdocConfig({ast, frontmatter});
  const content = Markdoc.transform(ast, config);

  if (content) {
    const rendered = Markdoc.renderers.html(content) || '';

    return rendered;
  } else {
    return '';
  }
};
