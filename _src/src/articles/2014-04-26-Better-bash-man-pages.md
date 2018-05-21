---
categories: [development]
date: 2014-04-26T13:45:00+02:00
description: "Colorize them all."
layout: layout-blog-article.html
tags: [osx, dev, environment]
title: "Better bash man pages"
image-preview: /assets/posts/2014-04-26-Better-bash-man-pages/colorized-man-pages.png
---

We, developers, live much of our time within a shell.
Modern [CLI](http://en.wikipedia.org/wiki/Command-line_interface)s output
stunning help in a way before was not possible. Think of NPM or Heroku or the great
GIT.

However we still have the [man pages](http://en.wikipedia.org/wiki/Man_page) with their
default style: black&white with some underline or bold.

So, we can change this luckily. It's a feature, probably an ancient one, most of us
don't know or just forgot about it.

### change it

![standard man page VS. colorized man page](/assets/posts/2014-04-26-Better-bash-man-pages/colorized-man-pages.png)

How to do that:

- create a file called **.LESS_TERMCAP:** <code>touch ~/.LESS_TERMCAP</code>
- edit the **~/.LESS_TERMCAP** file with an editor: <code>nano ~/.LESS_TERMCAP</code>
- fill **~/.LESS_TERMCAP** with this:
```bash
# Less Colors for Man Pages
 export LESS_TERMCAP_mb=$'\E[0;103m' # begin blinking
 export LESS_TERMCAP_md=$'\E[0;93m' # begin bold
 export LESS_TERMCAP_me=$'\E[0m' # end mode
 export LESS_TERMCAP_se=$'\E[0m' # end standout-mode
 export LESS_TERMCAP_so=$(tput bold; tput setaf 8; tput setab 3) # begin standout-mode - info box
 export LESS_TERMCAP_ue=$'\E[0m' # end underline
 export LESS_TERMCAP_us=$'\E[04;32m' # begin underline
 export LESS_TERMCAP_mr=$(tput rev)
 export LESS_TERMCAP_mh=$(tput dim)
 export LESS_TERMCAP_ZN=$(tput ssubm)
 export LESS_TERMCAP_ZV=$(tput rsubm)
 export LESS_TERMCAP_ZO=$(tput ssupm)
 export LESS_TERMCAP_ZW=$(tput rsupm)
```

- open your **~/.bash_profile** with an editor: <code>nano ~/.bash_profile</code>
- add to **~/.bash_profile** this:
```bash
[[ -f ~/.LESS_TERMCAP ]] && . ~/.LESS_TERMCAP
```
- reload the **~/.bash_profile** (or restart the bash session): <code>source ~/.bash_profile</code>

### done

Now you have colorized the man pages. It's possible also to customize the colors,
if you google a bit you'll find the table of colors and the meaning of those variables.

Enjoy.
