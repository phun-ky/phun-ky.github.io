---
route: /2023/10/06/accessible-syntax-highlight-theme
title: 'Accessible syntax highlight theme'
description: 'I really like syntax highlighting, and it helps greatly during development,
but also when I read code. I have grown very fond of Solarized Dark and
One Dark (not light!), but I wanted to be more accessible, so I created
my own themes that adheres with the WCAG requirements.'
category: 'Projects'
tags: [css, syntax highlighting, prismjs, accessible, accessibility, a11y]
---

## The colors

[WCAG AA compliant](https://www.w3.org/TR/WCAG/#visual-audio-contrast-contrast)
for color contrast. WCAG AAA compliance forces the values on a light background
to be too similar to each other to be used effectively for syntax highlighting.

### Dark theme

All colors have a contrast ratio of `>=5` against the background color
<span class="ph color-badge"><span class="ph color-drop" style="background-color: #262831;"></span>#262831,
Sky Captain</span>.

<div class="ph swatch">
  <div class="ph color" style="background-color: #859BA3; color:#050505;" data-rel="#859BA3" data-color-name="Arona">#859BA3</div>
  <div class="ph color" style="background-color: #C79500; color:#0D0D0D;" data-rel="#C79500" data-color-name="Vivid Amber">#C79500</div>
  <div class="ph color" style="background-color: #2CAAA0; color:#050505;" data-rel="#2CAAA0" data-color-name="Sea Kale">#2CAAA0</div>
  <div class="ph color" style="background-color: #469EDD; color:#030303;" data-rel="#469EDD" data-color-name="Flax Flower Blue">#469EDD</div>
  <div class="ph color" style="background-color: #8C9B9B; color:#050505;" data-rel="#8C9B9B" data-color-name="Boredom">#8C9B9B</div>
  <div class="ph color" style="background-color: #E4E4E7; color:#474747;" data-rel="#E4E4E7" data-color-name="Lilac Mist">#E4E4E7</div>
  <div class="ph color" style="background-color: #262831; color:#B3B3B3;" data-rel="#262831" data-color-name="Sky Captain">#262831</div>
  <div class="ph color" style="background-color: #FF6666; color:#000000;" data-rel="#FF6666" data-color-name="Pompelmo">#FF6666</div>
</div>

### Light theme

All colors have a contrast ratio of `>=5` against the background color
<span class="ph color-badge"><span class="ph color-drop" style="background-color: #F5F6F7;"></span>#F5F6F7,
Gram’s Hair</span>.

<div class="ph swatch">
  <div class="ph color" style="background-color: #566D71; color:#FFFFFF;" data-rel="#566D71" data-color-name="Distance">#566D71</div>
  <div class="ph color" style="background-color: #806200; color:#FFFFFF;" data-rel="#806200" data-color-name="Ground Earth">#806200</div>
  <div class="ph color" style="background-color: #1E766D; color:#FFFFFF;" data-rel="#1E766D" data-color-name="Advantageous">#1E766D</div>
  <div class="ph color" style="background-color: #1D699F; color:#FFFFFF;" data-rel="#1D699F" data-color-name="Jazz Blue">#1D699F</div>
  <div class="ph color" style="background-color: #5C6A6A; color:#FFFFFF;" data-rel="#5C6A6A" data-color-name="Mountain Pass">#5C6A6A</div>
  <div class="ph color" style="background-color: #000000; color:#FFFFFF;" data-rel="#000000" data-color-name="Black">#000000</div>
  <div class="ph color" style="background-color: #F5F6F7; color:#000000;" data-rel="#F5F6F7" data-color-name="Gram’s Hair">#F5F6F7</div>
  <div class="ph color" style="background-color: #CD0404; color:#000000;" data-rel="#CD0404" data-color-name="Rebellion Red">#CD0404</div>
</div>

## Contrast ratio

| Color            | Hex       | Ratio   | Normal Text | Large Text |
| ---------------- | --------- | ------- | ----------- | ---------- |
| Arona            | `#859BA3` | 5.04:1  | AA          | AAA        |
| Vivid Amber      | `#C79500` | 5.4:1   | AA          | AAA        |
| Sea Kale         | `#2CAAA0` | 5.14:1  | AA          | AAA        |
| Flax Flower Blue | `#469EDD` | 5.03:1  | AA          | AAA        |
| Boredom          | `#8C9B9B` | 5.08:1  | AA          | AAA        |
| Lilac Mist       | `#E4E4E7` | 11.57:1 | AAA         | AAA        |
| Pompelmo         | `#FF6666` | 5.13:1  | AA          | AAA        |
| Distance         | `#566D71` | 5.07:1  | AA          | AAA        |
| Ground Earth     | `#806200` | 5.29:1  | AA          | AAA        |
| Advantageous     | `#1E766D` | 5.01:1  | AA          | AAA        |
| Jazz Blue        | `#1D699F` | 5.43:1  | AA          | AAA        |
| Mountain Pass    | `#5C6A6A` | 5.21:1  | AA          | AAA        |
| Black            | `#000000` | 19.4:1  | AAA         | AAA        |
| Rebellion Red    | `#CD0404` | 5.36:1  | AA          | AAA        |

## CSS Variables

```css
:root {
  --color-1: #859BA3;
  --color-2: #C79500;
  --color-3: #2CAAA0;
  --color-4: #469EDD;
  --color-5: #8C9B9B;
  --color-6: #E4E4E7;
  --color-7: #262831;
  --color-8: #FF0000;
}

:root.theme--light {
  --color-1: #566D71;
  --color-2: #806200;
  --color-3: #1E766D;
  --color-4: #1D699F;
  --color-5: #5C6A6A;
  --color-6: #000000;
  --color-7: #F5F6F7;
  --color-8: #FF0000;
}
```

## PrismJS example with dark colors

```css
code[class*='language-'] .namespace,
pre[class*='language-'] .namespace {
  opacity: 0.7;
}

code[class*='language-'] .token.comment,
code[class*='language-'] .token.prolog,
code[class*='language-'] .token.doctype,
code[class*='language-'] .token.cdata,
pre[class*='language-'] .token.comment,
pre[class*='language-'] .token.prolog,
pre[class*='language-'] .token.doctype,
pre[class*='language-'] .token.cdata {
  color: #859BA3;
}

code[class*='language-'] .token.null,
code[class*='language-'] .token.operator,
code[class*='language-'] .token.boolean,
code[class*='language-'] .token.number,
pre[class*='language-'] .token.null,
pre[class*='language-'] .token.operator,
pre[class*='language-'] .token.boolean,
pre[class*='language-'] .token.number {
  color: #C79500;
}

code[class*='language-'] .token.attr-name,
code[class*='language-'] .token.string,
pre[class*='language-'] .token.attr-name,
pre[class*='language-'] .token.string {
  color: #2CAAA0;
}

code[class*='language-'] .token.entity,
code[class*='language-'] .token.url,
.language-css code[class*='language-'] .token.string,
.style code[class*='language-'] .token.string,
pre[class*='language-'] .token.entity,
pre[class*='language-'] .token.url,
.language-css pre[class*='language-'] .token.string,
.style pre[class*='language-'] .token.string {
  color: #2CAAA0;
}

code[class*='language-'] .token.selector,
pre[class*='language-'] .token.selector {
  color: #E4E4E7;
}

code[class*='language-'] .token.atrule,
code[class*='language-'] .token.attr-value,
code[class*='language-'] .token.keyword,
code[class*='language-'] .token.control,
code[class*='language-'] .token.directive,
code[class*='language-'] .token.important,
code[class*='language-'] .token.unit,
pre[class*='language-'] .token.atrule,
pre[class*='language-'] .token.attr-value,
pre[class*='language-'] .token.keyword,
pre[class*='language-'] .token.control,
pre[class*='language-'] .token.directive,
pre[class*='language-'] .token.important,
pre[class*='language-'] .token.unit {
  color: #469EDD;
}

code[class*='language-'] .token.regex,
code[class*='language-'] .token.statement,
pre[class*='language-'] .token.regex,
pre[class*='language-'] .token.statement {
  color: #2CAAA0;
}

code[class*='language-'] .token.placeholder,
code[class*='language-'] .token.variable,
pre[class*='language-'] .token.placeholder,
pre[class*='language-'] .token.variable {
  color: #469EDD;
}

code[class*='language-'] .token.property,
code[class*='language-'] .token.tag,
pre[class*='language-'] .token.property,
pre[class*='language-'] .token.tag {
  font-style: italic;
}

code[class*='language-'] .token.important,
code[class*='language-'] .token.statement,
pre[class*='language-'] .token.important,
pre[class*='language-'] .token.statement {
  font-weight: bold;
}

code[class*='language-'] .token.punctuation,
pre[class*='language-'] .token.punctuation {
  color: #8C9B9B;
}

code[class*='language-'] .token.entity,
pre[class*='language-'] .token.entity {
  cursor: help;
}

code[class*='language-'] .token.debug,
pre[class*='language-'] .token.debug {
  color: #FF6666;
}

pre,
pre.ph {
  background-color: #262831;
  color: #E4E4E7;
}
```
