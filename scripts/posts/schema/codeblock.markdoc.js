import Markdoc from '@markdoc/markdoc';

const fence = {
  children: ['inline'],
  attributes: {
    language: { type: String }
  },
  transform(node, config) {
    const attributes = node.transformAttributes(config);
    const children = node.transformChildren(config);

    return new Markdoc.Tag(
      'pre',
      {
        ...attributes,
        class: `ph language-${node.attributes['language']}`
      },
      [
        new Markdoc.Tag(
          'code',
          {
            class: `ph ${node.attributes['language']} language-${node.attributes['language']}`
          },
          children
        )
      ]
    );
  }
};

export default fence;
