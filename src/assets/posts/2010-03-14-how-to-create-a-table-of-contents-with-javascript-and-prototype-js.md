---
layout: post
route: /2010/03/14/how-to-create-a-table-of-contents-with-javascript-and-prototypejs
title: 'How to create a table of contents with javascript and prototype.js'
description: 'Well, if you write long posts every now and then and you want your users to access the information in an easy way instead of splitting up the post in several pages, this is a very nice solution to this issue'
category: 'How-to'
tags: ['javascript', 'toc','table of contents']
---

{% message type="note" title="Note" %}

You might want to add some styling to the levels in the table of contents, so that the user can differentiate between levels.

{% /message %}

## Step one: Add html element to the page

```html
<div id="toc" style="display:none;">
  <strong>
    Table of Contents
  </strong>
</div>
```

## Step two: Add the javascript

```javascript
const createTableOfContents = (postContainerSelector, levels = 4) => {
  const tableOfContentsElement = document.getElementById('toc');

  if (!tableOfContentsElement) {
    return; // Exit early if the element doesn't exist
  }

  const headingLevels = Array.from({ length: levels }, (_, i) => i + 1);
  const selector = headingLevels.map(h => `${postContainerSelector} h${h}`).join(',');
  const headingElements = document.querySelectorAll(selector);

  if (headingElements.length === 0) {
    return; // Exit if no heading elements found
  }

  const createUniqueId = (element, index) => {
    let elementID = element.getAttribute('id');

    if (!elementID) {
      elementID = String(element.textContent)
        .normalize('NFKD')
        .replace(/[\u0300-\u036f]/g, '')
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '_')
        .replace(/-+/g, '_');

      element.setAttribute('id', `${elementID}_${index + 1}`);
    }

    return elementID;
  };

  const listElement = document.createElement('ol');

  headingElements.forEach((element, index) => {
    const elementID = createUniqueId(element, index);

    const tableOfContentsItemElement = document.createElement('li');
    const tableOfContentsActionElement = document.createElement('a');

    tableOfContentsActionElement.setAttribute('href', `#${elementID}`);
    tableOfContentsActionElement.textContent = element.textContent;

    tableOfContentsItemElement.appendChild(tableOfContentsActionElement);
    listElement.appendChild(tableOfContentsItemElement);
  });
  
  tableOfContentsElement.appendChild(listElement);

  tableOfContentsElement.style.display = 'block';
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {createTableOfContents('article')});
} else {
  createTableOfContents('article');
}

```

That's practically it! Enjoy.
