import Markdoc from '@markdoc/markdoc';
import { addClassToNode } from '../lib/add-class-to-node';

const generateID = (children, attributes) => {
  if (attributes.id && typeof attributes.id === 'string') {
    return attributes.id;
  }

  if (!children) {
    throw new Error('Children not defined');
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return children
    .filter((child) => typeof child === 'string')
    .join(' ')
    .replace(/[?]/g, '')
    .replace(/\s+/g, '-')
    .toLowerCase();
};
const heading = {
  attributes: {
    level: { type: String },
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
        class: attributes.class,
      },
      children
    );
  },
};

export default heading;
