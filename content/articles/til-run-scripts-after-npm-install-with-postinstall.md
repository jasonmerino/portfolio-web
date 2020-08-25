---
type: "article"
path: "/til-run-scripts-after-npm-install-with-postinstall"
title: "TIL: Run scripts after npm install with postinstall"
metaTitle: "Today I learned how to run scripts after npm install with postinstall"
metaDescription: "Today I learned how to run scripts after npm install with the package.json's scripts.postinstall property."
date: "2017-05-25"
twitterImage: ""
tags:
  - JavaScript
  - NPM
---

The other day when I was upgrading React Native I ran into [this issue here](https://github.com/facebook/react-native/issues/5412). Basically, there was a naming collision between files in the fbjs dependency which was scattered throughout a few different dependencies I had in my project.

I quickly found I could resolve this issue by installing fbjs as one of my own dependencies and then going through and removing all the other instances so at runtime the code would reference the top level insance of fbjs. However, after doing this twice manually I decided this needed to be automated. I'm kind of lazy... in a good way...

This is when I found out about postinstall scripts in NPM. The [npm documentation site](https://docs.npmjs.com/misc/scripts) says that postinstall will "run AFTER the package is installed." Now, I'm not sure if this was intended for just modules that you release on NPM for others to use, but it also works in your own project. Here's a sample from my package.json file with the postinstall script to remove all other versions of fbjs.

```json
{
  ...
  "scripts": {
    ...
    "postinstall": "find . -name 'fbjs' -print | grep \"\\./node_modules/fbjs\" -v | xargs rm -rf",
    ...
  },
  ...
}
```

That's it! You can easily define scripts to run right after every npm install. Who knew?
