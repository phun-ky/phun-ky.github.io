import { slugify } from "../../../utils/slugify.js";

const html = String.raw;

export const PostsList = (posts) => {
  return html`<ul class="ph posts">${posts
    .map((post) => {
      const { title, description, url, year, month, day, category } = post;

      return `
    <li class="ph post">
    <a class="ph post-link" href="${url}">
      <h2 class="ph post-title">${title}</h2>
      <p class="ph post-description">${description}</p>
    </a>
    <address class="ph post-meta">
      Written by Alexander in <a class="ph" href="/categories/${slugify(
  category.toLowerCase()
)}">${category}</a> on <time pubdate datetime="${year}-${month}-${day}" class="ph">${year}/${month}/${day}</time>
      </address>
    </li>`;
    })
    .join('\n')}
</ul>`
}
