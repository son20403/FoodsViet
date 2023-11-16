import mongoose from 'mongoose';
import Message from '../models/Message';

class MessageController {
    constructor() {
        
    }

    addMessage = async (req,res)=>{
        const newMessage = new Message(req.body);
  try {
    const conversation = await mongoose.model('Conversation').findOne({ _id: req.body.conversationId });
    if (conversation) {
      conversation.timestamp = new Date();
      await conversation.save();
    }
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (err) {
    res.status(500).json(err);
  }
    }
    getMessage = async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
}
}

const messageController = new MessageController(Message);
module.exports = messageController;