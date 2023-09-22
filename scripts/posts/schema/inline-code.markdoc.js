import Markdoc from '@markdoc/markdoc';

const code = {
  attributes: {
    content: { type: String },
  },
  transform(node, config) {
    const attributes = node.transformAttributes(config);

    return new Markdoc.Tag(
      'code',
      {
        ...attributes,
        class: 'ph language-',
      },
      [attributes.content]
    );
  },
};

export default code;
