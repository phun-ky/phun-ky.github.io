---
route: /2014/03/23/how-to-rename-multiple-files-with-git-mv
title: 'How to rename multiple files with git mv'
description: 'I needed a solution where I had to rename multiple files with <code class="ph language-">git mv</code>, instead of renaming every file first, then use <code class="ph language-">git rm</code> and then <code class="ph language-">git add</code>. Came across a solution that I have tweaked to fit my need'
category: 'How-to'
tags: [git, rename, how-to]
---

```bash
# Rename multiple files
# http://www.24hourapps.com/2009/03/linux-tips-10-rename-multiple-files.html
# https://gist.github.com/alobato/397988
#
# Found the orignal gist very helpfull, and tweaked it to fit git mv

# First I suggest you test the outcome before you do the renaming, with a dry run (-n)

for f in $(git ls-files | grep %filestomatch%); do git mv -n "${f}" "${f/%filestomatch%/%newfilename_orlocation%}"; done;

# If you are happy with the result, execute ( remove -n )

for f in $(git ls-files | grep %filestomatch%); do git mv "${f}" "${f/%filestomatch%/%newfilename_orlocation%}"; done;

# It is quite a long command, but it basically executes a loop and tells it to take each f file
# name in the grepped result from git ls-files and give it a name where a match for %filestomatch% is replaced with %newfilename_orlocation%.
```
