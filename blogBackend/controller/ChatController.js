const Chat = require("../model/ChatCreate");
const jwt = require("jsonwebtoken");
const  userCheck = require("./posts.controller")
//save message in database
const saveMsg = async (request,response)=>{
    try{
        const {receiverId,senderId,messageBody} =request.body;
        const chat = new Chat({receiverId,senderId,messageBody});
        const saveChat = await chat.save();
        if(saveChat){
            response.status(200).json({message:"message save "})
        }
    }catch(error){
      response.status(500).json({message:"internal problem"})
    }
}
//select message
const fetchMessage = async (request,response)=>{
    try{
        const {userId} = request.body;
        const user_id = userCheck.checkuserId(userId)
        const message = await Chat.find({receiverId:user_id.id});
        if(message){
            response.status(200).json(message);
        }  
    }catch(error){
        response.status(500).json({message:"server problem",error})
    }
}
module.exports ={saveMsg,fetchMessage}