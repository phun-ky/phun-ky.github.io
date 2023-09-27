const html = String.raw;

export const HeadScripts = () => {
  return html`<script>
    if (
      (localStorage.getItem('prefers-color-scheme') &&
        localStorage.getItem('prefers-color-scheme') === 'light') ||
      (!localStorage.getItem('prefers-color-scheme') &&
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: light)').matches)
    ) {
      document.querySelector('html').classList.add('theme--light');
    }
  </script>`;
};
