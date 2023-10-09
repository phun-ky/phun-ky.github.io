const html = String.raw;

export const PostByline = (year, month, day) => {
  const dtf = new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'long',
    day: '2-digit'
  });
  const publishedData = new Date(`${year}/${month}/${day}`);
  const todayDate = new Date();
  const formattedDate = dtf.format(publishedData.getTime());
  const diffDays = parseInt(
    (todayDate - publishedData) / (1000 * 60 * 60 * 24),
    10
  );
  const displayDate =
    diffDays > 6 ? `on ${formattedDate}` : diffDays === 0 ? 'today' : `${diffDays} days ago`;

  return html`<address class="ph byline">
    Written by <a href="/" class="ph">Alexander</a>
    <time pubdate datetime="${year}-${month}-${day}" class="ph">
      &nbsp;• ${displayDate}
    </time>
    <span class="ph read-time"></span>
  </address>`;
};
