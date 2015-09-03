---
layout: post
title: "Trusted data"
description: ""
category: "Technology"
tags: [trusted data, data]
---
{% include JB/setup %}

During my life so far, I've dealt with several hundres of data sources, in my professional life as a developer and in my every day life. 

2. What is trust? http://en.wikipedia.org/wiki/Trust_%28social_sciences%29
1. What is data?
3. Sender - Message - Reciever. ( perception, forståelse, oppfattelse, enighet, danne et bilde av, kontekts)
4. False data from sender
5. Data get falsyfied during transport
6. Data is interpreted falsy
7. The understanding/perception ( see point 3 ) of the data is wrong
8. Data is stored falsly
1. Sources are verified falsly
1. false sources
1. include something about data collection/gathering/statistics/processing/extrapolation+++

## What makes data untrustworthy?

false/incomplete/inaccurate/missing data

human factor

Humans are not perfect, we err. input error, perception error, refusal, hidden agenda, political views, personal views, religious views, obstacles in transportation ( messenger detainer/killed/delayed )

technical factor

validation, charset errors, saving errors, disk errors, transportation is slow, postponed, aborted. 

natural factors

flash fires, tsunami, power outage, electro-magnetic storm (yeah, it can happen)

library of alexandria

## What risks are involved when we have false data?

political risks
health risks
social risks
economical risks


Sources
* sources that produces false data
* sources that relay false data

transportation of false data
transportation causes false data

receiving false data
processing false data
storing false data

rinse and repeat.

shit in, shit out

coding errors, bugs, false positive

Trusted data. Can we really trust data?

Information is processed data

But what if the data if wrong? falsy? misleading? 

Can we trust an API service?

* secure?
* wrong data?
* saving error?
* hijacking?

Can we trust the media?

* Propaganda
* "acknowledged truths"
* north korea

In the old days, maps

* Borders that does not exist
* lands/countries that does not exist
* old maps with blank areas

Modern maps

* THe issue where google maps reported an island, but no island was found


Can we trust the delivery boy? / Can we trust the transportation of data?

* Hijacking

## Interpretation of data

> A programmer is going to the grocery store and his wife tells him, "Buy a gallon of milk, and if there are eggs, buy a dozen." So the programmer goes, buys everything, and drives back to his house. Upon arrival, his wife angrily asks him, "Why did you get 13 gallons of milk?" The programmer says, "There were eggs!"

To sum this up progammatically:

<script src="https://gist.github.com/phun-ky/b370ff37443c698ce285.js"></script>

The programmer interpreted the information in another way that his wife expected. You can argue exetnsively about why he interpreted it that way..

The wife, obviously for some people...

But we can interpret this example even further:

<script src="https://gist.github.com/phun-ky/655ae6c9f29ce544069b.js"></script>

See what happened here? `"Buy a gallon of milk, _and_ if there are eggs, buy a dozen."`. The data was the same, the interpretation were different. What the wife expected:

<script src="https://gist.github.com/phun-ky/e0022044fbb3da07d0e1.js"></script>

Can we trust a CDN?
Can we trust the backend guys?
Can we trust the author of a book?

## Approaches?

### Trust no-one, be skeptic to everything

### Trust everything, be skeptic to everything

## Can we trust the genealogist? 

* To many similar names out of families
* Few or no decent, verified sources
* Family trees are based on family trees with errors/no sources

church records/ local records

* Data that is deliberately falsly added to make sure noone knows about the child is born out of wedlock
* Family conflicts
* Fake names


scanned old books/old books
* scanning OCR identifies text wrong
* reports containing errors
* storage of books in the wrong shelf
* Storage of wrong data

pedigree

* To preserve nobility, fake claims of heirship
* To preserve power within royal family, fake claims of heritage
* To stop scandals with childs born out of wedlock
* To stop scandals with adoptive children

The validity of data is often verified by several sources, "did you guys see that? " "yes" ( who lied? did anyone lie? )

but then again, the verification is done by a human, and the sensory input to a human in combination with how logical the human's though process is and the fact that humans jump to conclusions ( fills in the blanks ), perception +++ there will always be uncertainty. "seeing is believing" "i thought i left the keys over there"

so, we can perhaps break down the process, and make the assimilation of data more understandable, regardless of the subject verifying/perceiving the data?

data is produced/created/saved/spoken/viewed
data is viewed
data is registered/listened to
data is perceived/assimilated ( oppfattet ) 
data is information

step 4 is vital, if two subjects perceive data differently, how can it be verified?

(sender mottager budskap oppfattelse)


http://credibility.stanford.edu/
http://hearusnow.org/
http://en.wikipedia.org/wiki/TrustRank

SSL sertificates from false sources, (mention a case in the media about this): http://nakedsecurity.sophos.com/2013/12/09/serious-security-google-finds-fake-but-trusted-ssl-certificates-for-its-domains-made-in-france/

