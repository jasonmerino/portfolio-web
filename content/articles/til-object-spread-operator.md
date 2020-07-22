---
type: "article"
path: "/til-object-spread-operator"
title: "TIL: Object Spread Operator"
metaTitle: "Today I learned about the object spread operator in JS"
metaDescription: ""
date: "2015-12-11"
twitterImage: ""
---

The JavaScript spread operator is awesome! Previously when I wanted to merge two objects I would have to pull in [underscore](http://underscorejs.org/) or [lodash](https://lodash.com/) and do something like this.

```js
var obj = _.extend(objectOne, objectTwo, {
  customProp: "You better believe it!",
});
```

But now with the help of the wonderful [babel](https://babeljs.io/) compiler (along with the [stage-2 preset](http://babeljs.io/docs/plugins/preset-stage-2/)) I am able to do this for the same effect.

```js
var obj = {
  ...objectOne,
  ...objectTwo,
  customProp: "You better believe it!",
};
```
