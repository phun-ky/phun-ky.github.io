const html = String.raw;

export const PostByline = (year, month, day) => {
  const dtf = new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'long',
    day: '2-digit'
  });
  const d = new Date(`${year}/${month}/${day}`);
  const date = dtf.format(d.getTime());

  return html`<address class="ph byline">
  Written by <a href="/" class="ph">Alexander</a> on <time pubdate datetime="${year}-${month}-${day}" class="ph">${date}</time>
  </address>`;
}
