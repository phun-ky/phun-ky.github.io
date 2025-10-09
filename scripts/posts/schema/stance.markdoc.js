/* eslint-disable import/no-named-as-default-member */
import Markdoc from '@markdoc/markdoc';

const stance = {
  children: ['inline'],
  attributes: {
    role: {
      type: String,
      default: 'presentation',
      matches: ['presentation']
    },
    description: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'dont',
      matches: ['dont', 'do', 'caution']
    }
  },
  transform(node, config) {
    const attributes = node.transformAttributes(config);
    const children = node.transformChildren(config);

    let componentChildren = [...children];

    componentChildren = [
      [...children],
      new Markdoc.Tag(
        'figcaption',
        {
          class: 'ph'
        },
        [attributes['description']]
      )
    ];

    return new Markdoc.Tag(
      'figure',
      {
        class: `stance ${attributes.class} ${attributes['type']}`,
        role: attributes['role']
      },
      [...componentChildren]
    );
  }
};

export default stance;
