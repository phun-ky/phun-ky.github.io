---
layout: post
title: "Trusted data"
tagline : "What is trusted data, and how to work with it"
description: "What is trusted data, and how to work with it"
category: "Technology"
tags: [trusted data, data]
---
{% include JB/setup %}

https://hbr.org/2012/04/good-data-wont-guarantee-good-decisions

During any interaction with any data..

Tons of data, what to do

BIG data

"the ability to gather, store, access, and analyze"

<img src="https://upload.wikimedia.org/wikipedia/commons/9/9b/Social_Network_Analysis_Visualization.png" class="img-responsive img-thumbnail img-rounded"/>

## Introduction

To get a better grasp of the concept of trusted data...



### What is trust?

The definition of trust.


>In a social context, trust has several connotations. Definitions of trust typically refer to a situation characterized by the following aspects: One party (trustor) is willing to rely on the actions of another party (trustee); the situation is directed to the future. In addition, the trustor (voluntarily or forcedly) abandons control over the actions performed by the trustee. As a consequence, the trustor is uncertain about the outcome of the other's actions; they can only develop and evaluate expectations. The uncertainty involves the risk of failure or harm to the trustor if the trustee will not behave as desired.

The definition of trust regarding relationship between people and technology is..

>When it comes to the relationship between people and technology, the attribution of trust is a matter of dispute. The intentional stance demonstrates that trust can be validly attributed to human relationships with complex technologies. However, rational reflection leads to the rejection of an ability to trust technological artefacts.

https://en.wikipedia.org/wiki/Trust_%28social_sciences%29

#### Levels of trust

Examples here in this link is more abstract kind of trust: http://www.leadergrow.com/articles/201-degrees-of-trust

Leading with trust describes 3 levels of trust: http://leadingwithtrust.com/2011/06/06/three-levels-of-trust-what-level-are-your-relationships/

#### Deterence-based trust (rules):

>Deterence-based trust means that there are rules in place that prevent one person from taking advantage of, or harming another person. In society we have laws that govern our behavior in personal and business settings. 

You will not kill me, since it's a crime

#### Knowledge based trust:

>This level of trust means that I’ve had enough experience with you and knowledge of your behavior that I have a pretty good idea of how you will react and behave in relationship with me. We’ve had enough interactions over time where there has been a consistent display of trustworthy behavior that I believe I can trust you with the everyday type issues we experience together.

I have experienced enough with you to trust you

#### Identity based trust:

> This level of trust means that you know my hopes, dreams, goals, ambitions, fears, and doubts. I trust you at this level because over the course of time I have increased my level of transparency and vulnerability with you and you haven’t taken advantage of me. You’ve proven yourself to be loyal, understanding, and accepting.

Basically, i know who you are, so i trust you


### What is data?

Suman Deb Roy and Wenjun Zeng defines, in their book "Social Multimedia Signales: A Signal Processing Approach to Social Network", data as:

> ... an abstract concept can be viewed as the lowest level of abstraction, from which information and then knowledge are derived. 

### What is information?

> ... users of dictionaries need to make in order to, first, find the data sought and, secondly, understand the data so that they can generate information. http://en.wikipedia.org/wiki/Information

Information is processed data. Data proccessing:

> the collection and manipulation of items of data to produce meaningful information." In this sense it can be considered a subset of information processing, "the change (processing) of information in any manner detectable by an observer." 



### What is a source?

> Definition: Any thing or place from which something comes, arises, or is obtained

### What is interpretation of data?

Write something here

## Trusted data

> The assumption is that trusted data should come from carefully selected sources, be transformed in accordance with data’s intended use, and be delivered in formats and time frames that are appropriate to specific consumers of reports and other manifestations of data. 
Philip Russom, November 4, 2010 http://tdwi.org/articles/2010/11/04/experts-trusted-data.aspx


### What makes data untrustworthy?

false/incomplete/inaccurate/missing data

#### False data

Data that is intentively falsified to mislead

* Friend lying to another friend to conceal the real intent

#### Incomplete/Missing data

Data that is not there or incomplete

* UDP/TCP
* Page ripped out of a book
* Missing indexes
* Incomplete from an officer to a soldier

#### Inaccurate data

Data that is complete, not falsified, but is inaccurate in it's whole

* Statistics
* Witness statements

