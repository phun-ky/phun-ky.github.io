const html = String.raw;

export const RedirectPage = (to) => {
  return html`<!DOCTYPE html>
    <html lang="en-GB">
      <head>
        <meta charset="utf-8" />
        <title>Moved to ${to}</title>
        <meta name="robots" content="noindex" />
        <meta http-equiv="refresh" content="0; url=${to}" />
        <link rel="canonical" href="${to}" />
      </head>
      <body>
        <p>This page has moved to <a href="${to}">${to}</a>.</p>
      </body>
    </html> `;
};
