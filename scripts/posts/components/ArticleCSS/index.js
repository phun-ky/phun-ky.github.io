const html = String.raw;

export const ArticleCSS = () => {
  return html`<link
  rel="preload"
  href="/css/prism.css"
  as="style"
  onload="this.onload=null;this.rel='stylesheet'"
/>
<noscript><link rel="stylesheet" href="/css/prism.css" /></noscript>`;
};
