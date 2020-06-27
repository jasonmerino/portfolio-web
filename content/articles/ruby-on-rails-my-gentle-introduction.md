---
type: "article"
path: "/ruby-on-rails-my-gentle-introduction"
date: "2020-03-25"
title: "Ruby on Rails: My Gentle Introduction"
metaTitle: ""
metaDescription: ""
draft: true
twitterImage: ""
---

# Why Ruby on Rails?

Recently I've been looking around at a lot of job boards to see what's out there for remote jobs. I've been working mostly within the [React Native](https://reactnative.dev/), [React.js](https://reactjs.org/), and [Node.js](https://nodejs.org/en/) ecosystems for the last 4-6 years and have branched out recently into other technologies like machine learning and augmented reality with my position at the [Ferguson Innovation Lab](https://fergusonventures.com/). However, with all those experiences with new technologies, I had never given much thought to learning [Ruby on Rails](https://rubyonrails.org/).

With my search through all these remote job boards, I've noticed that there are a lot of jobs out there at well-known companies who use Ruby on Rails as their bread and butter of web development. I had heard good things about Rails before from a few different coworkers, but somehow in the past few years, I have not been able to see too far outside the JavaScript-for-everything vacuum and really grasp that Rails is in such heavy use.

I'm hoping that through this series of articles on Rails you and I can learn together what Ruby on Rails is, what it offers web engineers, and how to get started with it for your next project. This is the first in a series of articles, so check back when you're ready to move on to the next subject we'll tackle.

With that, let's dive in!

# So, what is Ruby on Rails?

Ruby on Rails is a full MVC web development framework that aims to make development simple and enjoyable. They do this by giving you a rails CLI which you can use to generate your project, add additional pieces of code like controllers and tasks, serve your application, and the list goes on.

# How to get started

Note: I am working through getting started with Ruby on Rails on OS X on my Macbook Pro. If you're on a different operating system the setup will likely differ from this article.

To get started we first need to make sure our development environment is all set up properly to run Ruby and the Rails framework. First, we'll want to install [RVM](https://rvm.io/) which is the Ruby Version Manager. This program helps you easily keep different versions of Ruby installed on your computer and provides an easy interface to switch between different versions depending on your project's needs. To install RVM run this command in your terminal.

```bash
$ \curl -sSL https://get.rvm.io | bash
```

After RVM has completed its install successfully run the following command to install Ruby 2.7.0 on your machine. You can see on their [getting started guide](https://guides.rubyonrails.org/getting_started.html#installing-rails) that you will need a minimum of Ruby 2.5.0 to run Rails.

```bash
$ rvm install 2.7.0
```

Okay, now you have a recent version of Ruby installed on your machine. Continuing along with prerequisites for Rails you should now install SQLite. For instructions on how to download and install you can [visit the SQLite webpage](https://www.sqlite.org/index.html). To check that you have installed SQLite properly you can run this command in your terminal. If you get a version number back you are good to go!

```bash
$ sqlite3 --version
```

After having successfully installed SQLite you are finally ready to install the rails framework on your machine! If you are not familiar with [Ruby Gems](https://guides.rubygems.org/what-is-a-gem/), they are dependencies for your ruby projects, the Rails CLI itself is installed as a gem. To install Rails, run this command in your terminal.

```bash
$ gem install rails
```

And once that's completed, verify that your installation went off without a hitch by checking the version of rails. You can do that by typing this command into your terminal.

```bash
$ rails --version
```

Now, if everything worked this is you right now!

![](https://lh4.googleusercontent.com/xrIC6XxT5iHb2rbGfgCSctHpQ4WL7BV6q9XdMAlUvMbKxLdvm0yYAgb88EWDN28Emawp0gqJPEl2Qx-Eh9QBF5vMRn3cbWWrgWAksu1SH-5cJs2E_xoWzAxfr7pf8G-g7MHvAXEe)

If you run into trouble setting up your environment you have a few options. Google the error you're getting and see if there are any helpful posts out there with a solution that will help you, check Stackoverflow, message a friend on slack who knows something about Rails, or [hit me up on Twitter](https://twitter.com/jasonmerino) and I may be able to help you out!

Now, let's move on to something more exciting. Generating our first Rails project!

## Generating a project

Like I mentioned earlier, Rails makes it as easy as possible to get your project up and running, and generating a Rails project is no exception. To have Rails create a new project for you simply run this command in your terminal.

```bash
$ rails new budgiee
```

With the rails new command, you can specify the name of your project (budgiee in this instance) and Rails will generate a new bootstrapped project for you all the bells and whistles. After Rails generates the files for your project it will also go through and install all the dependencies that it needs to run your project. These dependencies are both Ruby gems as well as Node.js modules for running Webpack. After the generation script has finished, make sure to change into the directory that was just created for your project.

```bash
$ cd budgiee
```

Now we're ready to see what Rails created for you!

## Serving up a project

Serving your new Rails application for development purposes is just as simple as generating your project. Once you are in your project's root directory you can run this command to serve the site up.

```bash
$ rails server
```

By default, this will start a server to serve up your Rails project on <http://localhost:3000>. You can customize how Rails serves your application by passing it various arguments such as --environment, --port and a few different flags dealing with caching and logging. To see all options for serving your application you can run `rails server --help`.

Tip: If you're lazy like me and don't want to type more keys than you need to you can run the default server by running the serve command like this:

```bash
$ rails s
```

Now, with your server running, open that address in your browser and make sure that your Rails application shows up. If everything worked correctly it should look something like this.

![](https://lh3.googleusercontent.com/OdMGMqWWmbhCjSxZbUEJuZ7pmuwgCSbGMHHWqFlD_PaCydXxGU3ne1qwsJQ1qBYkrTDLoThq0lDLT-zGCsmgCN8M2GRCpxSJZiONIJ3gyGJKwuhpDfxp4TOfNSIVP4KkZbXzFYD4)

# So now what?

I'm sure by this point you know that this is just the beginning. There is so much more that you can do with the Rails framework, which we will cover in the series of posts to come. But for now, I'd like to leave you with some great resources to further your Rails learning.

[Ruby Weekly](https://rubyweekly.com/) is a great resource from what I've read out there. This newsletter has been packed full of Ruby-related content for years and seems to be still going strong.

There's a [Reddit channel dedicated to Ruby](https://www.reddit.com/r/ruby/) which can be full of good discussion about Ruby (as well as Rails). There are some good reads on there, but don't just lurk, join in the conversation!

The [Ruby on Rails Official Blog](https://weblog.rubyonrails.org/) is also another good resource. It's not geared toward new learners as much as the previous resources, but it will give you a good idea of what is changing in the framework and what other sorts of activity is going on with the project.
