---
layout: page
title: Lover of life, technologist at heart
tagline: The world from my point of view, and some pendatic creativity
---
{% include JB/setup %}


    
## All my posts

<ul class="posts">
  {% for post in site.posts %}
    <li><span>{{ post.date | date_to_string }}</span> &raquo; <a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a></li>
  {% endfor %}
</ul>

