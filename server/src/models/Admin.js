import mongoose from "mongoose";
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-plugin');
const slugify = require('slugify');

const Admin = new Schema(
  {
    user_name: { type: String },
    email: { type: String, default: "" },
    password: { type: String },
    image: {
      type: String,
      default: "https://e7.pngegg.com/pngimages/166/90/png-clipart-computer-icons-user-setting-icon-miscellaneous-monochrome.png",
    },
    full_name: { type: String, default: "" },
    id_image: { type: String, default: "" },
    address: { type: String, default: "" },
    admin: { type: Boolean, default: true },
    role: { type: String, default: "staff" },
    boss: { type: Boolean, default: false },
    date: { type: String, default: "" },
    timestamps: { type: Number },
    status: { type: String, default: 'pending' },
    online: { type: Boolean, default: false },
    timeOnlined: { type: Number },
  },
  {
    timestamps: true,
  }
);
Admin.plugin(slug, {
  tmpl: '<%=full_name%>',
  alwaysUpdate: true,
  slugPaddingSize: 4
});
Admin.pre('findOneAndUpdate', async function () {
  console.log('findOneAndUpdate hook activated');
  if (this._update.title) {
    console.log('Updating slug based on updated title');
    const updatedTitle = this._update.title;
    this.set({ slug: slugify(updatedTitle, { lower: true }) });
  }
});

module.exports = mongoose.model("Admin", Admin);
