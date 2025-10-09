/* eslint-disable import/no-named-as-default-member */
import Markdoc from '@markdoc/markdoc';

import fence from '../schema/codeblock.markdoc.js';
import figure from '../schema/figure.markdoc.js';
import heading from '../schema/heading.markdoc.js';
import code from '../schema/inline-code.markdoc.js';
import link from '../schema/link.markdoc.js';
import message from '../schema/message.markdoc.js';
import stance from '../schema/stance.markdoc.js';

export const getMarkdocConfig = (document) => {
  const { frontmatter } = document;
  const config = {
    tags: {
      figure,
      stance,
      message,
      'html-tag': {
        attributes: {
          name: { type: String, required: true },
          attrs: { type: Object }
        },
        transform(node, config) {
          const { name, attrs } = node.attributes;
          const children = node.transformChildren(config);

          return new Markdoc.Tag(name, attrs, children);
        }
      }
    },
    nodes: {
      heading,
      link,
      fence,
      code
    },
    variables: frontmatter
  };

  return config;
};
