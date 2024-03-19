---
route: /2015/09/09/trusted-data
title: 'Trusted Data'
tagline: 'What is Trusted Data?'
description:
  We live in a <a class="ph" target="_blank" rel="noopener noreferrer"
  href="https://simple.wikipedia.org/wiki/Space-time">plane in the space-time
  continuum</a> surrounded by data. An inconceivable amount of data. Every day
  we observe, process, interpret, analyse and act upon data. Not just with
  computers, but with anything, everywhere. We watch TV, use social media, we
  look through the window, we smell the rain, we sense the tingling feeling on
  our feet when walking barefooted in the grass. We collect data 24/7, even <a
  class="ph" target="_blank" rel="noopener noreferrer"
  href="https://en.wikipedia.org/wiki/Neuroscience_of_sleep">when we sleep.</a>
  With so much data out there, how can we trust it? What is "Trusted Data"?
category: 'Technology'
tags: [trusted-data, data]
image: https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Social_Network_Analysis_Visualization.png/640px-Social_Network_Analysis_Visualization.png
---

**Table of Contents**

1. [What is data?](#what-is-data)
2. [What is trust?](#what-is-trust)
3. [Trusted data](#trusted-data)
   1. [What is a source?](#what-is-a-source)
   2. [Verification of data](#verification-of-data)
   3. [Examples of erroneous data](#examples-of-erroneous-data)
   4. [What makes data untrustworthy?](#what-makes-data-untrustworthy)
   5. [What risks are involved when we have untrustworthy data?](#what-risks-are-involved-when-we-have-untrustworthy-data)
   6. [Interpretation of data](#interpretation-of-data)
4. [A final word](#a-final-word)

{% figure
  description="A picture of the Milky Way seen in the night sky in Black Rock Desert Nevada"
  src="<https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Milky_Way_Night_Sky_Black_Rock_Desert_Nevada.jpg/643px-Milky_Way_Night_Sky_Black_Rock_Desert_Nevada.jpg>"
%}

by
<a rel="nofollow" class="ph external text" href="http://flickr.com/photos/44124348109@N01">Steve
Jurvetson</a> - [Flickr](http://flickr.com/photos/44124348109@N01/898622334).
Licensed under
<a class="ph" title="Creative Commons Attribution 2.0" href="http://creativecommons.org/licenses/by/2.0">CC
BY 2.0</a> via [Commons](https://commons.wikimedia.org/wiki/).

{% /figure %}

If we take in consideration, the whole observable universe,
<a class="ph" target="_blank" rel="noopener noreferrer" href="https://en.wikipedia.org/wiki/Orders_of_magnitude_(data)">scientists
have calculated the information capacity to be staggering 10<sup>90</sup></a>.
How much data is that? Well, it is 1.25 × 10<sup>80</sup> gigabytes. Not clear
enough? It's the equivalent of all the digital data produced on earth every
day<sup><a class="ph" target="_blank" rel="noopener noreferrer" href="http://aci.info/2014/07/12/the-data-explosion-in-2014-minute-by-minute-infographic/">(
5 exabytes in 2013 )</a></sup> until
<a class="ph" target="_blank" rel="noopener noreferrer" href="https://en.wikipedia.org/wiki/Heat_death_of_the_universe">the
universe succumbs to heat death</a> and long after that. And that copious amount
of data does not include the digital data that is produced every day.

We are not going to indulge ourselves in the universe or the
<a class="ph" target="_blank" rel="noopener noreferrer" href="https://simple.wikipedia.org/wiki/Space-time">space-time
continuum</a> in this article, We are not all physicists. This article is not
about
"<a class="ph" target="_blank" rel="noopener noreferrer" href="https://en.wikipedia.org/wiki/Big_data">Big
Data</a>", this article is about the data we all deal with on an everyday basis,
but especially, digital data and what makes it "Trusted Data".

To get a better grasp of the concept of "Trusted Data", we need to know what
lies in the terminology used.

## What is data?

{% figure
  description="Social_Network_Analysis_Visualization"
  src="<https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Social_Network_Analysis_Visualization.png/640px-Social_Network_Analysis_Visualization.png>"
%}

by
[MartinGrandjean](//commons.wikimedia.org/wiki/User:MartinGrandjean~commonswiki) -
<span class="int-own-work" lang="en">Own work</span>&nbsp;:
[http://www.martingrandjean.ch/wp-content/uploads/2013/10/Graphe3.png](http://www.martingrandjean.ch/wp-content/uploads/2013/10/Graphe3.png).
Licensed under
<a class="ph" title="Creative Commons Attribution-Share Alike 3.0" href="http://creativecommons.org/licenses/by-sa/3.0">CC
BY-SA 3.0</a> via [Commons](https://commons.wikimedia.org/wiki/).

{% /figure %}

Suman Deb Roy and Wenjun Zeng defines, in their book
<a class="ph" target="_blank" rel="noopener noreferrer" href="https://books.google.no/books?id=Z1hDBAAAQBAJ&printsec=frontcover&source=gbs_ge_summary_r&cad=0#v=onepage&q&f=false">Social
Multimedia Signals: A Signal Processing Approach to Social Network"</a>, data as
"... an abstract concept (that) can be viewed as the lowest level of
abstraction, from which information and then knowledge are derived."

Data is what we observe, what we perceive. It is what we humans collect through
sensory input.

> Digital data, in information theory and information systems, are discrete,
> discontinuous representations of information or works, as contrasted with
> continuous, or analogue signals which behave in a continuous manner, or
> represent information using a continuous function.
>
> <footer class="ph">
>
> –
> [https://en.wikipedia.org/wiki/Digital_data](https://en.wikipedia.org/wiki/Digital_data)
>
> </footer>

Digital data could be described as data that is collected and represented
through a digital interface.

## What is trust?

> In a social context, trust has several connotations. Definitions of trust
> typically refer to a situation characterized by the following aspects: One
> party (trustor) is willing to rely on the actions of another party (trustee);
> the situation is directed to the future. In addition, the trustor (voluntarily
> or forcedly) abandons control over the actions performed by the trustee. As a
> consequence, the trustor is uncertain about the outcome of the other's
> actions; they can only develop and evaluate expectations. The uncertainty
> involves the risk of failure or harm to the trustor if the trustee will not
> behave as desired.
>
> <footer class="ph">
>
> –
> [https://en.wikipedia.org/wiki/Trust_social_sciences)](https://en.wikipedia.org/wiki/Trust_%28social_sciences%29)
>
> </footer>

The definition of trust regarding relationship between people and technology is
a bit more cumbersome, since it describes a state that conflicts with the
rational reflection of human beings:

> When it comes to the relationship between people and technology, the
> attribution of trust is a matter of dispute. The intentional stance
> demonstrates that trust can be validly attributed to human relationships with
> complex technologies. However, rational reflection leads to the rejection of
> an ability to trust technological artifacts.
>
> <footer class="ph">
>
> –
> [https://en.wikipedia.org/wiki/Trust_social_sciences)](https://en.wikipedia.org/wiki/Trust_%28social_sciences%29)
>
> </footer>

When we collect, interpret and analyse data, we have to rely on a certain trust
to the data we work with. The trust we rely on can be grouped in three levels of
trust:

> ### Deterrence-based trust (rules)
>
> Deterrence-based trust means that there are rules in place that prevent one
> person from taking advantage of, or harming another person. In society, we
> have laws that govern our behaviour in personal and business settings.
>
> ### Knowledge-based trust (experience)
>
> This level of trust means that I have had enough experience with you and
> knowledge of your behaviour that I have a pretty good idea of how you will
> react and behave in relationship with me. We have had enough interactions over
> time where there has been a consistent display of trustworthy behaviour that I
> believe I can trust you with the everyday type issues we experience together.
>
> ### Identity-based trust (identity)
>
> This level of trust means that you know my hopes, dreams, goals, ambitions,
> fears, and doubts. I trust you at this level because over the course of time I
> have increased my level of transparency and vulnerability with you and you
> haven’t taken advantage of me. You have proven yourself to be loyal,
> understanding, and accepting.
>
> <footer class="ph">
>
> –
> [http://www.leadergrow.com/articles/01-degrees-of-trust](http://www.leadergrow.com/articles/201-degrees-of-trust)
>
> </footer>

"Trusted Data", regardless the level of trust, is data you can rely on to
process information from, information used to gain knowledge, make decisions and
act upon.

## Trusted data

When we now have the terminology in order, what have others stated about this
term?

> ... the condition of trusted data is easily quantified. Namely, condition is a
> technical measurement of data’s completeness, quality, age, schema, profile,
> and documentation. The assumption is that trusted data should come from
> carefully selected sources, be transformed in accordance with data’s intended
> use, and be delivered in formats and time frames that are appropriate to
> specific consumers of reports and other manifestations of data.
>
> <footer class="ph">
>
> –
> [Russom, Philip - The Ramifications of Trusted Data](http://tdwi.org/articles/2010/11/04/experts-trusted-data.aspx)
>
> </footer>

Philip Russom describes "Trusted Data" as a concept that is easily quantified by
the conditions of the data. He quantifies that "Trusted Data" should:

1. Come from carefully selected sources
2. Be transformed in accordance with data's intended use
3. Be delivered in formats and time frames that are appropriate to the specific
   consumers

So "Trusted Data" will come from sources that you carefully select? Let us
explore this:

### What is a source?

> Definition: Any thing or place from which something comes, arises, or is
> obtained
>
> <footer class="ph">
>
> –
> [http://dictionary.reference.com/browse/source](http://dictionary.reference.com/browse/source)
>
> </footer>

{% figure
  description="Source-de-l'Orbe"
  src="<https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Source-de-l%27Orbe.jpg/640px-Source-de-l%27Orbe.jpg>"
%}

by
<a class="ph" href="//commons.wikimedia.org/wiki/User:Micha_L._Rieser" title="User:Micha L. Rieser">Micha
L. Rieser</a> - <span class="int-own-work" lang="en">Own work</span>. Licensed
under
<a class="ph" title="Creative Commons Attribution-Share Alike 3.0" href="http://creativecommons.org/licenses/by-sa/3.0">CC
BY-SA 3.0</a> via <a class="ph" href="//commons.wikimedia.org/wiki/">Wikimedia
Commons</a>.

{% /figure %}

A source could be a landscape, a scent, a taste, a book, a human, an API, a show
on the television. Sources can give erroneous data, so how can we trust a
source?

We can use the levels from the
<a class="ph" href="#deterence-based-trust-rules">previously mentioned
grouping</a> to view the selection premises:

#### Rules

"The API can only give us information about this customers pension because the
rules prohibit us to view another person's pension"

#### Experience

"We have experienced enough with the API that it always delivers the correct
data"

#### Identity

"We know that the API (and the provider) is trustworthy of reputation and brand"

But these trust levels could apply to sources we already have used, what do we
do with new sources? How can we verify sources to use them, and in the long run,
trust them?

The validity of sources is only as valid as the data given. In the science
terminology, reliability is a factor. If the same data can be reproduced, the
data is reliable. But what about verifying the data?

### Verification of data

The validity of data is often verified by several sources. In the social realm
and the interaction between humans, i.e. communication, the validation of data
is often done by confirmation: "Did you guys see that?", "Yes".

Who lied? Did anyone lie? How can we be certain? If the verification is done by
a human, and the sensory input to a human in combination with how logical the
human's thought process is and the fact that humans
<a class="ph" target="_blank" rel="noopener noreferrer" href="https://en.wikipedia.org/wiki/Jumping_to_conclusions">jump
to conclusions</a> ( fills in the blanks ), there will always be uncertainty.

Some data collected from digital sources can be verified by other data from
digital or analogue sources. For example, a registered birthdate on a family
member in an on-line family tree can be verified against the state record.

But if we validate fake data against fake data, how are we going to actually
have data we can trust?

### Examples of erroneous data

There are many, far too many, examples on erroneous data:

#### In genealogy

{% figure
  description="Photo of the Eikeland family tree"
  src="/img/blog/1522837_10153741673415125_1361780963_o.webp"
%}

by <span class="fn value">Alexander Vassbotn Røyne-Helgesen
([https://phun-ky.net](https://phun-ky.net))</span>. Licensed under Attribution
International via [Commons](http://creativecommons.org/licenses/by/4.0/).

{% /figure %}

The longer back you research in genealogy, there are fewer or no decent and
verified sources. Family trees can be based on other family trees that have
erroneous data or no sources. Data about families can be deliberately falsified
to preserve family ties, heirship and power. Family conflicts can sever a whole
lineage due to the wrong religion.

When old church books are transcribed, often digitally (by OCR scanning) or by a
human, letters and text can be interpreted wrong.

#### Maps

In the 16th and 17th century, the time before Google Maps and GPS, when the
Earth was not fully mapped, the cartographers that created maps for the
seafarers could for example depict sea monsters on the map. This was based on
myths and legends, folklore and what the people in that time did not fully
understand. But later in the 17th century, the monsters vanished, relative to
the scientific progress of the time.

{% figure
  description="Carta Marina"
  src="<https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Carta_Marina.jpeg/640px-Carta_Marina.jpeg>"
%}

by
<a class="ph" href="//en.wikipedia.org/wiki/Olaus_Magnus" class="extiw" title="w:Olaus Magnus">Olaus
Magnus</a> -
[http://www.npm.ac.uk/rsdas/projects/carta_marina/](http://www.npm.ac.uk/rsdas/projects/carta_marina/)
"Carta Marina satellite images". Licensed under Public Domain via
[Commons](https://commons.wikimedia.org/wiki/).

{% /figure %}

In these modern times, we rarely find these data anomalies (or abnormalities),
due to satellite mapping and greater understanding. One of these rarities was
the
<a class="ph" target="_blank" rel="noopener noreferrer" href="http://www.strangerdimensions.com/2012/11/26/google-maps-anomaly-the-lost-island/">Google
Maps anomaly</a>, an unknow island appeared on Google Maps.
<a class="ph" target="_blank" rel="noopener noreferrer" href="http://edition.cnn.com/2012/11/23/travel/scientists-undiscover-south-pacific-island/index.html">This
was later undiscovered</a>.

#### Information Technology (IT)

Within IT, were handling of data could be crucial for the business, we find
several examples with erroneous data. One good example is the
<a class="ph" target="_blank" rel="noopener noreferrer" href="http://hackingdistributed.com/2013/01/29/mongo-ft/">MongoDB
Fault Tolerance</a>. MongoDB did not save data when instructed and then reported
that the data got saved. This resulted in incomplete data-sets.

### What makes data untrustworthy?

We all process data, in our jobs, in our lives, every day. We can verify the
data we collect through sources. We can trust the source itself or verify the
data from other sources. But what makes data untrustworthy?

The human factors are also relevant here. We are not perfect. We make mistakes.
We are all individuals with our own unique thought patterns. We perceive things
differently, we fill in the blanks, interpret things. We forget. We are blind,
deaf, near-sighted, long-sighted, colour-blind. We have hidden agendas,
political views, personal views, religious views. All of this are factors in how
humans perceive, interpret and relay data.

We have technical factors when it comes to relaying and collecting data; Phone
lines could be down, the mail could not be delivered. With digital data, we
could have charset errors, disk crashes, network issues, bugs et al. These
factors can delete data, let data never be collected, saved or relayed.

There are may factors to consider when we deem data untrustworthy. Risks in
particular.

### What risks are involved when we have untrustworthy data?

{% figure
  description="Man highlining in Yosemite National Park with El Capitan in the background"
  src="<https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Man_highlining_in_Yosemite_National_Park_with_El_Capitan_in_the_background.JPG/640px-Man_highlining_in_Yosemite_National_Park_with_El_Capitan_in_the_background.JPG>"
%}

by
<a class="ph" href="//commons.wikimedia.org/wiki/User:Liannadavis" title="User:Liannadavis">LiAnna
Davis</a> - <span class="int-own-work" lang="en">Own work</span>. Licensed under
<a class="ph" title="Creative Commons Attribution-Share Alike 3.0" href="http://creativecommons.org/licenses/by-sa/3.0">CC
BY-SA 3.0</a> via [Commons](https://commons.wikimedia.org/wiki/).

{% /figure %}

The risks involved with untrustworthy data could be sectioned into groups
depending on the impact of these risks.

#### Low impact risks

Low impact risks are risks that has little or no effect in the surrounding
context.

Personal risks could be:

- Dead link to web page
- Wrong reference to a book in a library
- Wrong TV-program according to the TV-schedule
- Missed the bus due to old bus schedule

Health risks could be:

- Light injury because of missing warning signs

#### High impact risks

High impact risks are risks that has large effect in the surrounding context, a
game-changer you might say.

Social risks coud be:

- Loss of friendship
- Bullying

Economical risks could be:

- Big loss of profit in the stock market due to false reports on yield
- Bankruptcy of businesses

Political risks could be:

- War
  - <a class="ph" target="_blank" rel="noopener noreferrer" href="https://news.vice.com/article/the-cia-just-declassified-the-document-that-supposedly-justified-the-iraq-invasion">US
    invasion of Iraq in 2003</a>
- Country instability

Health risks could be:

- Death
- Severe injury
- Terminal illness

{% message type="warning" %}

This risk/impact grouping is not based on any empirical or statistic data, but a
rough grouping by the author.

{% /message %}

The grouping above is just a small collection of risks related to untrustworthy
data. Data that is erroneous when relayed. But what about the interpretation of
data. Could "Trusted Data" be interpreted differently?

### Interpretation of data

When we observe or collect data, we also process it. A part of the process is
the interpretation of data. We try to figure out the meaning of the data from
our own unique understanding. This is the basis of that perspective and how we
interpret data.

> A programmer is going to the grocery store and his wife tells him, "Buy a
> gallon of milk, and if there are eggs, buy a dozen." So the programmer goes,
> buys everything, and drives back to his house. Upon arrival, his wife angrily
> asks him, "Why did you get 13 gallons of milk?" The programmer says, "There
> were eggs!"
>
> <footer class="ph">
>
> –
> [https://www.reddit.com/r/Jokes/comments/1nmkfq/a_programmer_is_going_to_the_grocery_store/](https://www.reddit.com/r/Jokes/comments/1nmkfq/a_programmer_is_going_to_the_grocery_store/)
>
> </footer>

{% figure
  description="Quarts of milk"
  src="<https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Quarts_of_milk_%285092042245%29_%283%29.jpg/640px-Quarts_of_milk_%285092042245%29_%283%29.jpg>"
%}

by
<a rel="nofollow" class="ph external text" href="https://flickr.com/people/24431382@N03">Eric
Fischer</a> -
<a rel="nofollow" class="ph external text" href="https://flickr.com/photos/walkingsf/5092042245/">Quarts
of milk</a>. Licensed under
<a class="ph" title="Creative Commons Attribution 2.0" href="http://creativecommons.org/licenses/by/2.0">CC
BY 2.0</a> via <a class="ph" href="//commons.wikimedia.org/wiki/">Wikimedia
Commons</a>.

{% /figure %}

To sum this up progammatically:

```javascript
var milk = require('milk');
var customer = require('customer');
var store = require('grocery-store');

if (store.gotEggs()) {
  // Buy 12 gallons
  customer.buy().product(milk).quantity(12).unit('gallon');
} else {
  // By one gallon
  customer.buy().product(milk).quantity(1).unit('gallon');
}
```

The programmer interpreted the information in another way that his wife
expected. You can argue extensively about why he interpreted it that way, but
that is how we humans work. We interpret things differently. We have our own
unique understanding about everything.

The wife, obviously for most people, assumed that the message was interpreted
the same way she did. She assumed that her husband had the same understanding of
what she asked. The data was interpreted differently.

But we can interpret this example even further:

```javascript
var milk = require('milk');
var customer = require('customer');
var store = require('grocery-store');

// Buy one gallon
customer.buy().product(milk).quantity(1).unit('gallon');

if (store.gotEggs()) {
  // 12 more gallons
  customer.buy().product(milk).quantity(12).unit('gallon');
}
```

See what happened here?

<code class="ph">"Buy a gallon of milk, <strong class="ph">and</strong> if there
are eggs, buy a dozen."</code>

The data was the same, the interpretation were different. This is the
interpretation that the wife expected:

```javascript
var eggs = require('eggs');
var milk = require('milk');
var customer = require('customer');
var store = require('grocery-store');

// Buy one gallon
customer.buy().product(milk).quantity(1).unit('gallon');

if (store.gotEggs()) {
  // 12 eggs
  customer.buy().product(eggs).quantity(12).unit('pieces');
}
```

## A final word

We have now gone through the term "Trusted Data", but how do you work with the
data that you want to be trustworthy?

The next article will cover these areas. It will hopefully give a good grasp on
how to work with data, and how we make sure it can be trustworthy.

This article tried to reflect upon the definition of "Trusted Data", examples on
how data can be false and how correct and false data can be interpreted in
different ways.
