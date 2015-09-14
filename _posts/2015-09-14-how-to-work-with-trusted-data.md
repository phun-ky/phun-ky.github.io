---
layout: post
title: "How to work with Trusted Data"
tagline : "What can we do to make sure the data we have is trustworthy?"
description: "The previous article on Trusted Data, covered the definition on the term, but the article did not provide any leads yet on how to act on this. How do you work with data and ensure the data is trustworthy?"
category: "Technology"
image: https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/RAILROAD_WORK_CREW_IMPROVES_THE_TRACKS_AND_BED_OF_THE_ATCHISON%2C_TOPEKA_AND_SANTA_FE_RAILROAD_NEAR_BELLEFONT%2C_KANSAS..._-_NARA_-_556012.jpg/640px-RAILROAD_WORK_CREW_IMPROVES_THE_TRACKS_AND_BED_OF_THE_ATCHISON%2C_TOPEKA_AND_SANTA_FE_RAILROAD_NEAR_BELLEFONT%2C_KANSAS..._-_NARA_-_556012.jpg
tags: [trusted-data, data, how-to]
---
{% include JB/setup %}

<p class="lead">

The <a href="/2015/09/09/trusted-data/">previous article on "Trusted Data"</a>, covered the definition on the term, but the article did not provide any leads yet on how to act on this. How do you work with data and ensure the data is trustworthy?
</p>

We will now cover those questions, and we begin with some key areas on how you can collect and process data. This could be used as a check list to make data more trustworthy.

<figure>
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/RAILROAD_WORK_CREW_IMPROVES_THE_TRACKS_AND_BED_OF_THE_ATCHISON%2C_TOPEKA_AND_SANTA_FE_RAILROAD_NEAR_BELLEFONT%2C_KANSAS..._-_NARA_-_556012.jpg/640px-RAILROAD_WORK_CREW_IMPROVES_THE_TRACKS_AND_BED_OF_THE_ATCHISON%2C_TOPEKA_AND_SANTA_FE_RAILROAD_NEAR_BELLEFONT%2C_KANSAS..._-_NARA_-_556012.jpg" class="img-responsive img-rounded img-thumbnail"/>
  <figcaption>
    <small>
      "<a href="https://commons.wikimedia.org/wiki/File:RAILROAD_WORK_CREW_IMPROVES_THE_TRACKS_AND_BED_OF_THE_ATCHISON,_TOPEKA_AND_SANTA_FE_RAILROAD_NEAR_BELLEFONT,_KANSAS..._-_NARA_-_556012.jpg#/media/File:RAILROAD_WORK_CREW_IMPROVES_THE_TRACKS_AND_BED_OF_THE_ATCHISON,_TOPEKA_AND_SANTA_FE_RAILROAD_NEAR_BELLEFONT,_KANSAS..._-_NARA_-_556012.jpg">RAILROAD WORK CREW IMPROVES THE TRACKS AND BED OF THE ATCHISON, TOPEKA AND SANTA FE RAILROAD NEAR BELLEFONT, KANSAS... - NARA - 556012</a>" by <span class="fn value">Charles O'Rear, 1941-, Photographer (<a rel="nofollow" class="external text" href="//research.archives.gov/person/3403717">NARA record: 3403717</a>)</span> - <a href="//en.wikipedia.org/wiki/U.S._National_Archives_and_Records_Administration" class="extiw" title="en:U.S. National Archives and Records Administration">U.S. National Archives and Records Administration</a>. Licensed under Public Domain via <a href="https://commons.wikimedia.org/wiki/">Commons</a>. <strong>Figure 1</strong>
    </small>
  </figcaption>
</figure>

## Sources

* Have you used the given source before?
* Has the source provided data that appeared to be correct in the past?
* Have other parties used the source before?
* Are the sources credible?

>The quantity of information available is so staggering that we cannot know everything about a subject. For example, it's estimated that anyone attempting to research what's known about depression would have to read over 100,000 studies on the subject. And there's the problem of trying to decide which studies have produced reliable results.
>
><a href="https://owl.english.purdue.edu/owl/resource/553/01/">Evaluating Sources: Overview, Online Writing Lab, Purdue University</a>

If you have used the source before, you have probably acquired a level of trust with that source, relying on the data it provides. If you have not used the source, you can verify it by enquiring experience from other users of that source and validate the data itself.

To recap on what sources could be:

* Wife <sup><a href="/2015/09/09/trusted-data/#interpretation-of-data">(telling you what to get in the store)</a></sup>
* The TV-schedule
* API-service
* Radio show host
* Newspaper
* Website
* Birth certificate
* Whistle-blower

## Interpretation

* Have you interpreted the data correctly?
* Have you interpreted the data wrongly before?
* Have you interpreted the data with the same understanding of the data as others?
* Could the data be interpreted in another way?
* Do the consumers of the data interpret it the same way?

The interpretation method will vary from each use and scenario. The perspective used to interpret those data is strongly biased with our own understanding of the data. We could also say that our take on the data can be based on how we have interpreted the data before.

Try to analyse the data from another view. If it is statistical data gathered from a quantitative survey, could the data be strengthened or weakened through a qualitative survey?

If you monitor a server, how can you be sure that the server is healthy without actually "physically" checking the server? Do you rely on the data from the monitoring completely?

### False positives

When it comes to the interpretation of data, developers most likely will interact with a term called "false positives". We can quickly explain this by this example in JavaScript:

<script src="https://gist.github.com/phun-ky/be2ae0485468705e5480.js"></script>

The difference between `==` and `===` is that the latter means "equality wihout type coersion", meaning that when we use `===`, we also check if the type is equal.

Another example is this:

<script src="https://gist.github.com/phun-ky/6c401b2c3a68d8ab167f.js"></script>

This is because the created objects got different object references.

## Data

* Can you verify it?
* Can it be reproduced?

Verify the data by checking against other sources. Re-collect it, is the data the same? Can the data be reproduced over time?

Within IT-development, this could be ensured during a development lifecycle with unit-tests, data validation, checking charsets and protocols.

## A final word

>  The best way to find out if you can trust somebody is to trust them.
>
><a href="https://en.wikiquote.org/wiki/Talk:Ernest_Hemingway">Ernest Hemingway</a>

In the end, you will have to have a whole lot of trust in yourself to be able to collect, analyse, interpret and relay data that can be trusted. You cannot trust data 100%, but you can put some effort into validating data. Check other reliable sources, be skeptic, question the validity of data. Re-collect information, be certain you have the correct information.


----------------

<div class="alert alert-info">

There are some organizations and standards that work to enhance and refine data and credibility of sources.

<p><a href="http://credibility.stanford.edu/">The Stanford Web Credibility Research Project</a> (part of <a href="http://captology.stanford.edu/">the Persuasive Technology Lab</a>) at Stanford University are investigating questions such as:</p>

<ul>
<li>What causes people to believe (or not believe) what they find on the Web?</li>
<li>What strategies do users employ in evaluating the credibility of on-line sources?</li>
<li>What contextual and design factors influence these assessments and strategies?</li>
</ul>

<p><a href="https://en.wikipedia.org/wiki/TrustRank">TrustRank</a> is a technique used for semi-automatic separation of useful web pages from spam.</p>

</div>
