import fs, { globSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { Link } from '../../src/components/navigation/Link/index.js';
import { Author } from '../../src/components/page-sections/Author/index.js';
import { Footer } from '../../src/components/page-sections/Footer/index.js';
import { Header } from '../../src/components/page-sections/Header/index.js';
import { slugify } from '../../src/utils/slugify.js';

import { BodyScripts } from './components/BodyScripts/index.js';
import { GlobalCSS } from './components/GlobalCSS/index.js';
import { HeadScripts } from './components/HeadScripts/index.js';
import { OpenGraphTags } from './components/OpenGraphTags/index.js';
import { getFrontmatter } from './utils/get-frontmatter.js';

// Writes /categories/ and /tags/: every category and tag with its number of
// posts, linking to the pages categories.js and tags.js write.
const html = String.raw;
const __dirname = dirname(fileURLToPath(import.meta.url));
const CONTENT_DIR = join(__dirname, '../../src/assets/posts');
const TEMPLATE = fs.readFileSync(
  resolve(__dirname, '../../src/pages/Tags/template.html'),
  'utf-8'
);
const frontmatters = globSync(`${CONTENT_DIR}/*.md`).map((file) =>
  getFrontmatter(fs.readFileSync(file, 'utf-8'))
);
// Names that differ only in case or spacing share a page, because pages are
// named by slug; count them together, under the most used spelling
const countBySlug = (names) => {
  const groups = new Map();

  names.forEach((name) => {
    const slug = slugify(name.toLowerCase());
    const group = groups.get(slug) ?? { slug, total: 0, spellings: new Map() };

    group.total += 1;
    group.spellings.set(name, (group.spellings.get(name) ?? 0) + 1);
    groups.set(slug, group);
  });

  return [...groups.values()]
    .map(({ slug, total, spellings }) => ({
      slug,
      total,
      name: [...spellings].sort((a, b) => b[1] - a[1])[0][0]
    }))
    .sort((a, b) => a.name.localeCompare(b.name, 'en'));
};
const list = (kind, items) =>
  html`<ul class="ph ${kind.list}">
    ${items
      .map(
        ({ slug, total, name }) =>
          html`<li class="ph ${kind.item}">
            ${Link({
              to: `/${kind.path}/${slug}`,
              className: kind.link,
              content: `${name} (${total})`
            })}
          </li>`
      )
      .join('\n')}
  </ul>`;
const write = (kind, items) => {
  const description = `Every ${kind.noun} on the site, with the number of posts in it.`;
  const page = [
    [/{{OPEN_GRAPH}}/, () => OpenGraphTags({ title: kind.title, description })],
    [/{{GLOBAL_CSS}}/, () => GlobalCSS()],
    [/{{HEAD_SCRIPTS}}/, () => HeadScripts()],
    [/{{BODY_SCRIPTS}}/, () => BodyScripts()],
    [/{{PAGE_SECTION_HEADER}}/, () => Header()],
    [/{{PAGE_SECTION_AUTHOR}}/, () => Author()],
    [/{{PAGE_SECTION_FOOTER}}/, () => Footer()],
    [/{{TAG_TITLE}}/, () => kind.title],
    [/{{TAG}}/, () => kind.title],
    [/{{TAG_DESCRIPTION}}/, () => description],
    [/{{FRONTPAGE_POSTS}}/, () => list(kind, items)],
    [/{{POST_CATEGORIES}}/, () => ''],
    [/{{POST_TAGS}}/, () => '']
  ].reduce(
    (result, [placeholder, value]) => result.replace(placeholder, value),
    TEMPLATE
  );
  const dir = join(__dirname, `../../dist/${kind.path}`);

  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(join(dir, 'index.html'), page, 'utf-8');

  return items.length;
};
const categories = write(
  {
    title: 'Categories',
    noun: 'category',
    path: 'categories',
    list: 'categories',
    item: 'category',
    link: 'category-link'
  },
  countBySlug(frontmatters.map(({ category }) => category ?? 'archive'))
);
const tags = write(
  {
    title: 'Tags',
    noun: 'tag',
    path: 'tags',
    list: 'tags',
    item: 'tag',
    link: 'tag-link'
  },
  countBySlug(frontmatters.flatMap(({ tags: names }) => names ?? []))
);

console.log(`indexes: /categories/ (${categories}) and /tags/ (${tags})`);
