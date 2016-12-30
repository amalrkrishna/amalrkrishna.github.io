---
layout: post
title:  Predicting Email Opens using Random Forest
tags:
- R
- Prediction
- Random Forest
- Classification
---

<img src="https://s27.postimg.org/je93ph6ar/Screenshot_from_2016_12_30_22_24_43.png" width="100%"> 

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
Click <a href="https://www.hackerrank.com/contests/machine-learning-codesprint/challenges/hackerrank-predict-email-opens" target="_blank">here</a> for the complete description of the problem statement and attribute details.</p><br>


<b>Solution to Predicting Email Opens Challenge</b><br>

<p align="justify">Initially I started to code in Python, but later shifted to R as I wanted to get to used to better R programming and myself did not want to limit to Python for predictive analytics.</p><br>

Importing the libraries:<br>
{% highlight css %}
library(utils)
library(data.table)
{% endhighlight %}
Here we use data.tables library. This is similar to the scikit-learn library in Python.

{% highlight css %}
train <- fread('training_dataset.csv')
test <- fread('test_dataset.csv')
{% endhighlight %}

Training Dataset Quality:<br>
<p align="justify">The data size was enough to learn the model and can be loaded fully into single machine. There are many features which has no role in deciding the outcome of model like feature 'mail_id', 'sent_time' etc. There are also many features which are only on training data and not in test data given like 'click_time' , 'clicked', 'open_time', 'unsubscribe_time' etc. which have to removed from train data. Dataset was very sparse as most of the values in features like count of submission on 1 days and other features on small no of days were zero. Many features in dataset contain missing values like 'hacker_timezone', 'last_online', 'mail_type', 'mail_category'.</p><br>

Errors in Training dataset:<br>
<p align="justify">Many features in dataset contain missing values like 'hacker_timezone', 'last_online', 'mail_type', 'mail_category' so they have to replaced by some standard statistical measure like mode, median or mean.</p><br>

Data Preprocessing:<br>
<p align="justify">Removal of unwanted feature: Remove features from training data which are not in test data. Some feature like 'mail_id' was having no effect as from each type half of their mail sent are read and 'sent_time' was also not having any affect.
Conversion of Categorical features:   Feaature like 'opened' having True /False are replaced by 1/0 and like 'mail_type' and 'mail_category' by their respective number.</p><br>

Missing value: <br>
<p align="justify">There are many feature having missing values like for 'mail_type' we replaced it by its mode (categorical data) which was 'mail_type1' and 'mail_category' mode was 'mail_category18' , for 'hacker_time_zone' and 'last_online' we raplaced it by median.
Feature construction: The features like related to submission count , notification count and contest count are sapase so their value are replaced by their weighted average like 'submissions_count_master_1_days'/1 +'submissions_count_master_7_days'/7  and so on....for other features of this type . There was a very informative feature like whether a user has opened any mail or not and fraction of opened mail to total mail sent.</p>
