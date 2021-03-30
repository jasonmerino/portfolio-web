---
type: "article"
path: "/how-to-json-stringify-a-dictionary-in-swift"
title: "How to JSON.stringify a dictionary in Swift"
metaTitle: "How to JSON.stringify a dictionary in Swift"
metaDescription: "Learn how to serialize a Swift dictionary into a string."
date: "2021-03-22"
twitterImage: ""
tags:
  - JSON
  - Swift
---

Sometimes while working in Swift you may need to serialize (or stringify for those JavaScript minded among us) for transporting that dictionary. To do this you will use Swift's `JSONSerialization` class. The `.data(withJSONObject:options:)` is the method that will help you out with this.

You'll probably want to define a helper function to do this JSON serialization for you. Your helper function could look something like this.

```swift
// pass this function a dictionary and you will recieve a string in return
func serializeDictionaryToJSON(dictionary: [String : Any]) -> String {
  do {
    // note here that the `options` argument is itself, optional
    let data = try JSONSerialization.data(
      withJSONObject: dictionary,
      options: .prettyPrinted
    )
    return String(data: data, encoding: String.Encoding.utf8) ?? ""
  } catch {
    // in case anything goes wrong, at the very least return a string
    return ""
  }
}
```

While serializing dictionaries to stringified JSON in Swift isn't terribly straight forward, you can easily abstract away some of that complexity by adding it to a reusable function like this.
