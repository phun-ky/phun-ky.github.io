---
layout: post

route: /2010/03/14/how-to-highlight-search-parameters-from-search-engines-with-javascript-and-prototypejs
title:
  'How to highlight search parameters from Search engines with javascript and
  prototype.js'
description: 'I needed some code to help visitors on one of our sites at Aller Internett, to be able to spot the content where the search parameters where mentioned. After some searching and tutorial scavenging, I came up with this script'
category: 'How-to'
tags: [seo, search-engines, search-parameters, javascript, prototype.js]
---

I needed some code to help visitors on one of our sites at Aller Internett, to
be able to spot the content where the search parameters where mentioned. After
some searching and tutorial scavenging, I came up with this script. Add it to
the bottom of you page for best practice.

## Step one: Define searchterms var

First, we define the searchterm var:

```javascript
var searchTerms=null;
```

## Step two: parseReferrer function

Now we want to create a function that parses the search engines query string:

```javascript
function parseReferrer(term) {

  var ref = document.referrer.split('?');
  var parms = ref[1].split('&');

  for (var i=0; i &lt; parms.length; i++) {
    var pos = parms[i].indexOf('=');

    if (pos > 0) {
      if(term == parms[i].substring(0,pos)){
        searchTerms  = parms[i].substring(pos+1);
      }
    }
  }
}
```

## Step three: locateSearchTerms function

We need a function that kickstarts the higlight function. We add a loop if the
searchterms var contains more than one parameter:

```javascript
function locateSearchTerms(){

  terms = searchTerms;

  if (terms.indexOf('+') > -1){
      var parms = terms.split('+');

      for (var i=0; i &lt; parms.length; i++) {
        highlightSearchTerms(parms[i]);
      }
  } else {
    highlightSearchTerms( terms );
  }
}
```

## Step four: highlightSearchTerms function

And now, the function that does the magic. Basically, it locates every string
that matches and wraps it with a span tag. It could be simplified, but it works

{% message type="important" title="Important" %}

Remember to make a css class named highlight with the wanted css for the higlights

{% /message %}



```javascript
function highlightSearchTerms(sword) {

  $$('body').map(Element.extend).first().descendants().each(function (el) {
    if (el.nodeType == Node.ELEMENT_NODE && el.tagName != 'TEXTAREA' && el.tagName != 'INPUT' && el.tagName != 'SCRIPT') {
      $A(el.childNodes).each(function (onlyChild) {
        var pos = onlyChild.textContent.indexOf(sword);

        if (onlyChild.nodeType == Node.TEXT_NODE && pos >= 0) {
          var spannode = document.createElement('span');
          spannode.className = 'searchHighlight';
          var middlebit = onlyChild.splitText(pos);
          var endbit = middlebit.splitText(sword.length);
          var middleclone = middlebit.cloneNode(true);
          spannode.appendChild(middleclone);
          middlebit.parentNode.replaceChild(spannode, middlebit);
          onlyChild. = el.innerHTML.replace(new RegExp('('+sword+')', 'gi'), '&lt;span class="highlight">$1&lt;/span>');
        }
      });
    }
  });
}
```

## Step five: Trigger the feature

Now that every function that's needed is in place, we need to trigger it when we
want to. Basically, it checks if the referrer is a search engine, and sends the
correct query var to the parseReferrer function. You can add more search engines
yourself, just remember to add the correct var!

```javascript
document.observe('dom:loaded', function() {

  if(document.referrer != ''){
    if (document.referrer.indexOf('google.com') > -1){
      searchQueryVar = 'q';
      parseReferrer(searchQueryVar);
      locateSearchTerms();
      } else if (document.referrer.indexOf('yahoo.com') > -1){
        searchQueryVar = 'p';
        parseReferrer(searchQueryVar);
        locateSearchTerms();
      }
  }
});
```
