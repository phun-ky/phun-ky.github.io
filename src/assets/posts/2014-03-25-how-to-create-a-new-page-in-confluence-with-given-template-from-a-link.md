---
route: /2014/03/25/how-to-create-a-new-page-in-atlassian-confluence-with-given-template-from-a-link
title:
  'How to create a new page in Atlassian Confluence with given template from a
  link'
description:
  'I was trying to solve an issue, amidst the documentation haze for my latest
  applications, to create a new page with a given template from a link, to spare
  me the hazzle of doing it "manually".'
category: 'How-to'
image: https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Atlassian-logo.svg/500px-Atlassian-logo.svg.png
tags: [how-to, template, confluence]
---

{% figure
  description="The Atlassian Logo"
  src="<https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Atlassian-logo.svg/500px-Atlassian-logo.svg.png>"
%}

{% /figure %}

## Investigation

I did my homework and tried to find other similar issues, when
[I found this issue at Atlassian Answers](https://answers.atlassian.com/questions/80549/is-it-possible-to-link-to-a-not-already-created-undefined-page-in-confluence-from-an-external-site).
The answers there did not help, but one of the commenters pointed out you can
manipulate the query string to resolve the issue. The problem was that the
commenter did not use the correct URL.

## The solution

I inspected the URL that created a new page when you select a template, and
found this solution:

```
http://domain.com/pages/createpage-entervariables.action?spaceKey=<spacekey>&fromPageId=<parent page id>&templateId=<template id>
```

This should also work:

```
http://domain.com/?spaceKey=<spacekey>&templateId=<template id>&newSpaceKey=<spacekey>
```

## Sugar

If you want to automatically locate all undefined links and inject the correct
URL for creating a new page with a specified template, you can do something like
this:

```javascript
/**
 * Feature to add a template to creation of pages from undefined links in Confluence
 *
 * @author    Alexander Vassbotn Røyne-Helgesen <alexander@phun-ky.net>
 * @link      https://phun-ky.net
 * @license   http://creativecommons.org/licenses/by-sa/4.0/
 *
 * This code is licensed with a
 * Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0) license.
 * You are free to alter, redistribute and use it commercially, as long as you keep the same license,
 * and give attribution to the creator, Alexander Vassbotn Røyne-Helgesen.
 */

/**
 * Holder for URL
 *
 * @type  String
 * @private
 */
var _undefined_link_to_add_template_to,
  /**
   * jQuery cached element holder
   *
   * @type  Object
   * @private
   */
  _undefined_link_element,
  /**
   * Holder for template to append
   *
   * @type  Integer
   * @private
   */
  _template_id_to_append = 55967807;

/**
 * Iterate over all the create page links within #main-content.
 *
 * We asume that all the create page links within #main-content is to be altered
 *
 * @param   Object    $( '#main-content a[href^="/confluence/pages/createpage.action"]' )
 * @key     i         Integer
 * @value   element   Object
 */
$('#main-content a[href^="/confluence/pages/createpage.action"]').each(
  function (i, element) {
    // Cache the element
    _undefined_link_element = $(element);

    // Create the new URL from the old URL
    _undefined_link_to_add_template_to = _undefined_link_element
      .attr('href')
      .replace('createpage.action', 'createpage-entervariables.action');

    // Append the new URL to the href attribute
    _undefined_link_element.attr(
      'href',
      _undefined_link_to_add_template_to +
        '&templateId=' +
        _template_id_to_append
    );
  }
);
```

Add this code snippet in a HTML code block addon on the page where you want to
alter the links.

Happy documenting!
