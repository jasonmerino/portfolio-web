---
type: "article"
path: "/til-sending-cookies-with-the-fetch-api"
title: "TIL: Sending cookies with the fetch API"
metaTitle: ""
metaDescription: ""
date: "2018-01-22"
twitterImage: ""
---

Today I was trying desperately to create a login form for a side project I'm working on and I could not get the session to persist from page load to page load in [Express](http://expressjs.com/). I was doing the authentication via an ajax call, so naturally I was attempting to force the session to persist with req.session.save(), but that wasn't working either.

I was pulling my hair out going crazy, which in my situation isn't not a good idea as my hair falls out of its own accord, when I noticed that req.cookies was coming through as an empty object when making the auth request. After a little research I found that because I was using the new window.fetch API (and I was falling back using the [isomorphic-fetch polyfill](https://www.npmjs.com/package/isomorphic-fetch)) and I was neglecting the credentials flag I was not having my cookies sent across with the request.

So, here's what I had before.

```js
fetch("https://url/to/my/api/endpoint", {
  method: "post",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    email,
    password,
  }),
});
```

And then here's what I had after.

```js
fetch("https://url/to/my/api/endpoint", {
  method: "post",
  credentials: "same-origin", // here's the magical line that fixed everything
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    email,
    password,
  }),
});
```

Turns out the credentials flag defaults to 'omit' which basically means don't worry about sending cookies with this request. There are three different options and if you want to know more about them I would read about it on [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Request/credentials) as this is the easiest to understand page that I've found that explains everything about the credentials flag.