### Why can data be untrustworthy?

#### What is untrustworthy data?

#### Human factor

Humans are not perfect, we err. input error, perception error, refusal, hidden agenda, political views, personal views, religious views, obstacles in transportation ( messenger detainer/killed/delayed )

#### Technical factor

validation, charset errors, saving errors, disk errors, transportation is slow, postponed, aborted. 

bugs in software

MongoDB

#### Natural factors

flash fires, tsunami, power outage, electro-magnetic storm (yeah, it can happen)

library of alexandria - information lost

#### Sources

* sources that produces false data
* sources that relay false data



### What risks are involved when we have untrustworthy data?

The risks involved with false/wrongly interpreted data could be sectioned into groups depending on the impact of these risks.

<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Nik_Wallenda_walks_Baltimore.jpg/552px-Nik_Wallenda_walks_Baltimore.jpg" class="img-responsive img-thumbnail img-rounded"/>

asd

<figure>
  <table class="table table-striped table-responsive table-bordered">
    <thead>
      <tr>
        <th>
          Risk/impact
        </th>
        <th>
          Low
        </th>
        <th>
          High
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
          Personal
        </td>
        <td>
          <ul>
            <li>Wrong link to webpage</li>
            <li>Wrong reference to a book in a library</li>
            <li>Wrong TV-program according to the TV-schedule</li>
            <li>Missed the buss due to old buss schedule</li>
          </ul>
        </td>
        <td>
        </td>
      </tr>
      <tr>
        <td>
          Economical
        </td>
        <td>
        </td>
        <td>
          <ul>
            <li>Loss of profit in the stock market due to false reports on yield</li>
            <li>Bankrupcy</li>
            <li>Country debt (greece?)</li>
            <li>Inflation</li>
            <li>Bank issues resulting in bailouts</li>
          </ul>
        </td>
      </tr>
      <tr>
        <td>
          Health
        </td>
        <td>
          <ul>
            <li>Light injury at the workplace</li>
          </ul>
        </td>
        <td>
          <ul>
            <li>Death</li>
            <li>Terminal Illness</li>
            <li>Severe injury</li>
          </ul>
        </td>
      </tr>
      <tr>
        <td>
          Social
        </td>
        <td>
          <ul>
            <li>Loss of friendship</li>
          </ul>
        </td>
        <td>
        </td>
        <td>
        </td>
      </tr>
      <tr>
        <td>
          Political
        </td>
        <td>
        </td>
        <td>
          <ul>
            <li>War</li>
            <li>Instability</li>
            <li>Diplomacy issues</li>
          </ul>
        </td>
      </tr>
    </tbody>
  </table>
  <figcaption>
    <small>Table grouping for risk/impact when dealing with false/incomplete/corrupt data. <strong>Figure 2.4</strong></small>
  </figcaption>
</figure>

<div class="alert alert-info" role="alert">
  <em>This risk/impact grouping is not based on any imperical or statistic data, but a rough grouping by the author.</em>
</div>

### Verification

<div class="alert alert-danger" role="alert">
  Jeg vet ikke hvor dette passer inn..
</div>

#### Verification of sources

The validity of data is often verified by several sources, "did you guys see that? " "yes" ( who lied? did anyone lie? )

But then again, the verification is done by a human, and the sensory input to a human in combination with how logical the human's though process is and the fact that humans jump to conclusions ( fills in the blanks ), perception +++ there will always be uncertainty. "seeing is believing" "i thought i left the keys over there"

so, we can perhaps break down the process, and make the assimilation of data more understandable, regardless of the subject verifying/perceiving the data?

#### Verification of data

#### Examples of untrustworthy data

##### In genealogy

* To many similar names out of families
* Few or no decent and verified sources
* Family trees are based on family trees with errors/no sources
* Data that is deliberately falsly added to make sure noone knows about the child is born out of wedlock
* Family conflicts
* Fake names
* To preserve nobility, fake claims of heirship
* To preserve power within royal family, fake claims of heritage
* To stop scandals with childs born out of wedlock
* To stop scandals with adoptive children

##### Procuring of data

* Scanning OCR identifies text wrong
* Human transcripts old books wrong


##### Old maps

In the old days, maps, great sea monsters, terra incognita.

<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Carta_Marina.jpeg/640px-Carta_Marina.jpeg" class="img-responsive img-thumbnail img-rounded"/>

