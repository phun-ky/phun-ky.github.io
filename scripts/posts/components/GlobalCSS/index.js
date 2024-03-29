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
        font-family: var(
          --ph-font-family,
          system-ui,
          -apple-system,
          Segoe UI,
          Roboto,
          Helvetica,
          Arial,
          sans-serif,
          Apple Color Emoji,
          Segoe UI Emoji
        );
      }
      html,
      body {
        height: 100%;
        min-height: 100%;
      }
      body {
        background-color: var(--ph-color-background, #181a22);
        color: var(--ph-color-text, #9fa8ad);
        padding: 0;
        margin: 0;
        line-height: 1.5;
        font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
          Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif;
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

      .ph.project .ph.banner .ph.container {
        max-width: 48rem;
        width: 100%;
        margin-top: 2.5rem;
        margin-bottom: 2.5rem;
        padding-top: 6rem;
        padding-bottom: 6rem;
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
        min-height: 100%;
        position: relative;
        padding: 1.25rem;
      }
      a.ph {
        color: var(--ph-color-link, #6ca7f9);
        font-weight: 500;
      }
      a.ph:visited {
        color: var(--ph-color-link-visited, #6ca7f9);
      }
      a.ph:active {
        color: var(--ph-color-link-active, #6ca7f9);
      }
      a.ph:hover {
        color: var(--ph-color-link-hover, #6ca7f9);
      }
      p,
      p.ph,
      .ph.byline {
        font-style: normal;
        max-width: 65ch;
        font-size: 1rem;
        line-height: 1.75rem;
        color: var(--ph-color-text, #9fa8ad);
        margin-top: 1.25em;
        margin-bottom: 1.25em;
      }
      .ph.byline time,
      .ph.byline .ph.read-time {
        opacity: 0.7;
      }
      article.ph {
        color: var(--ph-color-text, #9fa8ad);
        font-size: 1rem;
        line-height: 1.75rem;
      }
      p.lead,
      p.ph.lead {
        color: var(--ph-color-text-accent, #e4e4e7);
        font-weight: 600;
        line-height: 1.75rem;
        margin-bottom: 2.5rem;
        font-size: 1.125rem;
      }
      .ph.frontpage p.ph.lead {
        padding-top: 2.5rem;
        padding-bottom: 2.5rem;
        margin: 0;
        font-weight: normal;
        color: inherit;
      }
      .ph.author p.ph,
      footer.ph p.ph {
        max-width: none;
      }
      h1.ph,
      h2.ph,
      h3.ph,
      h4.ph,
      h5.ph,
      h6.ph {
        color: var(--ph-color-text-accent, #e4e4e7);
      }
      h1.ph {
        margin-bottom: 2.5rem;
        font-size: 2.25rem;
        line-height: 1.25;
        font-weight: 700;
      }
      @media screen and (min-width: 768px) {
        h1.ph {
          font-size: 3rem;
          line-height: 1.375;
        }
      }
      @media screen and (min-width: 1024px) {
        h1.ph {
          font-size: 3.75rem;
          line-height: 1.375;
        }
      }
      h1.ph > em.ph {
        font-weight: normal;
        max-width: 65ch;
        font-size: 1rem;
        line-height: 1.75rem;
        display: block;
        color: var(--ph-color-text);
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
        font-weight: 400;
      }
      h4.ph {
        font-size: 1.25rem;
        line-height: 1.3333333;
        margin-bottom: 1rem;
        margin-top: 1rem;
        font-weight: 500;
        text-transform: uppercase;
        color: var(--ph-color-text);
      }
      header.ph.header {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-grow: 0;
        grid-gap: 1rem;
        min-height: 3rem;
      }
      @media screen and (min-width: 1440px) {
        header.ph.header {
          position: sticky;
          top: 20px;
          z-index: 100;
        }

        .ph.project header.ph.header {
          position: static;
          top: unset;
        }
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
        pointer-events: none;
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
      p.ph:has(> img[src^='/img']) {
        max-width: none;
      }
    </style>
    <link
      rel="preload"
      href="/css/ph.css"
      as="style"
      onload="this.onload=null;this.rel='stylesheet'"
    />
    <noscript><link rel="stylesheet" href="/css/ph.css" /></noscript>
    <link rel="stylesheet" media="print" href="/css/print.css" />
    <link
      rel="preload"
      href="/css/carbonbadge.css"
      as="style"
      onload="this.onload=null;this.rel='stylesheet'"
    />
    <noscript><link rel="stylesheet" href="/css/carbonbadge.css" /></noscript>`;
};
