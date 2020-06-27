---
type: "article"
path: "/til-run-scripts-after-npm-install-with-postinstall"
title: "TIL: Run scripts after npm install with postinstall"
metaTitle: ""
metaDescription: ""
date: "2017-05-25"
twitterImage: ""
---

So check this out! If you have a function that accepts an object as an argument and you don't want pull each of the properties of that argument out one by one, what a hassle, right?, you can destructure the argument in the function argument signature to access each of the arguments properties directly.

Here it is in action.

```
// the arguments below are the destructured parts
// notice how there's what looks like an object in the parens
function printDestructuredArgument({ one, two }) {
  console.log(one) // option one
  console.log(two) // option two
}

const args = {
  one: 'option one',
  two: 'option two',
}

printDestructuredArgument(args)
```

How cool is that?!
