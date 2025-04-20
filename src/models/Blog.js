const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema(
  {
    titleData: { type: String, required: true },
    banner: { type: String, required: true },
    descriptionData: { type: String, required: true },
    postDate: { type: Date, default: Date.now },
    email: { type: String, required: true },
    profile: { type: String, required: true },
    author: { type: String, required: true },
  },
);

const Blog = mongoose.model("Blog", BlogSchema);
module.exports = Blog;
