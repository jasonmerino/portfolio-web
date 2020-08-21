---
type: "article"
path: "/til-destructuring-function-arguments-in-javascript"
title: "TIL: Destructuring function arguments in JavaScript"
metaTitle: "Today I learned how to destructure function arguments in JavaScript"
metaDescription: ""
date: "2016-07-22"
twitterImage: ""
tags:
  - JavaScript
  - ES6
---

# TIL: Destructuring function arguments in JavaScript

So check this out! If you have a function that accepts an object as an argument and you don't want pull each of the properties of that argument out one by one, what a hassle, right?, you can destructure the argument in the function argument signature to access each of the arguments properties directly.

Here it is in action.

```ts
// the arguments below are the destructured parts
// notice how there's what looks like an object in the parens
function printDestructuredArgument({ one, two }) {
  console.log(one); // option one
  console.log(two); // option two
}

const args = {
  one: "option one",
  two: "option two",
};

printDestructuredArgument(args);
```

How cool is that?!
