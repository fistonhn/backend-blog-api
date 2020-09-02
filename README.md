# backend-blog-api

[![Build Status](https://travis-ci.org/fistonhn/backend-blog-api.svg?branch=develop)](https://travis-ci.org/fistonhn/backend-blog-api) [![Coverage Status](https://coveralls.io/repos/github/fistonhn/backend-blog-api/badge.svg?branch=develop)](https://coveralls.io/github/fistonhn/backend-blog-api?branch=develop)
# Project Overview

backend-blog-api is a sever side for blog related website

# Deployment

- A user interface on netlify can be found at : 
 <a href="https://fiston.netlify.app/html/admin.html"> https://fiston.netlify.app/html/admin.html</a>

- A heroku app for API can be found at : 
 <a href="https://backend-blog-api-fiston.herokuapp.com"> https://backend-blog-api-fiston.herokuapp.com</a>
  
- The documenation of the API can be found at : 
 <a href="https://backend-blog-api-fiston.herokuapp.com/api/swaggerDocument"> https://backend-blog-api-fiston.herokuapp.com/swaggerDocument</a>

# Features


  # User rofile

- A user can create an account if he doesn't have one
- A user can log in to his account if he does have it
- A admin can view all users.
- A admin can view specific user profile information.
- A admin can modify specific user information.
- A admin can delete specific user.


  # Messages

- A admin can view all messages.
- A admin can view specific message.
- A admin can delete specific message.
- A user can create a message


  # Comments

- A user can view all comments.
- A user can create a comment
- A user can view specific comment.
- A admin can delete specific comment.


  # Blogs

- A user can view all blogs.
- A user can view specific blog.
- A user can dd a blog.
- A user can modify his/her blog.
- A user can delete his/her blog.


# Built With

- Node.js
- Express framework

# users Api Endpoints

- POST    /auth/signup                               - Create user account 
- POST    /auth/signin                               - Login a user
- GET     /api/auth/users                            - User can get all users   
- PATCH   /api/auth/users/:id                        - User can modify an user                
- GET     /api/auth/user/:id                         - User can get specific user  
- DELETE  /api/auth/user/:id                         - User can delete an user 


# blogs Api Endpoints

- POST    /api/blogs                                 - User can create blog
- GET     /api/blogs                                 - User can get all blogs   
- PATCH   /api/blog/:id                              - User can modify an blog                
- GET     /api/blog/:id                              - User can get specific blog  
- DELETE  /api/blog/:id                              - User can delete an blog 


# comments Api Endpoints

- POST    /api/comment                               - User can create comment 
- GET     /api/api/comments                          - User can get all comments   
- PATCH   /api/comments/:id                          - User can modify an comment                
- GET     /api/comments/:id                          - User can get specific comment  
- DELETE  /api/comments/:id                          - User can delete an comment 


# messages Api Endpoints

- POST    /api/messages                              - User can create message
- GET     /api/messages                              - User can get all messages   
- PATCH   /api/message/:id                           - User can modify an message                
- GET     /api/message/:id                           - User can get specific message  
- DELETE  /api/message/:id                           - User can delete an message 

# Installation
- Run git clone https://github.com/fistonhn/backend-blog-api
- Run npm `install` to download and install all packages
- Run npm `devStart` to start the server
- Run npm `test` to test all API
- And then Test the end points using postman or your browser

# Contributing
> You can contribute to this project by forking the project  https://github.com/fistonhn/backend-blog-api

> And then submit your changes by creating a new pull request  https://github.com/fistonhn/backend-blog-api/compare

### Author

[HABIMANA Fiston](https://github.com/fistonhn)

# Acknowledgments

- [Andela Kigali](https://andela.com/)
