import Markdoc from '@markdoc/markdoc';

import { processTokens } from './process-tokens.js';
import { parseMarkdocFrontmatter } from './parse-markdoc-frontmatter.js';
import { getHTMLfromMarkdown } from './get-html-from-markdown.js';

export const getFrontmatter = (text) => {
  const tokenizer = new Markdoc.Tokenizer({ html: true });
  const tokens = tokenizer.tokenize(text);
  const processed = processTokens(tokens);
  const ast = Markdoc.parse(processed);
  const frontmatter = parseMarkdocFrontmatter(ast);
  const { route } = frontmatter;


  if (route) {
    const matches = route.match(/\/([0-9]{4})\/([0-9]{2})\/([0-9]{2})\/(.*)/);

    if (matches) {
      // eslint-disable-next-line no-unused-vars
      const [string, year, month, day, slug] = matches;

      frontmatter.year = year;
      frontmatter.month = month;
      frontmatter.day = day;
      frontmatter.slug = slug;
    }
  }

  frontmatter.description = getHTMLfromMarkdown(frontmatter.description).replace('<article>','').replace('</article>','').replace('<p>','').replace('</p>','');

  return frontmatter;
};
