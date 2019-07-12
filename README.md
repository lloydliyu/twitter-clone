# twitter-clone

Built using JavaScript (feathersJS, VueJS) and MongoDB.

## Description
Basic clone of twitter that allows logged in users to make a post and see a feed of all posts and like posts. Feed is in realtime using FeathersJS. Could be further improved by allowing you to see all the posts of a single user, and to have subscriptions.

## Dev Setup

## To do

* [x] Generate the server
* [x] Generate the client
* [x] Add local auth to server
* [x] Add feathers-vuex to client
* [x] Add vuetify to client
* [X] Add login to client
* [X] Add Post service to server
* [x] Add Like service to server
* [x] Users can create/list posts on client
  * [x] Create
    * [x] Add OwnerId
  * [x] List
  * [ ] Display image if included
* [x] Users can create/list/view/delete likes on client
  * [ ] Validate like is unique scoped to the user and post
  * [x] Create
    * [x] Add PostId
    * [x] Add UserId
  * [ ] Delete
    * [ ] Restrict to owner 
* [ ] Display logged in user's avatar
* [x] Display author avatar
* [ ] Likes update in realtime
* [ ] Enforce Image URL rules for posts and avatars
* [ ] Refactor client side code
* [ ] Testing suite
* [ ] Dev set up guide