---
layout: post
title:  Predicting Email Opens using Random Forest
tags:
- R
- Prediction
- Random Forest
- Classification
---

<img src="https://s27.postimg.org/a8v4rjunn/Screenshot_from_2016_12_30_22_24_43.png" width="100%"> 

<p align="justify">This is a documentation for Predicting Email Opens challenge of the Machine Learning Codesprint Competition conducted by HackerRank. <br>

<ul>
<li><b>The problem statement is as follows:</b></li>
<p align="justify">We will provide you with metadata for emails sent to HackerRank users over a certain period of time. This metadata contains specific information about:</p>
<ul>
<li>The user the email was sent to.</li>
<li>The email that was sent.</li>
<li>The user's reaction to the email, including (among other things) whether or not the user opened the email.</li>
</ul>

Given the metadata for additional future emails, you must predict whether or not each user will open an email.<br>

<li><b>Dataset details:</b></li>
<p align="justify">Download the zip file (MD5 checksum is eaed376534b4b5efa464214d9838a139) provided <a href="https://www.hackerrank.com/external_redirect?to=https://s3.amazonaws.com/hr-testcases-us-east-1/24184/assets/hackerrank-predict-email-opens-dataset.zip" target="_blank">here</a>. The zip file contains files named training_dataset.csv, test_dataset.csv, and attributes.pdf. The files are organized as follows:</p><br>
<ul>
<li>training_dataset.csv: This file contains the details for various emails sent. If an email was opened, then the value of the opened attribute is 1; otherwise, its value is 0.</li>
<li>test_dataset.csv: This file contains the test dataset. All fields relevant to the user's reaction to the email are missing in this dataset. You must predict the value of the opened attribute for each email.</li>
<li>attributes.pdf: This file contains definitions for all the attributes given in the dataset.</li>
</ul>
</ul>
Click <a href="https://www.hackerrank.com/contests/machine-learning-codesprint/challenges/hackerrank-predict-email-opens" target="_blank">here</a> for the complete description of the problem statement and attribute details.</p><br>


<b>Solution to Predicting Email Opens Challenge</b><br>
<p align="justify">Initially I started to code in Python, but later shifted to R as I wanted to imporve my R programming skills. Also I did not want to limit to Python for predictive analytics. I attempted this contest when I was still a novice in data analytics couple of months back, with further experience you can easily improve this model.</p>

<b>Importing the libraries:</b><br>
Here we import the necessary libraries. We use data.tables library which is similar to scikit-learn library in Python.
{% highlight css %}
library(utils)
library(data.table)
library(randomForest)
{% endhighlight %}

<b>Reading the data:</b><br>
Read training and test data from the csv files using fread.
{% highlight css %}
train <- fread('training_dataset.csv')
test <- fread('test_dataset.csv')
{% endhighlight %}

<b>Training Dataset Quality:</b><br>
<p align="justify">The data size was enough to learn the model and can be loaded fully into single machine. There are many features which has no role in deciding the outcome of model like feature 'mail_id', 'sent_time' etc. There are also many features which are only on training data and not in test data given like 'click_time' , 'clicked', 'open_time', 'unsubscribe_time' etc. which have to removed from train data. Dataset was very sparse as most of the values in features like count of submission on 1 days and other features on small no of days were zero. Many features in dataset contain missing values like 'hacker_timezone', 'last_online', 'mail_type', 'mail_category'.</p>

<b>Data Preprocessing:</b><br>
<ul>

<li>Conversion of Categorical features:</li> 
<p align="justify">Features like 'opened' having True /False are replaced by 1/0 and like 'mail_type' and 'mail_category' by their respective number.</p>
{% highlight css %}
target <- train$opened
target[target=='false'] <- 0
target[target=='true'] <- 1
target <- as.numeric(target)
train$opened<-target
test$opened <- "NA"
{% endhighlight %}

<li>Removal of unwanted feature:</li>
<p align="justify">Remove features from training data which are not in test data like click_time", "open_time", "clicked", "unsubscribe_time", "unsubscribed". Later you will be able to see that we will feed only positive features to the training model.</p>
{% highlight css %}
train[,c("click_time","open_time","clicked","unsubscribe_time","unsubscribed"):=NULL]
total<- rbind(train, test)
{% endhighlight %}

<li>Errors in Training dataset and Missing value:</li>
<p align="justify">Many features in dataset contain missing values like 'hacker_timezone', 'last_online', 'mail_type', 'mail_category' so they have to replaced by some standard statistical measure like mode, median or mean.</p>
{% highlight css %}
Mode <- function(x) {
  ux <- x[!is.na(x)]
  ux[which.max(tabulate(match(x, ux)))]
}
Mean <- function(x) {
  if (all(is.na(x))){
    return(NA)
  }
  else{
    x<-as.numeric(x)
    ux <- x[!is.na(x)]
    return(mean(ux))
  }
}
{% endhighlight %}

<li>Feature construction:</li>
<p align="justify">One huge uplift to the score was when I constructed one feature on average score 'opened_by' grouped by user. Merged train and test in one and take the mean over each user. Then we will split them up again.</p>
{% highlight css %}
total[ ,c("group_by_id_mean"):= Mean(opened), by = c("user_id")]
train <- total[1:nrow(train), ]
test <- total[-c(1:nrow(train)), ]
train$hacker_confirmation <- as.integer(as.logical(train$hacker_confirmation))
test$hacker_confirmation <- as.integer(as.logical(test$hacker_confirmation))
{% endhighlight %}
</ul>

<b>Model Fitting and Prediction:</b>
<p align="justify">After construction I applied Random Forest Classifer for Model fitting. I have also used other classifiers like Logistic Regression and AdaBoost Classifer among which Random Forest was giving best result and I have tuned random forest using its best parameters like 'ntree'=10 etc.</p> 
{% highlight css %}
modelFit <- randomForest(as.factor(opened) ~ group_by_id_mean + sent_time + last_online + hacker_created_at + contest_login_count + contest_login_count_1_days + contest_login_count_7_days + contest_login_count_30_days + contest_participation_count + contest_participation_count_1_days + contest_participation_count_7_days + contest_participation_count_30_days + submissions_count_contest + hacker_confirmation,
                         data=train, 
                         ntree=10, 
                         mtry=5, 
                         importance=TRUE, na.action=na.roughfix)
model_pred <- predict(modelFit, test)
{% endhighlight %}

<b>Writing to file:</b><br>
Writing the Model prediction to a csv file using write.csv.
{% highlight css %}
write.csv(model_pred, file = "predR.csv")
{% endhighlight %}

<img src="https://s23.postimg.org/ma43p22tn/Pics_Art_12_31_12_13_51.jpg" width="100%"> 

<img src="https://s27.postimg.org/fghsa6axf/Pics_Art_12_31_12_14_24.jpg" width="100%"> 

<p align="justify">In conclusion, I found that this model can be improved by using XGBoost model. Doing further feature extraction like splitting 'sent_time' into date, time etc plus crossvalidation on folds would give you better results. Nevertheless, a simple Random Forest is good way to start.</p>
