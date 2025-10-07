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
        color-scheme: dark;
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
        max-width: 1152px;
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
        color: var(--ph-color-text-accent);
        font-weight: 500;
        text-decoration: none;
      }
      a.ph:visited {
        color: var(--ph-color-text-accent);
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
        padding-top: 144px;
        margin-top: -64px;
        display: flex;
        flex-direction: column;
        color: var(--ph-color-text-accent);
        margin-bottom: 0;

        & .ph.name {
          color: var(--ph-color-link);
          font-size: 56px;
          line-height: 64px;
        }
        & .ph.text {
          font-size: 56px;
          line-height: 64px;
        }
      }
      .ph.frontpage p.ph.tagline {
        color: var(--ph-color-text);
        font-size: 24px;
        line-height: 36px;
        padding-top: 12px;
        margin: 0;
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
        height: 64px;
        transition: all 0.5s;
        background-color: transparent;
        border-bottom: 1pt solid transparent;
        z-index: 1000;

        &.is-scrolled {
          background-color: var(--ph-color-background, #181a22);
          border-bottom-color: var(--ph-color-background-invert);
        }

        & > .ph.container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-grow: 0;
          margin-top: 0;
          margin-bottom: 0;
          max-width: calc(1440px - 64px);
        }

        & a {
          color: var(--ph-color-text-accent);
          text-decoration: none;
          height: 100%;
          align-items: center;
          display: flex;
          font-size: 14px;
          font-weight: 500;
          line-height: 64px;
          padding: 0 12px;
          transition: color 0.25s;
          &:hover {
            color: var(--ph-color-link-hover);
            text-decoration: none;
          }
        }
      }
      @media screen and (min-width: 1440px) {
        header.ph.header {
          position: fixed;
          top: 0px;
          left: 0px;
          width: 100%;
          z-index: 1000;
        }
      }
      .ph.header-menu {
        margin-left: auto;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-end;
      }
      .ph.header-menu a.ph {
        display: none;
      }

      header.ph.header .ph.social-links {
        margin-right: -0.5rem;
        display: flex;
        align-items: center;
        justify-content: center;

        &::before {
          background-color: #2e2e32;
          content: '';
          height: 24px;
          margin-left: 1rem;
          margin-right: 0.5rem;
          width: 1px;
        }

        & a {
          text-decoration: none;
          align-items: center;
          color: var(--ph-color-text);
          display: flex;
          height: 36px;
          justify-content: center;
          transition: color 0.5s;
          width: 36px;

          &:hover {
            background-color: var(--ph-color-well-background);
            border-radius: 50%;
          }

          & .social-github,
          & .social-npm {
            height: 20px;
            width: 20px;
            flex-grow: 0;
            flex-shrink: 0;
            fill: currentColor;
            background-color: currentColor;
            mask: var(--icon) no-repeat;
            mask-size: 100% 100%;
          }

          & .social-github {
            --icon: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='black' d='M12 .297c-6.63 0-12 5.373-12 12c0 5.303 3.438 9.8 8.205 11.385c.6.113.82-.258.82-.577c0-.285-.01-1.04-.015-2.04c-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729c1.205.084 1.838 1.236 1.838 1.236c1.07 1.835 2.809 1.305 3.495.998c.108-.776.417-1.305.76-1.605c-2.665-.3-5.466-1.332-5.466-5.93c0-1.31.465-2.38 1.235-3.22c-.135-.303-.54-1.523.105-3.176c0 0 1.005-.322 3.3 1.23c.96-.267 1.98-.399 3-.405c1.02.006 2.04.138 3 .405c2.28-1.552 3.285-1.23 3.285-1.23c.645 1.653.24 2.873.12 3.176c.765.84 1.23 1.91 1.23 3.22c0 4.61-2.805 5.625-5.475 5.92c.42.36.81 1.096.81 2.22c0 1.606-.015 2.896-.015 3.286c0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12'/%3E%3C/svg%3E");
          }

          & .social-npm {
            --icon: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='black' d='M1.763 0C.786 0 0 .786 0 1.763v20.474C0 23.214.786 24 1.763 24h20.474c.977 0 1.763-.786 1.763-1.763V1.763C24 .786 23.214 0 22.237 0zM5.13 5.323l13.837.019l-.009 13.836h-3.464l.01-10.382h-3.456L12.04 19.17H5.113z'/%3E%3C/svg%3E");
          }
        }
      }

      @media screen and (min-width: 640px) {
        .ph.header-menu a.ph {
          display: inline-block;
        }
      }
      header.ph.header .ph.appearance {
        display: flex;
        justify-content: center;
        align-items: center;
        &::before {
          background-color: #2e2e32;
          content: '';
          height: 24px;
          margin-left: 1rem;
          margin-right: 0.5rem;
          width: 1px;
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
        height: 36px;
        justify-content: center;
        width: 36px;
      }
      .ph.darkmode-button:active,
      .ph.darkmode-button:hover {
        background-color: var(--ph-color-well-background);
      }
      .ph.darkmode-button > svg.ph {
        pointer-events: none;
        height: 20px;
        width: 20px;
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
