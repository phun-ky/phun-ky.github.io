const html = String.raw;

// GitHub Pages serves `/a/b.html` at `/a/b`, but not at `/a/b/`, which ends up
// on the 404 page. Retry without the trailing slash, which can't loop.
export const TrailingSlashRedirect = () => {
  return html`<script id="trailing-slash-redirect">
    if (location.pathname.length > 1 && location.pathname.endsWith('/')) {
      location.replace(
        location.pathname.replace(/[/]+$/, '') + location.search + location.hash
      );
    }
  </script>`;
};
