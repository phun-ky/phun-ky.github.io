import { slugify } from "../../../utils/slugify.js";

const html = String.raw;

export const Tags = (tags) => {
  if(!tags) return '';

  return html`<h3 class="ph categories-title">Tags</h3>
  <ul class="ph tags">${tags
    .sort()
    .map((tag) => {
      return `
    <li class="ph tag">
    <a class="ph tag-link" href="/tags/${slugify(
    tag.toLowerCase()
  )}">${tag}</a>

    </li>`;
    })
    .join('\n')}
</ul>`;
};
