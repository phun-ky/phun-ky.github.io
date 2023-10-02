---
layout: post

route: /2008/09/29/eric-meyers-css-reset-code-a-must-have-for-elements-on-the-loose
title: 'Eric Meyers CSS Reset code - a must-have for elements on the loose'
category: 'Archive'
tags: []
---

Came over this nifty CSS code to reset all html elements to "default" style. It
might help you (or it might not) when you want to start from scratch, i.e. in a
CSS file for print.

To quote Eric Meyer, the contributor
<a class="ph" target="_blank" rel="noopener noreferrer" href="http://meyerweb.com/eric/tools/css/reset/">of
the code</a>:

> The reset styles given here are intentionally very generic. There isn't any
> default color or background set for the body element, for example. I don't
> particularly recommend that you just use this in its unaltered state in your
> own projects. It should be tweaked, edited, extended, and otherwise tuned to
> match your specific reset baseline. Fill in your preferred colors for the
> page, links, and so on.
>
> In other words, this is a starting point, not a self-contained black box of
> no-touchiness.

```css
html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
font,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td {
  margin: 0;
  padding: 0;
  border: 0;
  outline: 0;
  font-size: 100%;
  vertical-align: baseline;
  background: transparent;
}
body {
  line-height: 1;
}
ol,
ul {
  list-style: none;
}
blockquote,
q {
  quotes: none;
}
blockquote:before,
blockquote:after,
q:before,
q:after {
  content: '';
  content: none;
}

/* remember to define focus styles! */
:focus {
  outline: 0;
}

/* remember to highlight inserts somehow! */
ins {
  text-decoration: none;
}
del {
  text-decoration: line-through;
}

/* tables still need 'cellspacing="0"' in the markup */
table {
  border-collapse: collapse;
  border-spacing: 0;
}
```
