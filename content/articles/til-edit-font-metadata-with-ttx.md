---
type: "article"
path: "/til-edit-font-metadata-with-ttx"
title: "TIL: Edit font metadata with TTX"
metaTitle: ""
metaDescription: "In this article we go over a way to edit font metadata with the Python library fonttools."
date: "2016-10-02"
twitterImage: ""
---

Today I needed to change the Full Name propery of a .ttf font file I was working with. After some searching around the interwebs I found [TTX](https://github.com/behdad/fonttools/), a script written in [Python](https://www.python.org/) which converts your font file to [XML](https://en.wikipedia.org/wiki/XML) so that you can edit it's properties and then will convert it back into a font.

The setup is simple. You can install it with [pip](https://pypi.python.org/pypi/pip).

```bash
pip install fonttools
```

Then navigate to the directory where you font is and run ttx against the standard font file to generate the XML version which has a .ttx file extension.

```bash
cd path/to/font/file
ttx AwesomeFont.ttf
```

Open the new .ttx file in your favorite editor.

```bash
vi AwesomeFont.ttx
```

Edit the data you want to and then run ttx on the edited .ttx file.

```bash
ttx AwesomeFont.ttx
```

Which will then generate the font file anew in that same directory with the updated metadata.

Happy font updating. Enjoy!
