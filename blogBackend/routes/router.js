const express =require("express");
const render = require("../render/render");
const userController = require("../controller/user.controller");
const postController = require('../controller/posts.controller')
const validation = require("../validateRoute/valid.route.js");
const chatController = require("../controller/ChatController");
const route =express.Router();
route.get('/',render.homeRoute);
//user routing
route.post('/api/createuser',userController.createUser);
route.get('/api/userfind',userController.findbyemail);
route.post('/api/loginuser',userController.login);
route.post('/api/userdetails',userController.userdetailsRoute);
route.post('/api/updateusdetails',userController.updateUserDetails);
route.post('/api/showuserdetils',userController.userDetails);
route.post('/api/profilepicupload',userController.profilePhotoUpload);
route.post('/api/avatar',userController.user_profile_photo);
route.post('/api/userfindformessage',userController.Find_user);
//post routing
route.post('/api/createpost',postController.createPost);
route.post('/api/showallpost',postController.showPost);
route.post("/api/usersinglepost",postController.postByUserId);
route.post("/api/updatepost",postController.updatePost);
route.post('/api/deleteuserpost',postController.deletePost);
route.post('/api/searchpost',postController.search);

//chat rute
route.post("/api/messagesave",chatController.saveMsg);
route.post("/api/messageshow",chatController.fetchMessage);
route.post("/api/chatMessage",chatController.chatMessage)
//route for test
route.get('/api/validroute',validation,userController.valid);
module.exports =route;