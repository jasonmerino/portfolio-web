---
type: "article"
path: "/til-how-to-get-a-specific-number-of-lines-above-and-below-a-matched-term-with-grep"
title: "TIL: How to get a specific number of lines above and below a matched term with grep"
metaTitle: ""
metaDescription: "Today I learned how to set the number of lines to show above and below a matching term when using grep."
date: "2016-05-04"
twitterImage: ""
---

## Back Story

I was trying to search through git logs to get a specific change that happened sometime in February to a specific file. I don't remember how to format git logs off the top of my head so I reached for grep. Unfortunately, I then remembered that the default grep only returns 1 line per match. I finally had to break down and figure out how to get a context for my grep.

What I found was that there is a -C [number] flag you can pass to your `grep` which will give you the number of lines above and below your match.

## The Solution

Here's what I ended up with.

```bash
git log -- package.json | grep Feb -C 3
```

## Bonus

If you leave off the number after -C it defaults to 2 (or at least on my MacBook Pro it does).

May the 4th be with you! Or happy Star Wars day. Whichever you prefer.
