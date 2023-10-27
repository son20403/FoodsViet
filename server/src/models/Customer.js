import mongoose from "mongoose";
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-plugin');


const Customer = new Schema(
    {
        user_name: { type: String, require },
        email: { type: String, require },
        password: { type: String, require },
        image: {
            type: String,
            default: "https://img.freepik.com/free-vector/cute-burger-chef-thumbs-up-cartoon-icon-illustration-food-chef-icon-isolated-flat-cartoon-style_138676-3109.jpg",
        },
        full_name: { type: String, require },
        id_image: { type: String, default: "" },
        address: { type: String, default: "" },
        status: { type: Boolean, default: true },
        online: { type: Boolean, default: false },
        favourites: { type: Array, default: [String] },
    },
    {
        timestamps: true,
    }
);
Customer.plugin(slug, {
    tmpl: '<%=full_name%>',
    alwaysUpdate: true,
    slugPaddingSize: 4
});

module.exports = mongoose.model("Customer", Customer);