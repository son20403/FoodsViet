import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Comment = new Schema(
    {
        content: { type: String },
        date: { type: String },
        timestamps: { type: Number },
        id_customer: { type: String },
        id_post: { type: String },
        parent_comment_id: { type: String, default: '' },
        status: { type: String, default: "approved" },
    },
    {
        timestamps: true,
    }
);


module.exports = mongoose.model("Comment", Comment);