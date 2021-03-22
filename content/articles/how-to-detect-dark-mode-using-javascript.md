---
type: "article"
path: "/how-to-detect-dark-mode-using-javascript"
title: "How to Detect Dark Mode Using JavaScript"
metaTitle: "How to Detect Dark Mode Using JavaScript"
metaDescription: "Learn how to detect if your users operating system is using dark mode or not."
date: "2021-03-18"
twitterImage: ""
tags:
  - JavaScript
---

Detecting dark mode for your website with JavaScript today is simple and straight forward. You can use the following JavaScript method to check if the users operating system is using dark mode or not.

```js
window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
```

The first part of this uses code makes sure that `matchMedia` is a function on the `window` object and then follows it up by evaluating a media query to see if it matches. You could easily add this snippet to an if statement or return the result of this from a function.

```js
// Use it stand-alone in an if statement
if (
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
) {
    // handle dark mode
}

// OR...

// wrap it up in a function for better reuse
const isDarkMode = () => {
    return window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
}

if (isDarkMode()) {
    // handle dark mode
}
```

Either way you want to play your cards, now you can easily detect if your users have dark mode enabled or not.

Next, you may be thinking that you also want to listen for changes from dark to light or light to dark mode so that your website's theme can react accordingly. That's also possible! 

```js
window
    .matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', event => {
        const isDarkMode = event.matches;
        // do something with the change
    });
```

Based on this change you could set a class on the `body` element of your page to change the website's theme, or dispatch a Redux action to save the dark or light mode state and act upon it elsewhere in your app's code. 

Unfortunately, watching for changes in your users light or dark mode, or even detecting it, is not fool-proof yet. There are some browsers that still do not support the `prefers-color-scheme` media query. To see which browsers support or don't support this media query you can check out the table at [Can I Use?](https://caniuse.com/?search=prefers-color-scheme).
