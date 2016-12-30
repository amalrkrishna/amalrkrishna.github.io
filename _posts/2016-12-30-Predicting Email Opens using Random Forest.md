---
layout: post
title:  Predicting Email Opens using Random Forest
tags:
- R
- Prediction
- Random Forest
- Classification
---

<p align="justify">This is a documentation for Predicting Email Opens question of the Machine Learning Codesprint Competition conducted by HackerRank. <br><br>

<i>The problem statement is as follows:</i><br>

We will provide you with metadata for emails sent to HackerRank users over a certain period of time. This metadata contains specific information about:
<ul>
<li>The user the email was sent to.</li>
<li>The email that was sent.</li>
<li>The user's reaction to the email, including (among other things) whether or not the user opened the email.</li>
</ul>

Given the metadata for additional future emails, you must predict whether or not each user will open an email.<br><br>

<i>Dataset details:</i><br>

Download the zip file (MD5 checksum is eaed376534b4b5efa464214d9838a139) provided <a href="https://www.hackerrank.com/external_redirect?to=https://s3.amazonaws.com/hr-testcases-us-east-1/24184/assets/hackerrank-predict-email-opens-dataset.zip" target="_blank">here</a>. The zip file contains files named training_dataset.csv, test_dataset.csv, and attributes.pdf. The files are organized as follows:<br>
<ul>
<li>training_dataset.csv: This file contains the details for various emails sent. If an email was opened, then the value of the opened attribute is 1; otherwise, its value is 0.</li>

<li>test_dataset.csv: This file contains the test dataset. All fields relevant to the user's reaction to the email are missing in this dataset. You must predict the value of the opened attribute for each email.</li>

<li>attributes.pdf: This file contains definitions for all the attributes given in the dataset.</li>
</ul>
Click <a href="https://www.hackerrank.com/contests/machine-learning-codesprint/challenges/hackerrank-predict-email-opens" target="_blank">here</a> for the complete description of the problem statement and attribute details.</p>

<ol>
<li>Installing Dependencies</li>

{% highlight css %}
$ apt-get install python-all libc-dev perl libtool kernel-package libssl-dev
{% endhighlight %}

</ol> 
