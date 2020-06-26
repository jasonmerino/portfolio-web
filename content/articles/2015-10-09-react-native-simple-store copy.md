---
type: "article"
path: "/articles/react-native-simple-store"
title: "React Native Simple Store"
description: ""
date: "2015-10-09"
twitterImage: ""
---

I just recently started working with React Native and right away I had a use for the AsyncStorage utility. The folks at Facebook suggest that you wrap AsyncStorage if you are going to be using it extensively since it operates globally. Here's what it says in the docs.

It is recommended that you use an abstraction on top of AsyncStorage instead of AsyncStorage directly for anything more than light usage since it operates globally.

So I began looking for a good abstraction library for AsyncStorage. After looking through a few different libraries it was immediately apparent that the data I wanted to store didn't necessitate the level of abstraction and structure that the existing libraries provided. Really what I needed was a simple key-value store which intelligently serialized and deserialized the given data (whether string, object, array, etc) and *always* returned a promise.

So I begin writing what is now called [react-native-simple-store](https://www.npmjs.com/package/react-native-simple-store). It is, as it says in the README, a minimalistic wrapper around React Native's AsyncStorage..

It has four simple methods .save, .get, .update, and .delete. It automatically JSON stringifies and JSON parses the results from AsyncStorage. It consistently returns a promise, just like AsyncStorage does. And if you have an object stored as the value for a certain key and you call .update on it the react-native-simple-store will merge the new object values with the old ones.

Here is some sample usage of the library.

```js
var store = require("react-native-simple-store")

store
  .save("coffee", {
    isAwesome: true,
  })
  .then(() => {
    return store.get("coffee").then(coffee => {
      console.log(coffee.isAwesome === true) // true
    })
  })
  .then(() => {
    return store.update("coffee", {
      isNotEssential: false,
    })
  })
  .then(() => {
    return store.get("coffee")
  })
  .then(coffee => {
    console.log(coffee.isNotEssential === false) // true
    console.log(coffee.isAwesome === true) // true

    return store.delete("coffee")
  })
  .then(() => {
    store.get("coffee").then(coffee => {
      console.log(coffee === null) // true
    })
  })
```

The react-native-simple-store is delightfully easy to use with a completely understandable API. Hope you enjoy using it. Feel free to drop any suggestions or problems you find in [issues section of the repo](https://github.com/jasonmerino/react-native-simple-store/issues).
