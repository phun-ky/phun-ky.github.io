import Markdoc from '@markdoc/markdoc';
import { addClassToNode } from '../utils/add-class-to-node.js';
import { slugify } from '../../../src/utils/slugify.js';

const generateID = (children, attributes) => {
  if (attributes.id && typeof attributes.id === 'string') {
    return attributes.id;
  }

  if (!children) {
    throw new Error('Children not defined');
  }

  // eslint-disable-next-line
  return slugify(children
    .filter((child) => typeof child === 'string')
    .join(' '));
};
const heading = {
  attributes: {
    level: { type: String }
  },
  transform(node, config) {
    node = addClassToNode(node);

    const attributes = node.transformAttributes(config);
    const children = node.transformChildren(config);
    const level = node.attributes.level;

    return new Markdoc.Tag(
      `h${level}`,
      {
        id: generateID(children, attributes),
        class: attributes.class
      },
      children
    );
  }
};

export default heading;
