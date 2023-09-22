---
layout: post

route: /2010/03/14/how-to-create-a-table-of-contents-with-javascript-and-prototypejs
title: 'How to create a table of contents with javascript and prototype.js'
description: ''
category: 'Archive'
tags: []
---

Well, if you write long posts every now and then and you want your users to
access the information in an easy way instead of splitting up the post in
several pages, this is a very nice solution to this issue.

## Step one: Add html element to the page

<pre class="brush: html">
&lt;div id="toc" style="display:none;">Post content:&lt;br />&lt;/div>
</pre>

## Step two: Add the javascript

<pre class="brush: javascript">
// When page has finished loading
Event.observe(window,'load',function(event) {  
 // Check if the element exists
 if($('toc')){
    var show = false;
    var toc_i = 0;
   // Check the div contaning headings you want to have in your table of contents  
   $$('#post_content h2,#post_content h3').each(function(element){
      toc_i++;
     show      = true;
      // Add an id to the headings for linking
     toc_title_id    = 'article_chapter_' + toc_i;
      $(element).id     = toc_title_id;
      if(element.tagName == 'H3'){          
       $('toc').innerHTML  += '&nbsp;&nbsp;&nbsp;&nbsp;- &lt;a href="#' + $(element).id + '" onclick="$(element).scrollTo($(element));">' + element.innerHTML.stripTags() + '&lt;/a>&lt;br /' + '>';       
     }
      else{
        $('toc').innerHTML  += toc_i + '. &lt;a href="#' + $(element).id + '" onclick="$(element).scrollTo($(element));">' + element.innerHTML.stripTags() + '&lt;/a>&lt;br /' + '>';
      }
      // Scroll to top
     $(element).innerHTML  += '&lt;a href="#post_content" onclick="$(\'post_content\').scrollTo($(\'post_content\'));" class="backToTop">#top&lt;/a>';
    }); 
   if(show){
      $('toc').appear();
   }
  }
});
</pre>

That's practically it! Enjoy.
