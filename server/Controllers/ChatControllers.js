import ChatModel from '../Models/chatModel.js'
import MessageModel from "../models/messageModel.js";
export const createChat = async (req, res) => {
  //creating chat
  const newChat = new ChatModel({
    members: [req.body.senderId, req.body.receiverId],
  });
  try {
    //saving new chat
    const result = await newChat.save();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const userChats = async (req, res) => {
    try {
      const chat = await ChatModel.find({
        members: { $in: [req.params.userId] },
      });
      res.status(200).json(chat);
    } catch (error) {
      res.status(500).json(error);
    }
  };

  export const findChat = async (req, res) => {
    try {
      const chat = await ChatModel.findOne({
        members: { $all: [req.params.firstId, req.params.secondId] },
      });
      res.status(200).json(chat)
    } catch (error) {
      res.status(500).json(error)
    }
  };  
export const deleteChat=async(req,res)=>{
  const Id=req.params.chatId
  const chatId=Id
  console.log(Id);
  try{
    const del =await ChatModel.findById(Id)
    if(del){
      await del.deleteOne()
    res.status(200).json('chat deleted sucessfully')
    }else{
      res.status(400).json('chat not deleted')
    }
  }catch(error){
    res.status(500).json(error)
  }
}

