---
layout: post
title: Start with Jekyll and Github
description: How I'm starting my blog (again).
status: draft
hn-discussion:
---

I'm a web developer and I follow people, stay update with open source projects
I love <\3, I try to fix bugs and sometimes I create them too (oh who doesn't?).

I had some blogs. No really. I had more than one, more than once.
Most of them were in my my mind.
You know, You think writing for a blog is easy and, despite everything I'm a developer:
I technically know how to code a blog so I would be cool also to write posts in!

Yes, I said I had them in my mind because I had never found the right platform for my needs. Fast publishing, great html output, fully customizable, mobile ready...

My favourite was Posterous, but [Twitter acquired and put them down](http://www.theverge.com/2013/4/30/4281780/posterous-is-shutting-down-tomorrow-here-are-the-best-alternatives).

All the alternatives to my old blog were flowing in my mind and after a long time I finally found a good solution. This could be a good solution also for you if:

- you love markdown and git
- you want great control of everything
- you don't want to bother with hostings

so get my advice, use [Jekyll + GitHub Pages](https://pages.github.com/)

## let's do this

The outstanding guide about **Pages** you find will cover most of common issues, however I'd like to talk you about the some details.

You need first to have a personal repository <code>&lt;username&gt;.github.io</code>.
If you have a public domain name, then create a file <code>CNAME</code> and push it in the root of your github project.

### jekyll

Then move forward to jekyll. The just created repo supports some special files: whenever you push some special **markdown** automatically they are translated to .html and are available as a static website. Cool right?

In order to preview your blog locally you need to install jekyll in your machine. It's python based so make sure you have:

{% highlight bash %}
$ python --version
Python 2.7.5
{% endhighlight %}

Install Jekyll it:

{% highlight bash %}
gem install jekyll ;
cd <username>.github.com ;
jekyll new myblog ;
{% endhighlight %}

And you're ready to run it locally with <code>jekyll serve -w</code>

{% highlight bash %}
$ jekyll serve -w
Configuration file: username.github.io/_config.yml
            Source: username.github.io
       Destination: username.github.io/_site
      Generating... done.
 Auto-regeneration: enabled
    Server address: http://0.0.0.0:4000
  Server running... press ctrl-c to stop.
{% endhighlight %}

now open [http://localhost:4000/](http://localhost:4000/).

Next step is to create markdown files within the <code>_posts</code> folder.
Rember you can still create plain .html files.
Nothing more to say, follow the [official guide](http://jekyllrb.com/docs/posts/).

### themes
Generally Jekyll supports themes too, just google around.

## github
You have nothing to do with github, just push the jekyll files to your personal
repository. Rember that if you want to use jekyll with github projects, use branch *gh-pages*. You have to enable it per project.

----

So this is my first official post with Jekyll@Github, this configuration gives me soooo much flexibility. That freedom I need while experimenting.
