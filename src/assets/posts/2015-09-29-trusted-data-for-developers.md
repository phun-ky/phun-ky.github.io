---
route: /2015/09/29/trusted-data-for-developers
title: 'Trusted data for developers'
tagline: 'Or how to start the apocalypse'
description:
  'Hey, you. Yes, YOU! The developer reading this article. Are you ready to call the four horsemen and start the apocalypse? Start the next nuclear holocaust? Kill patients? Bankrupt banks? Do I have your attention yet?<br/><br/>Yes? Good. Because all of this can happen, and will happen, if you do not keep your shit together'
category: 'Technology'
tags: [trusted-data, data, how-to]
image: https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Apocalypse_vasnetsov.jpg/640px-Apocalypse_vasnetsov.jpg
---

**Table of Contents**

1. [Incidents due to erroneous data](#incidents-due-to-erroneous-data)
   1. [1980 NORAD NUCFLASH](#1980-norad-nucflash)
   2. [NASA, the Mars Climate Orbiter](#nasa-the-mars-climate-orbiter)
2. [What can we learn from this?](#what-can-we-learn-from-this)

<figure class="ph">
  <img title="The four horsemen of the apocalypse" alt="A painting of the four horsemen of the apocalypse" src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Apocalypse_vasnetsov.jpg/640px-Apocalypse_vasnetsov.jpg" class="ph"/>
  <figcaption class="ph">
    <small class="ph">
      "<a class="ph" target="_blank" rel="noopener noreferrer" href="https://commons.wikimedia.org/wiki/File:Apocalypse_vasnetsov.jpg#/media/File:Apocalypse_vasnetsov.jpg">Apocalypse vasnetsov</a>" by <a class="ph" href="//en.wikipedia.org/wiki/Viktor_Vasnetsov" class="extiw" title="en:Viktor Vasnetsov">Viktor M. Vasnetsov</a> - <a rel="nofollow" class="ph external free" href="http://lj.rossia.org/users/john_petrov/166993.html">http://lj.rossia.org/users/john_petrov/166993.html</a>. Licensed under Public Domain via <a class="ph" target="_blank" rel="noopener noreferrer" href="https://commons.wikimedia.org/wiki/">Commons</a>.
    </small>
  </figcaption>
</figure>

How do you ask? Well, how is your data? Can it be trusted? Do you think the
users of your systems are safe without trusted data?

> Anything that can go wrong will go wrong.
>
> <a class="ph" target="_blank" rel="noopener noreferrer" href="https://en.wikipedia.org/wiki/Murphy%27s_law">https://en.wikipedia.org/wiki/Murphy%27s_law</a>

Well, let me tell you what possibly could go wrong (or in reality, will go
wrong):

You work as a system developer, developing a control system for the flow intake
of gas from the pipelines in the North Sea. The system passes all tests and is
shipped out to production with flying colours, and you celebrate. But then,
disaster. A valve controlling gas intake in a pipeline junction fails to close
during a repair shutdown, resulting in a massive gas overflow in the area that
has ongoing repairs, 3 workers welding on a new pipe segment is caught in the
resulting explosion. You have now 3 lives on your consciousness. The flaw? Your
system did not account for the datasets used on the valves onboard controller.

Do you really want that on your conscience? I sure would not. Is this plausible?
Yes. Has something similar happened? Yes, this is another take on the
<a class="ph" target="_blank" rel="noopener noreferrer" href="http://www.msnbc.msn.com/id/4394002">huge
Siberian gas pipeline explosion in 1982.</a> _(Albeit the 1982 event was an
engineered event.)_

## Incidents due to erroneous data

### 1980 NORAD NUCFLASH

> On 3 June 1980, and again on 6 June 1980, a computer communications device
> failure caused warning messages to sporadically flash in U.S. Air Force
> command posts around the world that a nuclear attack was taking place. During
> these incidents, Pacific Air Forces (PACAF) properly had their planes (loaded
> with nuclear bombs) in the air; Strategic Air Command (SAC) did not and took
> criticism, because they did not follow procedure, even though the SAC command
> knew these were almost certainly false alarms, as did PACAF. Both command
> posts had recently begun receiving and processing direct reports from the
> various radar, satellite, and other missile attack detection systems, and
> those direct reports simply did not match anything about the erroneous data
> received from NORAD
>
> <a class="ph" target="_blank" rel="noopener noreferrer" href="https://en.wikipedia.org/wiki/North_American_Aerospace_Defense_Command#False_alarms">https://en.wikipedia.org/wiki/North_American_Aerospace_Defense_Command#False_alarms</a>

Be grateful that SAC checked with other sources about this alleged nuclear
attack, or we would not have been here today.

### NASA, the Mars Climate Orbiter

The
<a class="ph" target="_blank" rel="noopener noreferrer" href="https://en.wikipedia.org/wiki/Mars_Climate_Orbiter">Mars
Climate Orbiter</a> was planned to maneuver into Mars orbit, but due to wrong
expected input, it "... encountered Mars in a lower than anticipated altitude
and disintegrated".

> The primary cause of this discrepancy was that one piece of ground software
> supplied by Lockheed Martin produced results in a United States customary unit
> ("American"), contrary to its Software Interface Specification (SIS), while a
> second system, supplied by NASA, that used those results expected them to be
> in metric units, in accord with the SIS. Software that calculated the total
> impulse produced by thruster firings calculated results in pound-seconds. The
> trajectory calculation used these results to correct the predicted position of
> the spacecraft for the effects of thruster firings. This software expected its
> inputs to be in newton-seconds.
>
> <a class="ph" target="_blank" rel="noopener noreferrer" href="https://en.wikipedia.org/wiki/Mars_Climate_Orbiter#Cause_of_failure">Cause
> of failure, Mars Climate Orbiter</a>

<figure class="ph">
  <img src="/img/blog/uf011824.gif" class="ph"/>
  <figcaption class="ph">
    <small class="ph">
      <a class="ph" target="_blank" rel="noopener noreferrer" href="http://ars.userfriendly.org/cartoons/?id=20080824">userfriendly.org</a>
      </small>
  </figcaption>
</figure>

## What can we learn from this?

Throughout the history, we can find numerous examples of incidents relating to
erroneous data, not only within the IT, Space or Military industry. We often
hear about people sentenced to death or
<a class="ph" target="_blank" rel="noopener noreferrer" href="http://usnews.nbcnews.com/_news/2012/05/21/11756575-researchers-more-than-2000-false-convictions-in-past-23-years?lite">imprisonment
due to false witness statements.</a>

Looking at server monitoring, how do we even know that it's alive? For all we
know that server could report that everything is ok, even if it's not. Or with
web statistics tools, how do you know that all the page hits are not from
robots?

> hm. I've lost a machine.. literally _lost_. it responds to ping, it works
> completely, I just can't figure out where in my apartment it is.
>
> <a class="ph" target="_blank" rel="noopener noreferrer" href="http://bash.org/?5273">http://bash.org/?5273</a>

But how could you do it better? How can your data be safe? "How can I make sure
I have data that is trustworthy?".

This is not about just sanitation of data, using tests and verify outcomes. This
is about making sure the data is trusted, and the solution is
<a class="ph" href="/2015/09/09/trusted-data/">"Trusted Data"</a>. When we are
dealing with data, we have to make sure that the data is trustworthy. As
<a class="ph" href="/2015/09/14/how-to-work-with-trusted-data/">previously
mentioned</a>, there are some key pointers you can adhere to, to work with
<a class="ph" href="/2015/09/09/trusted-data/">"Trusted Data"</a>.

> Assumption is the mother of all fuckups
>
> <a class="ph" target="_blank" rel="noopener noreferrer" href="https://www.youtube.com/watch?v=wg4trPZFUwc">https://www.youtube.com/watch?v=wg4trPZFUwc</a>

Never assume anything when it comes to data, or interpretation of data. Be
skeptic, curious. Go into the matter, tear it apart and analyse it. See things
from another perspective. We are humans, we tend to see things for who we are,
not for what the things are.