## The human nature

photoshopped images in news stories
fake quotes from famous people

Seeing is believing.

have faith.

you cant trust data, but you can put some effort into validating data.

Level of trust



## Explain

### What is trust?

>In a social context, trust has several connotations. Definitions of trust typically refer to a situation characterized by the following aspects: One party (trustor) is willing to rely on the actions of another party (trustee); the situation is directed to the future. In addition, the trustor (voluntarily or forcedly) abandons control over the actions performed by the trustee. As a consequence, the trustor is uncertain about the outcome of the other's actions; they can only develop and evaluate expectations. The uncertainty involves the risk of failure or harm to the trustor if the trustee will not behave as desired.

...

>When it comes to the relationship between people and technology, the attribution of trust is a matter of dispute. The intentional stance demonstrates that trust can be validly attributed to human relationships with complex technologies. However, rational reflection leads to the rejection of an ability to trust technological artefacts.

Examples here in this link is more abstract kind of trust: http://www.leadergrow.com/articles/201-degrees-of-trust

Leading with trust describes 3 levels of trust: http://leadingwithtrust.com/2011/06/06/three-levels-of-trust-what-level-are-your-relationships/

#### deterence-based trust (rules):

>Deterence-based trust means that there are rules in place that prevent one person from taking advantage of, or harming another person. In society we have laws that govern our behavior in personal and business settings. 

You will not kill me, since it's a crime

#### knowledge based trust:

>This level of trust means that I’ve had enough experience with you and knowledge of your behavior that I have a pretty good idea of how you will react and behave in relationship with me. We’ve had enough interactions over time where there has been a consistent display of trustworthy behavior that I believe I can trust you with the everyday type issues we experience together.

I have experienced enough with you to trust you

#### Identity based trust:

> This level of trust means that you know my hopes, dreams, goals, ambitions, fears, and doubts. I trust you at this level because over the course of time I have increased my level of transparency and vulnerability with you and you haven’t taken advantage of me. You’ve proven yourself to be loyal, understanding, and accepting.

Basically, i know who you are, so i trust you

### What is data?

> Data as an abstract concept can be viewed as the lowest level of abstraction, from which information and then knowledge are derived.

> The word data is the traditional plural form of the now-archaic datum, neuter past participle of the Latin dare, "to give", hence "something given". In discussions of problems in geometry, mathematics, engineering, and so on, the terms givens and data are used interchangeably. This usage is the origin of data as a concept in computer science or data processing: data are accepted numbers, words, images, etc.

http://en.wikipedia.org/wiki/Data

### What is information?

> ... users of dictionaries need to make in order to, first, find the data sought and, secondly, understand the data so that they can generate information. http://en.wikipedia.org/wiki/Information

Information is processed data.

> the collection and manipulation of items of data to produce meaningful information."[1] In this sense it can be considered a subset of information processing, "the change (processing) of information in any manner detectable by an observer." [note 1]

### What is a source?

> Definition: Any thing or place from which something comes, arises, or is obtained


technical fixes for some areas

user input: sanitazion of data, validation of data
security: chain of trust ( but we cant all be in a chain of trust )

> The assumption is that trusted data should come from carefully selected sources, be transformed in accordance with data’s intended use, and be delivered in formats and time frames that are appropriate to specific consumers of reports and other manifestations of data. 
Philip Russom, November 4, 2010 http://tdwi.org/articles/2010/11/04/experts-trusted-data.aspx

Achieving trustworthiness for data is a multi-step process:

> Select sources that are appropriate, certified, and diverse
Process data to transform and aggregate it for the intended use, improve its quality, and enhance its meta and master data
Collaborate cross-functionally and govern data for compliance
Deliver data in the right time frame, in forms suited to its intended use.
2010 http://tdwi.org/articles/2010/11/04/experts-trusted-data.aspx

Accuracy of data

Data-agreement between countries (storebrand, ukraina)
safe harbour
cookies
ads from cookies

wifi hijacking of customers making payments through fake webpage ( coffeshop/man in the middle )

What impact does trusted data have on consumers?
businesses?
technology?
science? ( higgs boson) (proton spikes???)


How can we verify data? how can we make data trusted?

>  The best way to find out if you can trust somebody is to trust them. Ernest Hemingway

Data is not trusted, until you trust them.

Verification from multiple sources ( som krysspeiling i navigasjon )

Verified sources

You can never have 100% correct, verified data you can trust



why would untrusted data stand out as trusted data? how can false data be perceived as trusted data? how can false/unverified/untrusted sources be percevied as trusted sources?


## from: http://credibility.stanford.edu/

What causes people to believe (or not believe) what they find on the Web?

What strategies do users employ in evaluating the credibility of online sources?

What contextual and design factors influence these assessments and strategies?


## How to work with data

### Data

### Products

### Sources

### Verification and validation

### Trust