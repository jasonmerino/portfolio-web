---
type: "article"
path: "/articles/use-invoke-to-change-properties-on-each-model-in-backbone-collection"
title: "Use invoke to change properties on each model in Backbone collection"
description: ""
date: "2014-10-03"
twitterImage: ""
---

Here's a quick tip. If you need to set the same property on each model in a Backbone collection check out the following snippet.

```js
this.collectionName.invoke("set", {
  isSet: true,
})
```

Invoke can be used as a slightly cleaner version of this.

```js
this.collectionName.each(function(model) {
  model.set({
    isSet: true,
  })
})
```

Happy coding!
