
# Stackoverflow -lite

[![Coverage Status](https://coveralls.io/repos/github/DamilareAlagbe/stackoverflow_lite/badge.svg?branch=main)](https://coveralls.io/github/DamilareAlagbe/stackoverflow_lite?branch=main)


A question and answer platform where users can sign up,login,ask questions and get answers  


## Features

1. Users can create an account and log in.
2. Users can post questions.
3. Users can delete the questions they post.
4. Users can post answers.
5. Users can view the answers to questions.
6. Users can accept an answer out of all the answers to his/her question as the preferred
answer.

7. Users can upvote or downvote an answer.
8. Users can comment on an answer.
9. Users can fetch all questions he/she has ever asked on the platform


## Tech Stack

**Server:** Node.js, Express

**database:** Mysql,sequelize

**Testing framework:** Mocha , chai
## Endpoints Description

### user Endpoints
* post "api/v1/users/signup" -This is the endpoint for the signing up of a new account 

* post "api/v1/users/login" -This is the logging in endpoint 

* get "api/v1/users/me" - This is called to get the current user at that moment in time. Only registerd users can call this endpoint 


### Question Endpoints 
* post "api/v1/question" - This is called when a new question is to be posted,only registered users can post a question on the platform

* get "/api/v1/questions"  -This is called to get all questions on the platform 

* get "/api/v1/questions/userquestions" -This is to get all the questions a user has ever asked on the platform,only registered users have access to this endpoint.
 
* get "/api/v1/questions/:id" - This gets a particular question by it's id 

* delete "/api/v1/questions/:id" - This deletes a particular question,only user that asked the question can delete it.


### Answer Endpoints 
* post "/api/v1/questions/:id/answer" - This is called when a new answer is to be posted,only registered users can post an answer 

* get "/api/v1/questions/:id/answer" - This gets all answers to a question.

* put "/api/v1/answer/:id/upvote" - This is called in order to upvote an answer 

* put "/api/v1/answer/:id/downvote" - This is called in order to downvote an answer 

* put "/api/v1/answer/:id/accept"  - An answer can only be accepted by the user that posted the question,this end point is responsible for that 


### Comment Endpoints 

* post "/api/v1/answer/:id/comment" - This is called when a new comment is to be posted 

* get "/api/v1/answer/:id/comment" - This is called to get all comments to an answer

* delete "/api/v1/comment/:id" - This deletes a comment,only authorized users can delete a comment 







## Author

- [@DamilareAlagbe](https://github.com/DamilareAlagbe)