discovery of latin-america (india?)

legends, atlantis

* Borders that does not exist
* lands/countries that does not exist
* old maps with blank areas

##### Modern maps

* THe issue where google maps reported an island, but no island was found

http://www.strangerdimensions.com/2012/11/26/google-maps-anomaly-the-lost-island/

Undiscovered the island: http://edition.cnn.com/2012/11/23/travel/scientists-undiscover-south-pacific-island/index.html


transportation of false data
transportation causes false data

receiving false data
processing false data
storing false data


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



Can we trust the delivery boy? / Can we trust the transportation of data?

* Hijacking

## Interpretation of data

### Example

> A programmer is going to the grocery store and his wife tells him, "Buy a gallon of milk, and if there are eggs, buy a dozen." So the programmer goes, buys everything, and drives back to his house. Upon arrival, his wife angrily asks him, "Why did you get 13 gallons of milk?" The programmer says, "There were eggs!"

<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Quarts_of_milk_%285092042245%29_%283%29.jpg/640px-Quarts_of_milk_%285092042245%29_%283%29.jpg" class="img-responsive img-thumbnail img-rounded"/>

To sum this up progammatically:

<script src="https://gist.github.com/phun-ky/b370ff37443c698ce285.js"></script>

The programmer interpreted the information in another way that his wife expected. You can argue exetnsively about why he interpreted it that way..

The wife, obviously for most people, assumed that the message was interpreted the same way she did. She assumed that her husband had the same understanding of what she asked. The data was interpreted differently.

But we can interpret this example even further:

<script src="https://gist.github.com/phun-ky/655ae6c9f29ce544069b.js"></script>

See what happened here? `"Buy a gallon of milk, _and_ if there are eggs, buy a dozen."`. The data was the same, the interpretation were different. What the wife expected:

<script src="https://gist.github.com/phun-ky/e0022044fbb3da07d0e1.js"></script>


### False positives

Many things in the programming world could be true..

<script src="https://gist.github.com/phun-ky/98f6b1bc8211f39a211f.js"></script>

<script src="https://gist.github.com/phun-ky/2f10dfabec15b35174d7.js"></script>

Can we trust a CDN?
Can we trust the backend guys?
Can we trust the author of a book?

## Approaches?

### Trust no-one, be skeptic to everything

### Trust everything, be skeptic to everything



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







technical fixes for some areas

user input: sanitazion of data, validation of data
security: chain of trust ( but we cant all be in a chain of trust )



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


What impact does trusted data have on consumers?
businesses?
technology?
science? ( higgs boson) (proton spikes???)





why would untrusted data stand out as trusted data? how can false data be perceived as trusted data? how can false/unverified/untrusted sources be percevied as trusted sources?


## Credibility

The Stanford Web Credibility Research Project (part of <a href="http://captology.stanford.edu/">the Persuasive Technology Lab</a>) at Stanford University are investigating questions such as:

* What causes people to believe (or not believe) what they find on the Web?
* What strategies do users employ in evaluating the credibility of online sources?
* What contextual and design factors influence these assessments and strategies?

http://credibility.stanford.edu/


## How to work with data

This article tried to reflect upon the definition of trusted data, examples on how data can be falsy and how correct and false data can be interpreted in different ways. But the article does not provide any leads on how to act on this..

We begin with some key areas on how you can use, interact, process data

### Sources

Have you used the given source before? Have the source provided data that appeared to be usefull in the past? Have other parties used the source before? Are the sources credible?

Sources could be:

* Wife telling you what to get in the store
* The TV-schedule
* API-service
* Radio show host
* Newspapers
* Web site
* Church books
* Birth certificates
* The drug-addict relaying information on criminal activity


### Interpretation

Have you interpreted the data correctly? Could the data be interpreted in another way? Does the consumers of the data interpret it the same way? 

Which steps can the source (provider) of data take to achieve trust or both data and the source?

### Data





### Verification and validation

Can you verify your data? 

How can we verify data? how can we make data trusted?



Data is not trusted, until you trust them.

Verification from multiple sources ( som krysspeiling i navigasjon )

Verified sources

You can never have 100% correct, verified data you can trust

### Trust

>  The best way to find out if you can trust somebody is to trust them. Ernest Hemingway

In the end, you 