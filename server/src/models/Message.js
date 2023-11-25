import mongoose from "mongoose";
const Schema = mongoose.Schema;


const Message = new Schema(
    {
      conversationId: {
        type: String,
      },
      sender:{ type: String },
      text:{
        type:String
      },
      isRead: {
          type: Array,
      }
    },
    {
        timestamps: true,
    }
);
;

module.exports = mongoose.model("Message", Message);