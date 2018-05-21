---
date: 2014-04-09T11:10:00+02:00
description: "How to get a nice git prompt in no time."
image-preview: /assets/posts/2014-04-09-Improve-your-Git-prompt/default-gitprompt.png
layout: stf.com.html
tags: [development, git]
title: "Improve your GIT prompt"
---

A [friend of mine](http://simoneloru.com/), during a remote shared video session,
noticed my shell while we were deciding what to commit and what to merge.

![Example of my prompt](/assets/posts/2014-04-09-Improve-your-Git-prompt/prompt.png)

[Simone](http://simoneloru.com) told me:

> Cool, you should write some instructions on how to configure it...
>
> I want it too!

### so here's how to do it

Some time ago [I wrote a script](https://gist.github.com/NKjoep/4194041) for parsing the `git status` and return numbers of
modified files and the current branch. Soon I understood it is annoying to maintain
and that there is [so much better out there](https://github.com/magicmonty/bash-git-prompt).

### use bash-git-prompt
First of all:

```bash
$ cd ~ ;
$ git clone https://github.com/magicmonty/bash-git-prompt.git .bash-git-prompt ;
```

Than you have to edit the `.bash_profile` and add this at the end:

```bash
export GIT_PROMPT_ONLY_IN_REPO=1
source ~/.bash-git-prompt/gitprompt.sh
```

`.bash_profile` is in your home folder if you are using OSX, otherwise
check for a `.bashrc` if you are using linux or unix.



Doing this you'll have enabled the cool git prompt with its default setting. Setting the `GIT_PROMPT_ONLY_IN_REPO` variable you are preserving the [PS1](http://www.cyberciti.biz/tips/howto-linux-unix-bash-shell-setup-prompt.html) when outside a git folder.

### customize it

However, the default config probably will hurt you, the default settings is something like this:

![Default bash-git-prompt](/assets/posts/2014-04-09-Improve-your-Git-prompt/default-gitprompt.png)

Don't panic, it's possible to tweak it a bit. Create a file in your home folder called
<code>.git-prompt-colors.sh</code>, so:

```bash
$ touch .git-prompt-colors.sh
```

Then you want to write some variables inside it:

- **GIT_PROMPT_START**: the start of the prompt
- **GIT_PROMPT_END**: the end of prompt
- **GIT_PROMPT_LEADING_SPACE**: add a space at last
- **GIT_PROMPT_PREFIX**: start of the git info string
- **GIT_PROMPT_SUFFIX**: the end of the git info string
- **GIT_PROMPT_SEPARATOR**: separates each item
- **GIT_PROMPT_BRANCH**: the git branch that is active in the current directory
- **GIT_PROMPT_STAGED**: the number of staged files/directories
- **GIT_PROMPT_CONFLICTS**: the number of files in conflict
- **GIT_PROMPT_CHANGED**: the number of changed files
- **GIT_PROMPT_REMOTE**: the remote branch name (if any)
- **GIT_PROMPT_UNTRACKED**: the number of untracked files/dirs
- **GIT_PROMPT_STASHED**: the number of stashed files/dir
- **GIT_PROMPT_CLEAN**: a colored flag indicating a "clean" repository
- **GIT_PROMPT_SYMBOLS_AHEAD**: indicates when you have commit ahead to push
- **GIT_PROMPT_SYMBOLS_BEHIND**: indicated when you have commit behind to pull
- **GIT_PROMPT_SYMBOLS_PREHASH**: hash indicator


Then here's my config for `.git-prompt-color.sh`

```bash
BYellow="\[\033[1;33m\]"
IBlack="\[\033[0;90m\]"
Green="\[\033[0;32m\]"

GIT_PROMPT_PREFIX="${IBlack}(${ResetColor}" # start of the git info string
GIT_PROMPT_SUFFIX="${IBlack})${ResetColor} " # the end of the git info string
GIT_PROMPT_SEPARATOR="${IBlack} ${ResetColor}" # separates each item
GIT_PROMPT_BRANCH="${IBlack}" # the git branch that is active in the current directory
GIT_PROMPT_STAGED="${Green}" # the number of staged files/directories
GIT_PROMPT_CONFLICTS="${Magenta}✖" # the number of files in conflict
GIT_PROMPT_CHANGED="${Yellow}" # the number of changed files
GIT_PROMPT_REMOTE=" " # the remote branch name (if any)
GIT_PROMPT_UNTRACKED="${Cyan}" # the number of untracked files/dirs
GIT_PROMPT_STASHED="${BoldBlue}" #⚑  	# the number of stashed files/dir
GIT_PROMPT_CLEAN="${IBlack}✔" # a colored flag indicating a "clean" repository
GIT_PROMPT_SYMBOLS_AHEAD='↑'
GIT_PROMPT_SYMBOLS_BEHIND='↓'
GIT_PROMPT_SYMBOLS_PREHASH=':'
GIT_PROMPT_START="${ResetColor} "
GIT_PROMPT_END="${ResetColor}${BYellow}\w${ResetColor} ${IBlack}∫${ResetColor} "
GIT_PROMPT_LEADING_SPACE="0"
```


### try everything
Logout from the current session and login again, or simply close the terminal and open it again.

Many uses this command `source ~/.bash_profile` but I do not like it. That way you are not cleaning previous loaded environment variables, so seems better to me perform a clean login.

### stay updated

Having this configuration you can keep updated the bash-git-prompt pulling it from github.
Periodically give a `git pull` under `~/.bash-git-prompt`

```bash
$ cd ~/.bash-git-prompt
$ git pull
```

### enjoy

That's all. enjoy your cool prompt :D
