---
route: /2024/06/21/a-frontenders-experience-with-with-ndc-oslo-2024
title: 'A frontenders experience with with NDC Oslo 2024'
description:
  "I have attended and spoken at [NDC Oslo](https://ndcoslo.com/) for several
  years, and this year I'm writing a brief summary about my experience attending
  NDC Oslo 2024."
category: 'Programming'
tags: [conferences]
---

- [The conference](#the-conference)
- [The venue](#the-venue)
- [The talks I attended](#the-talks-i-attended)
  - [What the Soviet Space Program Taught Me About Digital Product Development](#what-the-soviet-space-program-taught-me-about-digital-product-development)
  - [Advanced HTML for Performance \& Accessibility](#advanced-html-for-performance--accessibility)
  - [EventSource: The under appreciated sibling of WebSockets – a dive into real time communication](#eventsource-the-under-appreciated-sibling-of-websockets--a-dive-into-real-time-communication)
- [Other talks](#other-talks)
- [Afterthought](#afterthought)
- [Summary](#summary)

{% message type="note" title="Note" %}

This summary could be interpreted as a too brief summary, but I am not that good
to write down thoughts and memories in my head. Articles takes weeks and months,
and in some occasions,
[years to write](https://phun-ky.net/2015/09/09/trusted-data).

{% /message %}

## The conference

{% figure
  description="Photo from NDC Oslo 2024"
  url="/img/blog/ndc-oslo-2024/1000003725.jpg"
  src="/img/blog/ndc-oslo-2024/1000003725.webp"
%}

{% /figure %}

What is NDC? From their website:

> The first NDC conference was held at the Radisson Scandinavia hotel in Oslo
> back in 2008. The conference had more than 800 attendees and included 1 day of
> Agile and 1 day of .NET. Since then the conference has come a long way. There
> are now NDC conferences in locations around the world, including Oslo, London,
> Sydney, Porto, and Copenhagen.
>
> NDC will cover all topics interesting to developers. You can see most of our
> previous talks on our YouTube channel →
> [NDC Conferences](https://www.youtube.com/ndcconferences)
>
> **NDC Oslo 2024**
>
> NDC Oslo consists of 2 workshop days followed by 3 days of conference sessions
> in Oslo Spektrum. NDC will be an in-person event with multiple tracks, an expo
> and after-parties. We expect more than 2700 people to attend.

This was my 3rd or 4th time at NDC Oslo, first one was in 2012, and I have even
[held a talk at NDC!](https://phun-ky.net/2023/01/17/from-nothing-to-state-of-the-art-how-we-build-design-systems-for-all)

## The venue

In the early years, NDC was mostly focused on backend with .NET/backend related
talks, but over the years we saw that it directed the agenda to be a more cross
disciplinary conference. This suited me, since I am a frontender. The last two
times however, it was clear that they are turning their focus back to backend
and .NET :/

The venue has in the last years always been at
[Oslo Spektrum](https://oslospektrum.no/), a huge multi use hall that was opened
in 1990. It is located right smack in the middle of down town, and easily
accessible.

A fun fact is that it is designed to be a tank/heavy vehicle repair depot in the
eventuality of war in Norway. The rig in the ceiling is more than capable of
lift several thousand tons, e.g. tanks, and originally the entrances was made so
that those vehicles could easily enter.

One thing that I like with NDC (and perhaps other conferences do the same as
well), is that they have an overflow area where you can use a headset to tune in
to the different talks while they are held.

{% figure
  description="Photo from NDC Oslo 2024"
  url="/img/blog/ndc-oslo-2024/1000003695.jpg"
  src="/img/blog/ndc-oslo-2024/1000003695.webp"
%}

{% /figure %}

And of course, my company, Knowit, had the biggest stand at the venue:

{% figure
  description="Photo from NDC Oslo 2024"
  url="/img/blog/ndc-oslo-2024/1000003726.jpg"
  src="/img/blog/ndc-oslo-2024/1000003726.webp"
%}

{% /figure %}

## The talks I attended

What struck me as peculiar, was the presence of 3 space related talks on the
agenda. Are we shifting our focus to the stars?

- [On Becoming a Space-Faring Civilization](https://ndcoslo.com/agenda/on-becoming-a-space-faring-civilization/d8f200df08fa)
  by Richard Campbell
- [Space Flight in 2024](https://ndcoslo.com/agenda/space-flight-in-2024/ad750a0430b5)
  by Richard Campbell
- [What the Soviet Space Program Taught Me About Digital Product Development](https://ndcoslo.com/agenda/what-the-soviet-space-program-taught-me-about-digital-product-development-08k1/0uonpzyaz24)
  by Dean Schuster

The last one was more related to my area, and not directly related to the future
of us as a space faring civilization.

{% figure
  description="Photo from NDC Oslo 2024"
  url="/img/blog/ndc-oslo-2024/1000003726.jpg"
  src="/img/blog/ndc-oslo-2024/1000003726.webp"
%}

{% /figure %}

### What the Soviet Space Program Taught Me About Digital Product Development

I wanted to join all, but due to conflicting talks and me helping around the
Knowit stand at the conference, I only managed to partake in one of them. And
that was
[What the Soviet Space Program Taught Me About Digital Product Development](https://ndcoslo.com/agenda/what-the-soviet-space-program-taught-me-about-digital-product-development-08k1/0uonpzyaz24)
by Dean Schuster.

{% figure
  description="Photo from NDC Oslo 2024"
  url="/img/blog/ndc-oslo-2024/1000003698.jpg"
  src="/img/blog/ndc-oslo-2024/1000003698.webp"
%}

{% /figure %}

He talked about how we can use the Soviet space program as an example on how to
NOT build products. Albeit, during the Cold War, Soviet had almost all of the
firsts. First animal in space, first man in space, first space walk, first
satelite, first to another planet. However, the way they got there was by
sacrificing a lot. They skipped testing and safety procedures etc just to be
first.

{% figure
  description="Photo from NDC Oslo 2024"
  url="/img/blog/ndc-oslo-2024/1000003701.jpg"
  src="/img/blog/ndc-oslo-2024/1000003701.webp"
%}

{% /figure %}

This resultet in a very unstable foundation to build upon. While the Soviets
were first in many things, they did not have the most important first, beeing
the first to put a man on the moon.

The US did things a bit slower, but with the momentum they build up by going
slow, ultimately led them to be the first to put a man on the mooon.

{% figure
  description="Photo from NDC Oslo 2024"
  url="/img/blog/ndc-oslo-2024/1000003702.jpg"
  src="/img/blog/ndc-oslo-2024/1000003702.webp"
%}

{% /figure %}

I think the key giveaway here is that you do not always have to be first, but
like the old catchphrase, slow and steady wins the race, if you create and
develop a product in a steady pace, you can eventually by the shear momentum,
create something that can outlive you.

{% figure
  description="Photo from NDC Oslo 2024"
  url="/img/blog/ndc-oslo-2024/1000003704.jpg"
  src="/img/blog/ndc-oslo-2024/1000003704.webp"
%}

{% /figure %}

### Advanced HTML for Performance & Accessibility

{% figure
  description="Photo from NDC Oslo 2024"
  url="/img/blog/ndc-oslo-2024/1000003692.jpg"
  src="/img/blog/ndc-oslo-2024/1000003692.webp"
%}

{% /figure %}

Another talk I attended, was Many Michaels talk about
[Advanced HTML for Performance & Accessibility](https://ndcoslo.com/agenda/advanced-html-for-performance-and-accessibility-0c3a/0gu5sy38yn9).

{% figure
  description="Photo from NDC Oslo 2024"
  url="/img/blog/ndc-oslo-2024/1000003694.jpg"
  src="/img/blog/ndc-oslo-2024/1000003694.webp"
%}

{% /figure %}

I really hoped that I was going to learn something new and cool, but this was
just another "use this attributes" talk for accessibility that I've seen and
heard so many times before.

### EventSource: The under appreciated sibling of WebSockets – a dive into real time communication

Benedicte Emilie Brækken had a really good
[talk about EventSource](https://ndcoslo.com/agenda/eventsource-the-under-appreciated-sibling-of-websockets-a-dive-into-real-time-communication-0p76/0daulnnd8vu),
an alternative to WebSockets. And she managed to raise my curiosity about it,
and I would like to try it out on an occasion where I need real time
communication.

{% figure
  description="Photo from NDC Oslo 2024"
  url="/img/blog/ndc-oslo-2024/1000003711.jpg"
  src="/img/blog/ndc-oslo-2024/1000003711.webp"
%}

{% /figure %}

{% figure
  description="Photo from NDC Oslo 2024"
  url="/img/blog/ndc-oslo-2024/1000003712.jpg"
  src="/img/blog/ndc-oslo-2024/1000003712.webp"
%}

{% /figure %}

{% figure
  description="Photo from NDC Oslo 2024"
  url="/img/blog/ndc-oslo-2024/1000003713.jpg"
  src="/img/blog/ndc-oslo-2024/1000003713.webp"
%}

{% /figure %}

{% figure
  description="Photo from NDC Oslo 2024"
  url="/img/blog/ndc-oslo-2024/1000003719.jpg"
  src="/img/blog/ndc-oslo-2024/1000003719.webp"
%}

{% /figure %}

## Other talks

Even though the program is not a good fit for me, as a frontender, the NDC
program commitee STILL manages to put talks that I wanted to go to in
conflicting slots. So I just have to wait to see it
[until it is uploaded on YouTube](https://www.youtube.com/@NDC):

- [Your website does not need JavaScript](https://ndcoslo.com/agenda/your-website-does-not-need-javascript-0noc/045kt3e9g1y)
  by Amy Kapernick
- [The History of Computer Art](https://ndcoslo.com/agenda/the-history-of-computer-art-03ko/01upfhbdeit)
  by Anders Norås
- [On Becoming a Space-Faring Civilization](https://ndcoslo.com/agenda/on-becoming-a-space-faring-civilization/d8f200df08fa)
  by Richard Campbell

As a big fan of minimized and simple web applications, I am looking forward to
Amys talk. And Anders Norås always delivers fantastic talks. And I must admit, I
am a space nerd, so would love to listen in on Richard Campbell.

{% figure
  description="Photo from NDC Oslo 2024"
  url="/img/blog/ndc-oslo-2024/1000003723.jpg"
  src="/img/blog/ndc-oslo-2024/1000003723.webp"
%}

{% /figure %}

There were other talks, of course, that peaked my interest. But due to a
conflicting schedule with family, and that I also stepped in for some of my
colleagues at out stand, I could not attend everything I wanted. But that is the
life of a dad and a consultant ;)

## Afterthought

Allthough NDC is primarily a .NET/backend conference, the program still lacks
the full cross functionality theme that revolves around us. No backender ever
interacts solely with backend code. I mean, they do try to have some
frontend/ux/design and non-tech talks, but it is not quite cutting it to be
honest.

{% figure
  description="Photo from NDC Oslo 2024"
  url="/img/blog/ndc-oslo-2024/1000003696.jpg"
  src="/img/blog/ndc-oslo-2024/1000003696.webp"
%}

{% /figure %}

## Summary

To sum it up, in general, the NDC conference is a great conference, but it fails
to hit the bullseye within my competence field. Yes, it is a great venu, yes the
speakers are great. You get to mingle and interact with people from around the
globe, and yes, great food and coffee, but I do not think I will partake in an
NDC conference, unless I am speaking or helping with the company stand.

Will I recommend this conference to a backend developer? Yes. A frontend
developer, no, unless there are talks that are specific to **you**.
