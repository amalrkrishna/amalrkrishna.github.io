---
layout: post
title:  How to upload projects to Github
tags:
- Git
- GitHub
- Projects
- Repository
---

<img src="http://img11.deviantart.net/1071/i/2011/214/f/3/github_social_coding_backgroun_by_dot_mh-d42o7fq.jpg" alt="How to upload projects to Github" width="100%"> 

<p align="justify">Create a new repository on GitHub. To avoid errors, do not initialize the new repository with README, license, or gitignore files. You can add these files after your project has been pushed to GitHub. Open Terminal (for Mac users) or the command prompt (for Windows and Linux users) and go iniside the folder to be uploaded.</p>

<ol>
<li>If upload of the project is from scratch</li>
{% highlight css %}
$ git init
$ git add .
$ git commit -m "write comment here"
$ sudo git remote add origin https://github.com/username/projectname
$ git pull origin master
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
