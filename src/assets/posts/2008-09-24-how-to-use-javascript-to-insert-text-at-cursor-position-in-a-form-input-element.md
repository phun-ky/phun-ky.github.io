---
layout: post

route: /2008/09/24/how-to-use-javascript-to-insert-text-at-cursor-position-in-a-form-input-element
title:
  'how to use javascript to insert text at cursor position in a form input
  element'
description: ''
category: 'Archive'
tags: []
---

Was stuck in a rut here with a JavaScript problem, but I did some active
research that I became very happy with:

<pre class="brush: javascript">
    function InsertTextAtCursor(input, valueString){
   //IE support
   if (document.selection) {
      $(input).focus();
      sel = document.selection.createRange();
      sel.text = valueString;
    }
    //MOZILLA/NETSCAPE support
   else if ($(input).selectionStart || $(input).selectionStart == '0') {
      var startPos = $(input).selectionStart;
      var endPos = $(input).selectionEnd;
      $(input).value = $(input).value.substring(0, startPos)
     + valueString
      + $(input).value.substring(endPos, $(input).value.length);
   } 
   else{
      $(input).value += valueString;
   }

 }
</pre>

Notice that I've used prototype as well in this solution. The function could be
a lot more, but I just need it for one feature only.
