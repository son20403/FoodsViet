import mongoose from "mongoose";
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-plugin');

const Post = new Schema(
    {
        title: { type: String, require },
        content: { type: String, require },
        category: { type: String, require },
        views: { type: Number, default: 0 },
        image: { type: String, default: "", require },
        date: { type: String, require },
        timestamps: { type: Number, require },
        id_customer: { type: String, require },
        id_image: { type: String, default: "" },
        id_admin: { type: String, default: "" },
        status: { type: String, default: "pending" },
        likes: { type: Array, default: [String] },
        authorType: { type: String, default: "customer" },
    },
    {
        timestamps: true,
    }
);
Post.plugin(slug, {
    tmpl: '<%=title%>',
    alwaysUpdate: true,
    slugPaddingSize: 4
});

module.exports = mongoose.model("Post", Post);