---
layout: post
title:  How to upload projects to Github
tags:
- Git
- GitHub
- Projects
- Post
---

<p align="justify">Create a new repository on GitHub. To avoid errors, do not initialize the new repository with README, license, or gitignore files. You can add these files after your project has been pushed to GitHub. Open Terminal (for Mac users) or the command prompt (for Windows and Linux users) and go iniside the folder to be uploaded.</p>

<ol>
<li>If upload of the project is from scratch</li>
{% highlight css %}
$ git init
$ git add .
$ git commit -m "write comment here"
$ sudo git remote add origin https://github.com/username/projectname
$ git pull origin master [add --force if it doesn't work]
$ git push origin master [add --force if it doesn't work]
{% endhighlight %}

<li>Upload an existing project</li>
{% highlight css %}
$ git init
$ git add .
$ git commit -m "write comment here"
$ sudo git remote add origin https://github.com/username/projectname
$ git push origin master [add --force if it doesn't work]
{% endhighlight %}

<li>Updating each time after upload</li>
{% highlight css %}
$ git add .
$ git commit -m "write comment here"
$ git push origin master [add --force if it doesn't work]
{% endhighlight %}
</ol> 
