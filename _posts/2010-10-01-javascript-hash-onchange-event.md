--- 
layout: post 
title: "Javascript Hash onChange event"
description: ""
category: "Archive"
tags: []
---
{% include JB/setup %}  
A pretty nifty solution to bind an event (err) to the window.location.hash string.

<pre>var onHashChange = function(event) {
  //get hash function
  var getHashValue = function() {
    var arr = window.location.hash.split('#');
   var hasValue = arr[1];
   //sets default
   if (typeof hasValue == 'undefined') {
      return false;
    }

   var hashLen = hasValue.indexOf('?');
   if(hashLen>0){
     hasValue = hasValue.substring(0,hashLen);
    }
    return hasValue;
 }

 //last hash
  var lastHash = getHashValue();

  //checker
  (function watchHash() {
    var hash = getHashValue();

    if (hash !== lastHash) {
     event();
     lastHash = hash;
   }

   var t = setTimeout(watchHash, 100);

 })();
} 

onHashChange(function() {
  // your code here
};</pre>


*AND YES*, this is supported in all the latest browsers!A pretty nifty solution to bind an event (err) to the window.location.hash string.

<pre>var onHashChange = function(event) {
 //get hash function
  var getHashValue = function() {
    var arr = window.location.hash.split('#');
   var hasValue = arr[1];
   //sets default
   if (typeof hasValue == 'undefined') {
      return false;
    }

   var hashLen = hasValue.indexOf('?');
   if(hashLen>0){
     hasValue = hasValue.substring(0,hashLen);
    }
    return hasValue;
 }

 //last hash
  var lastHash = getHashValue();

  //checker
  (function watchHash() {
    var hash = getHashValue();

    if (hash !== lastHash) {
     event();
     lastHash = hash;
   }

   var t = setTimeout(watchHash, 100);

 })();
} 

onHashChange(function() {
  // your code here
};</pre>


*AND YES*, this is supported in all the latest browsers!