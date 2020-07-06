---
type: "article"
path: "/create-a-branch-from-existing-branch-in-git"
title: "Create a branch from existing branch in git"
metaTitle: "How to create a new branch from an existing branch in git"
metaDescription: "Learn how to create a new branch from an existing branch no matter what branch you currently have checked out."
date: "2014-06-03"
twitterImage: ""
---

# Create a branch from existing branch in git

Tuesday, June 3, 2014

TL;DR; The command you need is `git checkout -b new-branch existing-branch`

Do you ever find yourself working on a new feature for program you're writing and making lots of good progress when a few commits in you realize that you aren't even working in the branch you thought you were? I've found myself in this position a few times and every time I do I always seem to have trouble remembering what the git command is to create a branch from an existing branch.

After I do a quick [query of the Google machine](https://www.google.com/search?q=create+a+branch+from+existing+branch+in+git) I find my answer (but now I'm writing it down so I don't have to go searching anymore). In this case the command I need is:

```bash
# This is the terminal command you need
git checkout -b new-branch existing-branch
```

Let's break this command down a bit. For those of you who are familiar with basic git branching workflow you can skip down a few lines. The git checkout command changes your working copy (basically the files you can see in Finder or Windows Explorer) to whichever branch you specify further on. The -b tells git that the branch you are going to checkout doesn't exist yet and needs to be created. The next two bits of text are pretty self explanatory. They are just the names of the branches you are going to be working with. The name of the new branch comes first and then the name of the branch you didn't know you were working in comes next.

So, for example, if I'm mistakenly working on a branch called feature-234 when I think I'm working on a branch called bug-324 then I can just run this command in my terminal to start working on this new branch.

```bash
git checkout -b bug-324 feature-234
```

Along with this new branch comes all the previous commit history from my work on the last branch that I mistakenly started on. This is a good thing for this new branch, but if I want to go back and clean up the feature branch's commit history then I've got a little more work on my hands.
