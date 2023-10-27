import mongoose from "mongoose";
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-plugin');


const Categories = new Schema(
    {
        title: { type: String },
        image: { type: String, default: "", require },
        id_image: { type: String, default: "" },
        date: { type: String },
        timestamps: { type: Number },
    },
    {
        timestamps: true,
    }
);
Categories.plugin(slug, {
    tmpl: '<%=title%>',
    alwaysUpdate: true,
    slugPaddingSize: 4
});

module.exports = mongoose.model("Categories", Categories);