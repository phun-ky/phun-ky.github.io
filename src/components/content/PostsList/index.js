import { slugify } from '../../../utils/slugify.js';

import { Link } from '../../navigation/Link/index.js';

const html = String.raw;

export const PostsList = (posts, quantity = 20, excludeCategory) => {
  if (excludeCategory && typeof excludeCategory === 'string') {
    posts = posts.filter(
      (post) => excludeCategory.toLowerCase() !== post.category.toLowerCase()
    );
  }

  if (quantity && typeof quantity === 'number') {
    posts = posts.slice(0, quantity);
  }

  let extraPosts = '';

  if (posts.length > 20) {
    extraPosts = html`<h2 class="ph">Older posts</h2>
      <ul class="ph">
        ${posts
    .slice(20, posts.length - 20)
    .map((post) => {
      const { title, url, year, month, day } = post;

      return html`<li class="ph">
              ${Link({to: url, content: title})} –
              <time pubdate datetime="${year}-${month}-${day}" class="ph"
                >${year}/${month}/${day}</time
              >
            </li>`;
    })
    .join('\n')}
      </ul>`;
  }

  return html`<ul class="ph posts">
      ${posts
    .slice(0, 20)
    .map((post) => {
      const { title, description, url, year, month, day, category } = post;

      return html` <li class="ph post">

            ${Link({to: url, className: 'post-link', content: html`
            <h2 class="ph post-title">${title}</h2>
              ${description ? `<p class="ph post-description">${description.replaceAll(/(&nbsp;|<([^>]+)>)/ig,'')}</p>`: ''}
              `})}

            <address class="ph post-meta">
              Written by <a href="/" class="ph">Alexander</a> in
              ${Link({to: `/categories/${slugify(category.toLowerCase())}`, content: category})}
              on
              <time pubdate datetime="${year}-${month}-${day}" class="ph"
                >${year}/${month}/${day}</time
              >
            </address>
          </li>`;
    })
    .join('\n')}
    </ul>
    ${extraPosts}`;
};
