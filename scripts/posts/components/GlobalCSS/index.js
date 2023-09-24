const html = String.raw;

export const GlobalCSS = () => {
  return html`<style type="text/css">
  *.ph,
  *.ph::after,
  *.ph::before {
    margin: 0;
    padding: 0;
    word-break: break-word;
    box-sizing: border-box;
    -webkit-font-smoothing: antialised;
  }
  html {
    font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica,
      Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji;
  }
  html,
  body {
    height: 100%;
    min-height: 100%;
  }
  body {
    background-color: var(--ph-color-background, #181A22);
    color: var(--ph-color-text,#9FA8AD);
    padding: 0;
    margin: 0;
    line-height: 1.5;
    font-family: Poppins, ui-sans-serif, system-ui, -apple-system,
      BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans,
      sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol,
      Noto Color Emoji;
  }
  main.ph {
    flex-grow: 1;
  }
  .ph.container {
    max-width: 48rem;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 2.5rem;
    margin-bottom: 2.5rem;
  }
  .ph.frontpage .ph.container {
    margin-bottom: 1.25rem;
    margin-top: 1.25rem;
    max-width: 1024px;
  }
  footer.ph.footer {
    font-size: 1.25rem;
    z-index: 100;
    flex-grow: 0;
    margin-top: auto;
  }
  .ph.app {
    display: flex;
    flex-direction: column;
    height: 100%;
    min-height: 100%;
    padding: 1.25rem;
  }
  a.ph{
    color: var(--ph-color-link, #6CA7F9);
    font-weight: 500;
  }
  a.ph:visited{
    color: var(--ph-color-link-visited, #6CA7F9);
  }
  a.ph:active {
    color: var(--ph-color-link-active, #6CA7F9);
  }
  a.ph:hover {
    color: var(--ph-color-link-hover,#6CA7F9);
  }
  p,
  p.ph,
  .ph.byline {
    font-style: normal;
    max-width: 65ch;
    font-size: 1rem;
    line-height: 1.75rem;
    color: var(--ph-color-text,#9FA8AD);
    margin-top: 1.25em;
    margin-bottom: 1.25em;
  }
  article.ph {
    color: var(--ph-color-text,#9FA8AD);
    font-size: 1rem;
    line-height: 1.75rem;
  }
  p.lead,
  p.ph.lead {
    color: var(--ph-color-text-accent,#E4E4E7);
    font-weight: 600;
    line-height: 1.75rem;
    margin-bottom: 2.5rem;
    font-size: 1.125rem;
  }
  .ph.frontpage p.ph.lead{
    padding-top: 2.5rem;
    padding-bottom: 2.5rem;
    margin: 0;
    font-weight: normal;
    color: inherit;
  }
  .ph.author p.ph, footer.ph p.ph{
    max-width: none;
  }
  h1.ph,
  h2.ph,
  h3.ph,
  h4.ph,
  h5.ph,
  h6.ph {
    color: var(--ph-color-text-accent,#E4E4E7);
  }
  h1.ph {
    margin-bottom: 2.5rem;
    font-size: 3.75rem;
    font-weight: 700;
    line-height: 1.375;
  }
  .ph.frontpage h1.ph {
    margin-bottom: 2.5rem;
    font-size: 3rem;
    line-height: 1.375;
  }
  @media screen and (min-width: 1024px) {
    .ph.frontpage h1.ph {
      font-size: 4.75rem;
    }
  }
  h2.ph {
    font-size: 1.75rem;
    line-height: 1.3333333;
    margin-bottom: 1rem;
    margin-top: 2rem;
  }
  h3.ph {
    font-size: 1.5rem;
    line-height: 1.3333333;
    margin-bottom: 1rem;
    margin-top: 1rem;
  }
  h4.ph {
    font-size: 1.25rem;
    line-height: 1.3333333;
    margin-bottom: 1rem;
    margin-top: 1rem;
  }
  header.ph.header {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-grow: 0;
    grid-gap: 1rem;
    min-height: 5.5rem;
  }
  .ph.header-menu {
    margin-left: auto;
    min-height: 3rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    grid-gap: 1rem;
  }
  .ph.header-menu a.ph {
    display: none;
  }
  @media screen and (min-width: 640px) {
    .ph.header-menu a.ph {
      display: inline-block;
    }
  }
  .ph.darkmode-button {
    align-items: center;
    background-color: transparent;
    border: none;
    border-radius: 50%;
    color: var(--ph-color-text);
    cursor: pointer;
    display: flex;
    height: 3rem;
    justify-content: center;
    width: 3rem;
  }
  .ph.darkmode-button:active,
  .ph.darkmode-button:hover {
    background-color: var(--ph-color-well-background);
  }
  .ph.darkmode-button > svg.ph {
    pointer: events none;
    height: 2rem;
    width: 2rem;
  }
  .ph.hide-dark {
    display: none;
  }
  .ph.hide-light {
    display: block;
  }
  .ph.theme--light .hide-light {
    display: none;
  }
  .ph.theme--light .hide-dark {
    display: block;
  }
</style>
<link
  rel="preload"
  href="/css/ph.css"
  as="style"
  onload="this.onload=null;this.rel='stylesheet'"
/>
<noscript><link rel="stylesheet" href="/css/ph.css" /></noscript>
<link
  rel="preload"
  href="/css/carbonbadge.css"
  as="style"
  onload="this.onload=null;this.rel='stylesheet'"
/>
<noscript><link rel="stylesheet" href="/css/carbonbadge.css" /></noscript>`;
};
