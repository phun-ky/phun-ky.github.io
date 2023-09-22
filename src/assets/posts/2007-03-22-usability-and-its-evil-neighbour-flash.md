---
layout: post

route: /2007/03/22/usability-and-its-evil-neighbour-flash
title: 'Usability and its evil neighbour, flash'
description: ''
category: 'Archive'
tags: [usability, flash, ux, accessibility]
---

I read an article posted by Kyle Neath on Warpspire about his
<a class="ph" target="_blank" rel="noopener noreferrer" href="http://warpspire.com/journal/web-production/standards-nazi-transforming/">metamorphosis
from beeing a standard nazi</a> to be more open minded for Flash applications.
He mentions some pointers towards HTML, CSS and JavaScript's issue with not
beeing compliant enough towards browsers. Nothing wrong witht that, but when I
read that they are going to use Flash over HTML, one of my eyebrows rose in
speculation.

After I read the article I clicked onwards to another article at danwebb.net
where Dan Webb ( naturally ) posted his views on
<a class="ph" target="_blank" rel="noopener noreferrer" href="http://www.danwebb.net/2007/3/20/flash-vs-ajax-it-s-time-to-expand-your-toolbox">flash
vs ajax</a> after the SXSW. He was enlightened after a panel session where
Jonathan Boutelle discussed the topic
<a class="ph" target="_blank" rel="noopener noreferrer" href="http://2007.sxsw.com/interactive/programming/panels/?action=show&id=IAP060113">Ajax
or Flash: What's right for you?</a>. The talk was basically about the relative
advantages of each platform. But that is not the thing I would like to point at.
The notable from this article is Dan's reasons for losing interest in Flash:

- Monolithic applications: Flash apps tend to exist at one URL, fail to respond
  to the back button well and generally work within their own environment in the
  browser rather than working with the browser.
- Bad programming environment: Working on a Flash app with more than one person
  was always a pain in the arse. Because a lot of the app was contained inside
  one or more FLA files which could only be opened by one person at a time and
  it was a binary file version control was a pain.
- Controls didn't work enough like browser controls: The in-built components
  helped a bit but Flash select boxes, scroll bars and other widgets just didn't
  look or act the same. Bad for usability.
- Accessibility no-no: Previously SWFs where essentially a black box to
  assistive technologies and event MX components seemed to have trouble with
  keyboard focus and tabbing. \* Limited and tedious interface with JavaScript:
  Getting data in and out of the SWF was possible but never easy.
- ActionScript is heading toward Java: Oh man, don't get me started. As
  ActionScript develop it becomes less and less dynamic. You get native classes
  and packages but type annotations? I suppose you get a performance boost but
  really. Static types are for stupid people... We don't need em
- It's not open source

Yes, if you read his whole article he also states that many of these reasons
"..are solvable, avoidable or have been solved recently", no doubt about that,
but could it be to late? Personally I loath Flash, I think it's pretty limiting
towards usability, scalability and so on. But (!), my second opinion is that you
can implement Flash as much as you like, if you can do it correctly,
semantically and if you can provide the same data for users who don't have
Flash.

See my article about
<a class="ph" href="/2007/02/09/xhtml-javascript-flash-validated/">XHTML
JavaScript flash validated</a> for a clue about this. Also have a look at Kyle's
<a class="ph" target="_blank" rel="noopener noreferrer" href="http://warpspire.com/journal/web-production/7-flash-myths/">myth
buster for Flash myths</a>. The guys at space150 also got something for helping
Flash to rise to
<a class="ph" target="_blank" rel="noopener noreferrer" href="http://blog.space150.com/2007/1/11/faust-flash-augmenting-standards">comply
with web standards</a>.

In Dan's article I noticed a comment entry that pinpoints - in relation to the
article - exactly why so many visual effects are creating idiotic obstacles for
many readers:

> Fundamentally, the point of web site development (with the exception of cheap
> games and other amusements) is to get information into the hands of people. If
> I'm a potential customer, and I can't use your web site, I'm not going to buy
> from you. If it's twice as pretty, or half as pretty, it doesn't really matter
> all that much, except to graphic designers such as yourself. With Flash,
> you're fundamentally excluding a huge chunk of your customer base. If a
> customer doesn't have Flash installed, your web site doesn't work, and they'll
> go to a competitor.
>
> Lots of people don't have Flash installed. Corporate locked-down network? No
> Flash. Clueless user with a new computer? No Flash. Thin device like a smart
> cell phone/PDA? No Flash. People who like all free software? No Flash.
>
> Google also won't index your content if it's all hidden in Flash.
>
> You've also got the whole issue of disabled people - people with worst
> eyesight (including most elderly) have systems configured bigger font sizes.
> Blind people use screen readers. Will your Flash application support that? I
> don't know if Flash can't, or if most of the Flash out there doesn't, but in
> most cases, your disabled customers are left out. Operating in a region with
> strong disabled protection laws? Then you've also got a lawsuit waiting to
> happen.
>
> AJAX, for all its flaws, works in any browser, for any customer. If it's done
> right, it even works on cell phones and other devices without AJAX capability
> (menus just don't pop down - users need to click). It is indexable by Google.
> People can save a page to disk or print it.
>
> With Flash, your web site ends up prettier, but you fundamentally lose a bunch
> of customers. It's a horrible trade-off for anything other than ads and
> on-line games. You're even better off with something as crude as HTML 2.0, as
> compared to Flash.

Just about to the point when it comes to the Flash but, AJAX has unfortunately
gotten more and more popular on the web, not due to it's lack of bad semantics
or the trouble tracking hits when it's used, but due to the fanciness of it. It
has a "schwung" to it.
