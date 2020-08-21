---
type: "article"
path: "/conform-backbone-model-data-to-schema-before-calling-set"
title: "Conform Backbone model data to schema before calling set"
metaTitle: "How to conform a Backbone model to the schema before calling set"
metaDescription: "Today we're going to learn how to make sure that the data we're passing to a Backbone model is of the type that a model expects before calling the set function."
date: "2014-11-23"
twitterImage: ""
tags:
  - JavaScript
  - Backbone.js
---

When doing basic [CRUD](http://en.wikipedia.org/wiki/Create,_read,_update_and_delete) on Backbone models there can be instances when it is helpful to have a defined schema for model properties. Since properly typing data is not something that JavaScript is particularly good at it is even more important to find repeatable patterns which help keep application logic less error prone.

In the browser, when pulling data from the [DOM](http://en.wikipedia.org/wiki/Document_Object_Model) it always comes back as a string. If one of these string values is set on the model for an attribute that used to be an number or a boolean this could cause problems with the rest of the model's functions.

Consider the following code blocks.

```js
var Book = Backbone.Model.extend();
var theHobbit = new Book({
  recommended: true,
});
```

If we allowed a user of ours to toggle the recommended property of this book and then did some action based on the recommended attribute our logic could be flawed if we didn't pay attention.

```js
theHobbit.set("recommended", this.$("#recommended").val());
if (theHobbit.get("recommended")) {
  alert("Wow, you have a good taste in literature!");
} else {
  alert("Wow... Really?");
}
```

If we assume that the this.\$('#recommended') element's value is 'false' then the user would get the alert telling them they have a good taste in literature because a non empty string is considered [truthy](http://james.padolsey.com/javascript/truthy-falsey/) and is evaluated as true.

### Conforming data to schema

If we could conform known model attributes to a specific schema we could potentially side-step some of this confusion and our code would be more bullet-proof. There is a way to do this and have it happen by default by extending Backbone.Model.set.

```js
Backbone.Model.prototype.defaultSet = Backbone.Model.prototype.set;

_.extend(Backbone.Model.prototype, {
  set: function (key, val, options) {
    var attrs;

    // handle both parameter signatures
    if (typeof key === "object") {
      attrs = key;
      options = val;
    } else {
      (attrs = {})[key] = val;
    }

    if (this.schema) {
      // loop through each of the given attributes that are to be set and attempt
      // to convert them to the type given in the schema
      _.each(
        attrs,
        _.bind(function (v, k) {
          try {
            switch (this.schema[k]) {
              case "boolean":
                attrs[k] = v === "true" ? true : v === "false" ? false : v;
                break;
              case "int":
                attrs[k] = parseInt(v, 10);
                break;
              case "float":
                attrs[k] = parseFloat(v);
                break;
              case "string":
                attrs[k] = v.toString();
                break;
              default:
                attrs[k] = v;
                break;
            }
          } catch (error) {}
        }, this)
      );
    }

    // call default Backbone.Model.set
    return this.defaultSet.call(this, attrs, options);
  },
});
```

Above we are stashing a reference to Backbone.Model.set and extending new functionality on top of Backbone.Model.prototype to conform the incoming data to the models schema. After this the only change we need to make to our model is add a schema object when we do the initial extend of Backbone.Model.

```js
var Book = Backbone.Model.extend({
  schema: {
    recommended: "boolean",
  },
});
```

Now if the user toggled the this.\$('#recommended') element they would get the 'Wow... Really?' alert as we desired them to rather than the alert telling them they had good taste. This minor change in adding a schema to your Backbone models can be the difference between your application doing the exact thing you expect and the exact *opposite* of what you expect.

Hope this helps. Happy coding!
