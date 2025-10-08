import { slugify } from '../../../utils/slugify.js';

import { Link } from '../../navigation/Link/index.js';

const html = String.raw;

export const Tags = (tags) => {
  if (!tags) return '';

  return html`<h3 class="ph tags-title">Tags</h3>
    <ul class="ph tags">
      ${tags
        .sort()
        .map((tag) => {
          return html`<li class="ph tag">
            ${Link({
              to: `/tags/${slugify(tag.toLowerCase())}`,
              className: 'tag-link',
              content: tag,
            })}
          </li>`;
        })
        .join('\n')}
    </ul>`;
};
