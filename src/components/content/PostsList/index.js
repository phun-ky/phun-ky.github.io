import { slugify } from '../../../utils/slugify.js';

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
              <a class="ph" href="${url}">${title}</a> –
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
            <a class="ph post-link" href="${url}">
              <h2 class="ph post-title">${title}</h2>
              <p class="ph post-description">${description}</p>
            </a>
            <address class="ph post-meta">
              Written by <a href="/" class="ph">Alexander</a> in
              <a
                class="ph"
                href="/categories/${slugify(category.toLowerCase())}"
                >${category}</a
              >
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
