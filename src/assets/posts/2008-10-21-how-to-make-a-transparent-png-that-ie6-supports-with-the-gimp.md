---
layout: post
route: /2008/10/21/how-to-make-a-transparent-png-that-ie6-supports-with-the-gimp
title: 'How to make a transparent png that IE6 supports with The Gimp'
description: ''
category: 'Archive'
tags: []
---

Quick short and simple!

1. Open the original image.

2. Set a proper background colour as oposed to it being transparent. It is best
   to make this colour similar to the background colour of the website to
   generate the antialiasing in your image borders in order for the image to
   blend nicely.

3. Flatten the image (Image - Flatten image).

4. Add an alpha channel (Layer - Transparency - Add alpha channel).

5. Select the background color (Selection - By color).

6. Clear the background colour (Edit - Clear).

7. Convert the image to indexed color (Image - Mode - Indexed color).

8. Save the image to the final PNG file (File - Save as) and remember to check:
   Save color values from transparent pixels.
