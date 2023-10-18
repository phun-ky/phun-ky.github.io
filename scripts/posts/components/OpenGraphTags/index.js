const html = String.raw;

export const OpenGraphTags = (props = {}) => {
  const {
    type = 'website',
    url = 'https://phun-ky.net',
    title = 'lover of life, technologist at heart',
    siteName = 'lover of life, technologist at heart',
    description = 'The world from my point of view, and some pedantic creativity',
    image = 'https://secure.gravatar.com/avatar/e4885fa3c6db55194cb2eb9e81dac456?s=220',
    image2 = null,
    domain = 'phun-ky.net'
  } = props;

  return html`<meta property="og:url" content="${url}" />
    <meta property="og:type" content="${type}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:site_name" content="${siteName}" />
    <meta property="og:locale:locale" content="en_GB" />
    <meta property="og:image" content="${image}" />
    ${image2 ? `<meta property="og:image" content="${image2}" />` : ''}

    <meta name="twitter:card" content="summary_large_image" />
    <meta property="twitter:domain" content="${domain}" />
    <meta property="twitter:url" content="${url}" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${image}" />`;
};
