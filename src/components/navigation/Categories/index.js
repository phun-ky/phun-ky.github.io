import { slugify } from "../../../utils/slugify.js";

const html = String.raw;

export const Categories = (categories) => {
  return html`<h3 class="ph categories-title">Categories</h3>
  <ul class="ph categories">${[...categories]
    .sort()
    .map((category) => {
      return `
    <li class="ph category">
    <a class="ph category-link" href="/categories/${slugify(
  category.toLowerCase()
)}">${category}</a>

    </li>`;
    })
    .join('\n')}
</ul>`;
}
