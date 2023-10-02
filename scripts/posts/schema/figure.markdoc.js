import Markdoc from '@markdoc/markdoc';

/*
 @todo implement this
<div class="ph explicit" onclick="this.classList.toggle('explicit');" tabindex="0">
    <img loading="lazy" alt="Male part of the product" src="/img/blog/7e6ef660c3acce71ac42d78ba5982909.JPG" class="ph"/>
    <img loading="lazy" alt="Female part of the product" src="/img/blog/808a734deb25c611374f9346a68bd01e.JPG" class="ph"/>
  </div>

 */

const linkAttributes = {};
const fixURIAttribute = uri => uri.replace('<','').replace('>','');
const figure = {
  children: ['inline'],
  attributes: {
    role: {
      type: String,
      default: 'presentation',
      matches: ['presentation']
    },
    rating: {
      type: String,
      default: 'ok',
      matches: ['ok', 'explicit']
    },
    src: {
      type: String, required: true
    },
    url: {
      type: String
    },
    description: {
      type: String, required: true
    },
    type: {
      type: String,
      default: 'img',
      matches: ['img', 'video','ascii-flow']
    }
  },
  transform(node, config) {
    const attributes = node.transformAttributes(config);
    const children = node.transformChildren(config);

    if(!attributes['url'] && attributes['src']){
      attributes['url'] = attributes['src'];
    }

    if(attributes.url && attributes['url'].indexOf('/') !== 0){
      linkAttributes.target = '_blank';
      linkAttributes.rel = 'noopener noreferrer';
    }

    let componentChildren = [...children];


    if(attributes['type'] === 'ascii-flow'){
      componentChildren = [
        [
          new Markdoc.Tag(
            'div',
            {
              class: 'ph ascii-flow'
            },
            [
              ...children
            ]
          )
        ],
        new Markdoc.Tag(
          'figcaption',
          {
            class: 'ph'
          },[
            attributes['description']
          ])];
    } else {
      componentChildren = [
        [
          new Markdoc.Tag(
            'a',
            {
              class: 'ph',
              href: fixURIAttribute(attributes['url']),
              ...linkAttributes
            },
            [
              new Markdoc.Tag(
                'img',
                {
                  class: 'ph',
                  loading: 'lazy',
                  alt: attributes['description'],
                  src: fixURIAttribute(attributes['src'])
                }
              )
            ]
          )
        ],
        new Markdoc.Tag(
          'figcaption',
          {
            class: 'ph'
          },[
            ' "',
            new Markdoc.Tag(
              'a',
              {
                class: 'ph',
                href: fixURIAttribute(attributes['url']),
                ...linkAttributes
              },[attributes['description']]
            ),
            '" ',
            ...children
          ])];
    }

    return new Markdoc.Tag(
      'figure',
      {
        class: attributes.class,
        role: attributes['role']
      },
      [...componentChildren]
    );
  }
};

export default figure;
