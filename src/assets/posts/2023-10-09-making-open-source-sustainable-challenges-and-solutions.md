---
route: /2023/10/09/making-open-source-sustainable-challenges-and-solutions
title: 'Making Open Source Sustainable: Challenges and Solutions'
description:
  'Open source software has revolutionized the world of technology, enabling
  collaboration and innovation on a global scale. However, as open source
  projects have gained prominence, the challenge of ensuring their
  sustainability has come to the forefront. This article delves into the
  multifaceted aspects of sustainability in open source'
category: 'Open source'
image: '/img/blog/photo-1542601906990-b4d3fb778b09-652395485df64.webp'
tags: [open source, sustainability, challenges, solutions, open source fatigue]
---

{% message type="note" title="Note" %}

This article is derived from my talk
[How to make Open Source more sustainable](https://slides.com/phun-ky/kds-2023-copenhagen-how-to-make-open-source-more-sustainable),
created December, 2022.

{% /message %}

{% figure
  description="Cupped hands with a growing fern like plant with soil"
  src="/img/blog/photo-1542601906990-b4d3fb778b09-652395485df64.webp"
%}

{% /figure %}

Open source has been one of the defining trends in the technology industry over
the past several decades. It enables global collaboration and innovation.
However, ensuring its sustainability is a growing challenge.

**Table of Contents**

1. [The Challenge](#the-challenge)
   1. [Examples of Critical Open Source Projects](#examples-of-critical-open-source-projects)
      1. [OpenSSL](#openssl)
      2. [cURL](#curl)
2. [Burnout Among Maintainers](#burnout-among-maintainers)
3. [Ramifications of Unsustainable Open Source](#ramifications-of-unsustainable-open-source)
   1. [Examples of projects that was on the brink of abandonment, or was removed](#examples-of-projects-that-was-on-the-brink-of-abandonment-or-was-removed)
      1. [Lerna](#lerna)
      2. [leftpad](#leftpad)
4. [Finding Solutions](#finding-solutions)
   1. [The Key Questions](#the-key-questions)
   2. [Securing Funding for Open Source](#securing-funding-for-open-source)
      1. [Github sponsor](#github-sponsor)
   3. [Encouraging Contributions to Open Source](#encouraging-contributions-to-open-source)
      1. [Hacktoberfest](#hacktoberfest)
      2. [Bounty source](#bounty-source)
   4. [Balancing Sustainability and Open Source Principles](#balancing-sustainability-and-open-source-principles)
5. [Conclusion](#conclusion)
   1. [Open Source and a Sustainable Future](#open-source-and-a-sustainable-future)

## The Challenge

{% figure
  description="A port with polution in the air"
  src="/img/blog/photo-1611273426858-450d8e3c9fce-6523954c5542d.webp"
%}

{% /figure %}

Open source projects are mainly maintained by unpaid volunteers. While this
aligns with open source principles, it poses sustainability issues. These
projects rely on donations and sponsorships, which can be inconsistent.
Generating revenue remains a concern for open source companies.

> Everyone uses open source, some open source is written by solo maintainers who
> struggle to pay the rent, which puts us all at risk, so that must change.
>
> <footer class="ph">
>
> – Matt Asay in
> <cite class="ph">[A new way of thinking about open source sustainability, Infoworld](https://www.infoworld.com/article/3706508/a-new-way-of-thinking-about-open-source-sustainability.html)</cite>
>
> </footer>

**Open Source Dependency**

Most software relies on open source components. Many solo maintainers struggle
financially, endangering the ecosystem.

### Examples of Critical Open Source Projects

#### OpenSSL

- 1,320,000,000websites
- 638 community contributors
- 18 maintainers

#### cURL

- 10 000 000 000installations of cURL worldwide
- 800 community contributors
- 8 maintainers

For instance,
[Synopsys’ 2023 open source security report](https://thenewstack.io/open-source-vulnerabilities-still-a-challenge-for-developers/),
which audited more than 1,700 codebases across 17 industries, found that:

- 96% of the codebases included open source software.
- Just over three-quarters of the code in the codebases — 76%— was open source.
- 91% of code bases included open source software that had had no developer
  activity in the past two years — a timeframe that could indicate, the report
  suggested, that an open source project is not being maintained at all.

## Burnout Among Maintainers

{% figure
  description="Woman in a rally holding a sign where it says: I can't breathe"
  src="/img/blog/photo-1591281700819-900258b1423e-65239547ee774.webp"
%}

{% /figure %}

Open source maintainers often work unpaid. 60% consider themselves "unpaid
hobbyists", and 44% are sole maintainers, said the
<cite class="ph">[May 2023 Study by Tidelift](https://tidelift.com/about/press-releases/tidelift-study-reveals-that-despite-increasing-demands-from-government-and-industry-60-of-maintainers-are-still-unpaid-volunteers)</cite>.

Open source projects are more and more often victims of their own success. Those
responsible for the packages end up spending thousands of hours a year
maintaining and supporting packages that exists in the global infrastructure.
This can lead to burnout and a lack of resources for maintaining and updating
these projects.

{% figure
  description="People in front of a protest march"
  src="/img/blog/photo-1618706757440-25f2f017bdcb-6523954f29cbc.webp"
%}

{% /figure %}

Absolutely free, and usually only with outrage as the open source world's
salary. It is not sustainable. Not in the long run. This is a massive challenge,
across both companies and national borders. We as developers are definitely in a
position where we can contribute, but what is really the right way to do it? I
will try to answer this

## Ramifications of Unsustainable Open Source

> Even more concerning than the sole maintainer projects are the zero maintainer
> projects, of which there are a considerable amount as well that are widely
> used
>
> – Donald Fischer, CEO and co-founder of Tidelift

Discontinuing open source projects can have significant ramifications. Open
source software is often integrated into many other systems and products, and it
can disrupt these systems and cause significant technical problems. Furthermore,
it can cause loss of trust and confidence in open source software, and
discourage potential contributors from participating in open source projects.

Moreover, it can leave users and organizations without support or security
updates, which can result in increased security risks and decreased stability.
The discontinuation of an open source project can also lead to a lack of
innovation and progress in a particular area, as other open source projects may
not have the resources or community to fill the gap.

> In Tidelift's survey, 36% of maintainers said they have considered quitting
> their project; 22% said they already had.

In short, it can have far-reaching consequences and can undermine the
sustainability of the open source ecosystem as a whole. It's important for open
source projects to have sustainable funding and support, as well as clear
governance and maintenance policies, to minimize the risk of discontinuation.

### Examples of projects that was on the brink of abandonment, or was removed

#### Lerna

{% figure
  description="Screenshot of an issue in the Lerna GitHub repository"
  src="/img/blog/lerna-6523aefc6b147.webp"
%}

{% /figure %}

[Lerna](https://lerna.js.org/) is a monorepo, that is, a modern build system for
managing and publishing multiple packages from the same repository. It was
solely driven by [@evocateur](https://twitter.com/evocateur) a.k.a Daniel
Stockman, but he got burnt out, and wanted to shut the whole thing down.

Lerna have up to 1.5 million downloads a day, and the creator have a total of
3.9 _billion_ downloads for his packages.

> … its creator @evocateur voiced his burnout and intention to abandon the
> project it was not made official until April 2020.

Due to the slow answer rate and almost no maintenance, people started to dislike
it.

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">I refuse to accept this man! Stay strong! I haven&#39;t seen any monorepo thingy-majingy doing the same as lerna &lt;3</p>&mdash; Alexander V. R-H (@phun_ky) <a href="https://twitter.com/phun_ky/status/1483415938611437571?ref_src=twsrc%5Etfw">January 18, 2022</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

However, luckily for the open source world, and the people using Lerna, the
torch was passed to [Nrwl](https://nx.app/company).

#### leftpad

```javascript
module.exports = leftpad;
function leftpad(str, len, ch) {
  str = String(str);
  var i = -1;
  if (!ch && ch !== 0) ch = ' ';
  len = len - str.length;
  while (++i < len) {
    str = ch str;
  }
  return str;
}
```

Certainly, the "leftpad" incident remains fresh in the memory of the open-source
community.

In the open source world, even the smallest components can wield significant
influence. The "leftpad" story serves as a proof to this reality. Leftpad was a
small JavaScript library that did a simple thing - it added spaces to the left
side of a string to achieve a specified length. On the surface, it appeared
trivial. 13-15 lines of code, that was it.

However, a sudden decision by its maintainer to remove "leftpad" from the npm
package registry sent shockwaves through the software development landscape.
This unassuming library turned out to be a linchpin for countless projects and
applications. Its abrupt absence caused widespread disruption and highlighted
the vulnerability of open source ecosystems when a critical component is
unexpectedly withdrawn.

> The "leftpad" incident underscores the imperative of implementing sustainable
> open source practices, ensuring clear governance, and recognizing the
> significance of maintaining even the seemingly minor elements within the open
> source ecosystem. It serves as a sobering reminder that every contribution,
> irrespective of its size, plays a vital role in the symphony of open source
> development.

## Finding Solutions

### The Key Questions

So, what can be done to ensure the financial sustainability of open source
projects? To answer this question, we need to consider several crucial
questions.

- How can we secure funding for open source projects?
  - How can we ensure that open source developers are fairly compensated for
    their contributions?
  - How can we measure the value of open source contributions?
- How can we encourage more people to contribute to open source projects?
- How can we balance the need for financial sustainability with the principles
  of open source?
  - How can we ensure that open source projects are inclusive and accessible to
    all?

### Securing Funding for Open Source

- Developing a model for _compensating_ open source developers. This could
  include offering monetary compensation, providing benefits such as more
  vacation, or allowing developers to work on open source projects as _part of
  their paid work_.
- Securing reliable funding sources for open source projects. This could include
  setting up a foundation to _support_ open source development, or partnering
  with companies or organizations that have an interest in supporting open
  source.
- Measuring the _value_ of open source contributions by tracking metrics such as
  the number of contributors, the amount of code contributed, and the _impact_
  that the open source project has had on the community.

#### Github sponsor

{% figure
  url="<https://github.com/sponsors>"
  description="Screenshot of the github.com/sponsors website"
  src="/img/blog/githubsponsors-6523b7793d4da.webp"
%}

{% /figure %}

### Encouraging Contributions to Open Source

- Encouraging more people to _contribute_ to open source projects by _creating_
  a welcoming and inclusive environment. This could include providing
  mentor-ship and training programs, or hosting events and workshops to _engage_
  the community.

Examples of that could be bounties, hackatons, meetups, workshops etc.

#### Hacktoberfest

{% figure
  url="<https://hacktoberfest.com/>"
  description="Screenshot of the hacktoberfest.com website"
  src="/img/blog/screenshot-from-2023-10-09-10-20-44-6523b7f22b514.webp"
%}

{% /figure %}

#### Bounty source

{% figure
  url="<https://bountysource.com/>"
  description="Screenshot of the bountysource.com website"
  src="/img/blog/screenshot-2023-02-01-at-12-21-52-bountysource-6523b77921065.webp"
%}

{% /figure %}

### Balancing Sustainability and Open Source Principles

With; How can we ensure that open source projects are inclusive and accessible
to all?

- Balancing the need for financial sustainability with the principles of open
  source by making sure that open source projects remain _transparent,
  accessible, and free for everyone_ to use.
  - Ensuring that open source projects are inclusive and accessible to all by
    promoting diversity and inclusivity, and by taking steps to remove barriers
    to entry for underrepresented groups.

> It's important for open source projects to have sustainable _funding_ and
> _support_, as well as _clear governance and maintenance policies_, to minimize
> the risk of discontinuation.

## Conclusion

### Open Source and a Sustainable Future

Yes, open source can be a part of making a sustainable future. By promoting
transparency and collaboration, open source software can lead to more efficient
and sustainable use of resources. Additionally, open source projects bring
people together from all over the world to work on creating solutions, which can
result in more sustainable and eco-friendly technology. The ability to customize
and tailor open source software to individual needs can also reduce waste and
contribute to sustainability goals. Overall, open source has the potential to
play a significant role in creating a more sustainable future.
