--- 
layout: post 
title: "squid log parser"
description: ""
category: "Archive"
tags: [squid, caching, server, backend, log, logging, parsing]
---
{% include JB/setup %}  
I was twisting my head trying to figure the best way to fetch data from the squid log server for a new internal statistic project at work, when I decided to make a parser myself rather than trying to find a pre-made parser and adjust it to fit my needs. 

After over 4 different prototypes getting a no-go from our DBA - the script had to insert rows in intervals - I finally made myself and the DBA happy.

The script is free to use, but please keep the copyright.

<script src="https://gist.github.com/phun-ky/4942569.js"></script>

