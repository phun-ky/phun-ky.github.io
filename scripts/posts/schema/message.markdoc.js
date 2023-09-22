import Markdoc from '@markdoc/markdoc';

const message = {
  children: ['inline'],
  attributes: {
    type: {
      type: String,
      default: 'note',
      matches: ['note', 'error', 'info', 'warning', 'success'],
    },
  },
  transform(node, config) {
    const attributes = node.transformAttributes(config);
    const children = node.transformChildren(config);

    return new Markdoc.Tag(
      'div',
      {
        class: attributes.class
          ? `${attributes.class} message ${node.attributes['type']}`
          : `message ${node.attributes['type']}`,
      },
      children
    );
  },
};

export default message;
