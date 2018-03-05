---
categories: [development]
date: 2015-09-26
description: "Guide for fast .gitignore items"
layout: layout.html
tags: [dev, git]
title: "Gitignore with SublimeText"
---


I was looking for a good way to fill the .gitignore when starting a new project.

I then remembered about a collection of useful [gitignore templates from GitHub](https://github.com/github/gitignore), which is basically a list of gitignore for each programming language.

There you'll find files like these:

* Ada.gitignore
* Agda.gitignore
* Android.gitignore
* AppEngine.gitignore
* AppceleratorTitanium.gitignore
* ...
* ...
* Node.gitignore
* ...
* And so on...

Great, we have a repository with good gitignores! The problem now is how to add them quickly to your project.

Such problem, very Google: I found a [post from  Marc Jenkins](https://plausiblethought.net/pull-gitignore-files-with-the-sublime-text-nettuts-fetch-plugin/) suggest to use Nettuts-Fetch for Sublime Text to achieve exactly what I was looking for.

Basically Nettuts-Fetch is a download & paste tool: you fill its configuration file with name and url then you it will download the content from those urls and paste it directly in your editor.


## Configure Nettus

Soooo, open the default configuration
![1](/assets/posts/2015-09-26-Gitignore-with-Sublime/3-fetch-manage.png)

and add to `files`
![2](/assets/posts/2015-09-26-Gitignore-with-Sublime/5-default-config.png)


~~~json
{
"files":
{
 "gitignore Anjuta": "https://github.com/github/gitignore/raw/master/Global/Anjuta.gitignore",
 "gitignore Archives": "https://github.com/github/gitignore/raw/master/Global/Archives.gitignore",
 "gitignore BricxCC": "https://github.com/github/gitignore/raw/master/Global/BricxCC.gitignore",
 "gitignore CVS": "https://github.com/github/gitignore/raw/master/Global/CVS.gitignore",
 "gitignore Cloud9": "https://github.com/github/gitignore/raw/master/Global/Cloud9.gitignore",
 "gitignore CodeKit": "https://github.com/github/gitignore/raw/master/Global/CodeKit.gitignore",
 "gitignore DartEditor": "https://github.com/github/gitignore/raw/master/Global/DartEditor.gitignore",
 "gitignore Dreamweaver": "https://github.com/github/gitignore/raw/master/Global/Dreamweaver.gitignore",
 "gitignore Eclipse": "https://github.com/github/gitignore/raw/master/Global/Eclipse.gitignore",
 "gitignore EiffelStudio": "https://github.com/github/gitignore/raw/master/Global/EiffelStudio.gitignore",
 "gitignore Emacs": "https://github.com/github/gitignore/raw/master/Global/Emacs.gitignore",
 "gitignore Ensime": "https://github.com/github/gitignore/raw/master/Global/Ensime.gitignore",
 "gitignore Espresso": "https://github.com/github/gitignore/raw/master/Global/Espresso.gitignore",
 "gitignore FlexBuilder": "https://github.com/github/gitignore/raw/master/Global/FlexBuilder.gitignore",
 "gitignore GPG": "https://github.com/github/gitignore/raw/master/Global/GPG.gitignore",
 "gitignore IPythonNotebook": "https://github.com/github/gitignore/raw/master/Global/IPythonNotebook.gitignore",
 "gitignore JDeveloper": "https://github.com/github/gitignore/raw/master/Global/JDeveloper.gitignore",
 "gitignore JetBrains": "https://github.com/github/gitignore/raw/master/Global/JetBrains.gitignore",
 "gitignore KDevelop4": "https://github.com/github/gitignore/raw/master/Global/KDevelop4.gitignore",
 "gitignore Kate": "https://github.com/github/gitignore/raw/master/Global/Kate.gitignore",
 "gitignore Lazarus": "https://github.com/github/gitignore/raw/master/Global/Lazarus.gitignore",
 "gitignore LibreOffice": "https://github.com/github/gitignore/raw/master/Global/LibreOffice.gitignore",
 "gitignore Linux": "https://github.com/github/gitignore/raw/master/Global/Linux.gitignore",
 "gitignore LyX": "https://github.com/github/gitignore/raw/master/Global/LyX.gitignore",
 "gitignore Matlab": "https://github.com/github/gitignore/raw/master/Global/Matlab.gitignore",
 "gitignore Mercurial": "https://github.com/github/gitignore/raw/master/Global/Mercurial.gitignore",
 "gitignore MicrosoftOffice": "https://github.com/github/gitignore/raw/master/Global/MicrosoftOffice.gitignore",
 "gitignore ModelSim": "https://github.com/github/gitignore/raw/master/Global/ModelSim.gitignore",
 "gitignore Momentics": "https://github.com/github/gitignore/raw/master/Global/Momentics.gitignore",
 "gitignore MonoDevelop": "https://github.com/github/gitignore/raw/master/Global/MonoDevelop.gitignore",
 "gitignore NetBeans": "https://github.com/github/gitignore/raw/master/Global/NetBeans.gitignore",
 "gitignore Ninja": "https://github.com/github/gitignore/raw/master/Global/Ninja.gitignore",
 "gitignore NotepadPP": "https://github.com/github/gitignore/raw/master/Global/NotepadPP.gitignore",
 "gitignore OSX": "https://github.com/github/gitignore/raw/master/Global/OSX.gitignore",
 "gitignore Redcar": "https://github.com/github/gitignore/raw/master/Global/Redcar.gitignore",
 "gitignore Redis": "https://github.com/github/gitignore/raw/master/Global/Redis.gitignore",
 "gitignore SBT": "https://github.com/github/gitignore/raw/master/Global/SBT.gitignore",
 "gitignore SVN": "https://github.com/github/gitignore/raw/master/Global/SVN.gitignore",
 "gitignore SlickEdit": "https://github.com/github/gitignore/raw/master/Global/SlickEdit.gitignore",
 "gitignore SublimeText": "https://github.com/github/gitignore/raw/master/Global/SublimeText.gitignore",
 "gitignore SynopsysVCS": "https://github.com/github/gitignore/raw/master/Global/SynopsysVCS.gitignore",
 "gitignore Tags": "https://github.com/github/gitignore/raw/master/Global/Tags.gitignore",
 "gitignore TextMate": "https://github.com/github/gitignore/raw/master/Global/TextMate.gitignore",
 "gitignore TortoiseGit": "https://github.com/github/gitignore/raw/master/Global/TortoiseGit.gitignore",
 "gitignore Vagrant": "https://github.com/github/gitignore/raw/master/Global/Vagrant.gitignore",
 "gitignore Vim": "https://github.com/github/gitignore/raw/master/Global/Vim.gitignore",
 "gitignore VirtualEnv": "https://github.com/github/gitignore/raw/master/Global/VirtualEnv.gitignore",
 "gitignore VisualStudioCode": "https://github.com/github/gitignore/raw/master/Global/VisualStudioCode.gitignore",
 "gitignore WebMethods": "https://github.com/github/gitignore/raw/master/Global/WebMethods.gitignore",
 "gitignore Windows": "https://github.com/github/gitignore/raw/master/Global/Windows.gitignore",
 "gitignore Xcode": "https://github.com/github/gitignore/raw/master/Global/Xcode.gitignore",
 "gitignore XilinxISE": "https://github.com/github/gitignore/raw/master/Global/XilinxISE.gitignore",
 "gitignore Actionscript": "https://github.com/github/gitignore/raw/master/Actionscript.gitignore",
 "gitignore Ada": "https://github.com/github/gitignore/raw/master/Ada.gitignore",
 "gitignore Agda": "https://github.com/github/gitignore/raw/master/Agda.gitignore",
 "gitignore Android": "https://github.com/github/gitignore/raw/master/Android.gitignore",
 "gitignore AppEngine": "https://github.com/github/gitignore/raw/master/AppEngine.gitignore",
 "gitignore AppceleratorTitanium": "https://github.com/github/gitignore/raw/master/AppceleratorTitanium.gitignore",
 "gitignore ArchLinuxPackages": "https://github.com/github/gitignore/raw/master/ArchLinuxPackages.gitignore",
 "gitignore Autotools": "https://github.com/github/gitignore/raw/master/Autotools.gitignore",
 "gitignore C++": "https://github.com/github/gitignore/raw/master/C%2B%2B.gitignore",
 "gitignore C": "https://github.com/github/gitignore/raw/master/C.gitignore",
 "gitignore CFWheels": "https://github.com/github/gitignore/raw/master/CFWheels.gitignore",
 "gitignore CMake": "https://github.com/github/gitignore/raw/master/CMake.gitignore",
 "gitignore CUDA": "https://github.com/github/gitignore/raw/master/CUDA.gitignore",
 "gitignore CakePHP": "https://github.com/github/gitignore/raw/master/CakePHP.gitignore",
 "gitignore ChefCookbook": "https://github.com/github/gitignore/raw/master/ChefCookbook.gitignore",
 "gitignore Clojure": "https://github.com/github/gitignore/raw/master/Clojure.gitignore",
 "gitignore CodeIgniter": "https://github.com/github/gitignore/raw/master/CodeIgniter.gitignore",
 "gitignore CommonLisp": "https://github.com/github/gitignore/raw/master/CommonLisp.gitignore",
 "gitignore Composer": "https://github.com/github/gitignore/raw/master/Composer.gitignore",
 "gitignore Concrete5": "https://github.com/github/gitignore/raw/master/Concrete5.gitignore",
 "gitignore Coq": "https://github.com/github/gitignore/raw/master/Coq.gitignore",
 "gitignore CraftCMS": "https://github.com/github/gitignore/raw/master/CraftCMS.gitignore",
 "gitignore DM": "https://github.com/github/gitignore/raw/master/DM.gitignore",
 "gitignore Dart": "https://github.com/github/gitignore/raw/master/Dart.gitignore",
 "gitignore Delphi": "https://github.com/github/gitignore/raw/master/Delphi.gitignore",
 "gitignore Drupal": "https://github.com/github/gitignore/raw/master/Drupal.gitignore",
 "gitignore EPiServer": "https://github.com/github/gitignore/raw/master/EPiServer.gitignore",
 "gitignore Eagle": "https://github.com/github/gitignore/raw/master/Eagle.gitignore",
 "gitignore Elisp": "https://github.com/github/gitignore/raw/master/Elisp.gitignore",
 "gitignore Elixir": "https://github.com/github/gitignore/raw/master/Elixir.gitignore",
 "gitignore Erlang": "https://github.com/github/gitignore/raw/master/Erlang.gitignore",
 "gitignore ExpressionEngine": "https://github.com/github/gitignore/raw/master/ExpressionEngine.gitignore",
 "gitignore ExtJs": "https://github.com/github/gitignore/raw/master/ExtJs.gitignore",
 "gitignore Fancy": "https://github.com/github/gitignore/raw/master/Fancy.gitignore",
 "gitignore Finale": "https://github.com/github/gitignore/raw/master/Finale.gitignore",
 "gitignore ForceDotCom": "https://github.com/github/gitignore/raw/master/ForceDotCom.gitignore",
 "gitignore Fortran": "https://github.com/github/gitignore/raw/master/Fortran.gitignore",
 "gitignore FuelPHP": "https://github.com/github/gitignore/raw/master/FuelPHP.gitignore",
 "gitignore GWT": "https://github.com/github/gitignore/raw/master/GWT.gitignore",
 "gitignore Gcov": "https://github.com/github/gitignore/raw/master/Gcov.gitignore",
 "gitignore GitBook": "https://github.com/github/gitignore/raw/master/GitBook.gitignore",
 "gitignore Go": "https://github.com/github/gitignore/raw/master/Go.gitignore",
 "gitignore Gradle": "https://github.com/github/gitignore/raw/master/Gradle.gitignore",
 "gitignore Grails": "https://github.com/github/gitignore/raw/master/Grails.gitignore",
 "gitignore Haskell": "https://github.com/github/gitignore/raw/master/Haskell.gitignore",
 "gitignore IGORPro": "https://github.com/github/gitignore/raw/master/IGORPro.gitignore",
 "gitignore Idris": "https://github.com/github/gitignore/raw/master/Idris.gitignore",
 "gitignore Java": "https://github.com/github/gitignore/raw/master/Java.gitignore",
 "gitignore Jboss": "https://github.com/github/gitignore/raw/master/Jboss.gitignore",
 "gitignore Jekyll": "https://github.com/github/gitignore/raw/master/Jekyll.gitignore",
 "gitignore Joomla": "https://github.com/github/gitignore/raw/master/Joomla.gitignore",
 "gitignore KiCAD": "https://github.com/github/gitignore/raw/master/KiCAD.gitignore",
 "gitignore Kohana": "https://github.com/github/gitignore/raw/master/Kohana.gitignore",
 "gitignore LabVIEW": "https://github.com/github/gitignore/raw/master/LabVIEW.gitignore",
 "gitignore Laravel": "https://github.com/github/gitignore/raw/master/Laravel.gitignore",
 "gitignore Leiningen": "https://github.com/github/gitignore/raw/master/Leiningen.gitignore",
 "gitignore LemonStand": "https://github.com/github/gitignore/raw/master/LemonStand.gitignore",
 "gitignore Lilypond": "https://github.com/github/gitignore/raw/master/Lilypond.gitignore",
 "gitignore Lithium": "https://github.com/github/gitignore/raw/master/Lithium.gitignore",
 "gitignore Lua": "https://github.com/github/gitignore/raw/master/Lua.gitignore",
 "gitignore Magento": "https://github.com/github/gitignore/raw/master/Magento.gitignore",
 "gitignore Maven": "https://github.com/github/gitignore/raw/master/Maven.gitignore",
 "gitignore Mercury": "https://github.com/github/gitignore/raw/master/Mercury.gitignore",
 "gitignore MetaProgrammingSystem": "https://github.com/github/gitignore/raw/master/MetaProgrammingSystem.gitignore",
 "gitignore Nanoc": "https://github.com/github/gitignore/raw/master/Nanoc.gitignore",
 "gitignore Nim": "https://github.com/github/gitignore/raw/master/Nim.gitignore",
 "gitignore Node": "https://github.com/github/gitignore/raw/master/Node.gitignore",
 "gitignore OCaml": "https://github.com/github/gitignore/raw/master/OCaml.gitignore",
 "gitignore Objective-C": "https://github.com/github/gitignore/raw/master/Objective-C.gitignore",
 "gitignore Opa": "https://github.com/github/gitignore/raw/master/Opa.gitignore",
 "gitignore OpenCart": "https://github.com/github/gitignore/raw/master/OpenCart.gitignore",
 "gitignore OracleForms": "https://github.com/github/gitignore/raw/master/OracleForms.gitignore",
 "gitignore Packer": "https://github.com/github/gitignore/raw/master/Packer.gitignore",
 "gitignore Perl": "https://github.com/github/gitignore/raw/master/Perl.gitignore",
 "gitignore Phalcon": "https://github.com/github/gitignore/raw/master/Phalcon.gitignore",
 "gitignore PlayFramework": "https://github.com/github/gitignore/raw/master/PlayFramework.gitignore",
 "gitignore Plone": "https://github.com/github/gitignore/raw/master/Plone.gitignore",
 "gitignore Prestashop": "https://github.com/github/gitignore/raw/master/Prestashop.gitignore",
 "gitignore Processing": "https://github.com/github/gitignore/raw/master/Processing.gitignore",
 "gitignore Python": "https://github.com/github/gitignore/raw/master/Python.gitignore",
 "gitignore Qooxdoo": "https://github.com/github/gitignore/raw/master/Qooxdoo.gitignore",
 "gitignore Qt": "https://github.com/github/gitignore/raw/master/Qt.gitignore",
 "gitignore R": "https://github.com/github/gitignore/raw/master/R.gitignore",
 "gitignore ROS": "https://github.com/github/gitignore/raw/master/ROS.gitignore",
 "gitignore Rails": "https://github.com/github/gitignore/raw/master/Rails.gitignore",
 "gitignore RhodesRhomobile": "https://github.com/github/gitignore/raw/master/RhodesRhomobile.gitignore",
 "gitignore Ruby": "https://github.com/github/gitignore/raw/master/Ruby.gitignore",
 "gitignore Rust": "https://github.com/github/gitignore/raw/master/Rust.gitignore",
 "gitignore SCons": "https://github.com/github/gitignore/raw/master/SCons.gitignore",
 "gitignore Sass": "https://github.com/github/gitignore/raw/master/Sass.gitignore",
 "gitignore Scala": "https://github.com/github/gitignore/raw/master/Scala.gitignore",
 "gitignore Scrivener": "https://github.com/github/gitignore/raw/master/Scrivener.gitignore",
 "gitignore Sdcc": "https://github.com/github/gitignore/raw/master/Sdcc.gitignore",
 "gitignore SeamGen": "https://github.com/github/gitignore/raw/master/SeamGen.gitignore",
 "gitignore SketchUp": "https://github.com/github/gitignore/raw/master/SketchUp.gitignore",
 "gitignore Stella": "https://github.com/github/gitignore/raw/master/Stella.gitignore",
 "gitignore SugarCRM": "https://github.com/github/gitignore/raw/master/SugarCRM.gitignore",
 "gitignore Swift": "https://github.com/github/gitignore/raw/master/Swift.gitignore",
 "gitignore Symfony": "https://github.com/github/gitignore/raw/master/Symfony.gitignore",
 "gitignore SymphonyCMS": "https://github.com/github/gitignore/raw/master/SymphonyCMS.gitignore",
 "gitignore TeX": "https://github.com/github/gitignore/raw/master/TeX.gitignore",
 "gitignore Textpattern": "https://github.com/github/gitignore/raw/master/Textpattern.gitignore",
 "gitignore TurboGears2": "https://github.com/github/gitignore/raw/master/TurboGears2.gitignore",
 "gitignore Typo3": "https://github.com/github/gitignore/raw/master/Typo3.gitignore",
 "gitignore Umbraco": "https://github.com/github/gitignore/raw/master/Umbraco.gitignore",
 "gitignore Unity": "https://github.com/github/gitignore/raw/master/Unity.gitignore",
 "gitignore VVVV": "https://github.com/github/gitignore/raw/master/VVVV.gitignore",
 "gitignore VisualStudio": "https://github.com/github/gitignore/raw/master/VisualStudio.gitignore",
 "gitignore Waf": "https://github.com/github/gitignore/raw/master/Waf.gitignore",
 "gitignore WordPress": "https://github.com/github/gitignore/raw/master/WordPress.gitignore",
 "gitignore Xojo": "https://github.com/github/gitignore/raw/master/Xojo.gitignore",
 "gitignore Yeoman": "https://github.com/github/gitignore/raw/master/Yeoman.gitignore",
 "gitignore Yii": "https://github.com/github/gitignore/raw/master/Yii.gitignore",
 "gitignore ZendFramework": "https://github.com/github/gitignore/raw/master/ZendFramework.gitignore",
 "gitignore Zephir": "https://github.com/github/gitignore/raw/master/Zephir.gitignore"
},
"packages":
{
}
}
~~~


## Finally Use It

![3](/assets/posts/2015-09-26-Gitignore-with-Sublime/6-ignore.png)

Enjoy.
