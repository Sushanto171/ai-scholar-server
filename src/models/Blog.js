// 🔸 IMPORT MONGOOSE FOR SCHEMA DEFINITION
const mongoose = require("mongoose");

// 🔸 DEFINE BLOG SCHEMA STRUCTURE
const BlogSchema = new mongoose.Schema({
  titleData: {
    type: String, // BLOG TITLE
    required: true,
  },

  banner: {
    type: String, // BANNER IMAGE URL
    required: true,
  },

  descriptionData: {
    type: String, // BLOG CONTENT / DESCRIPTION
    required: true,
  },

  postDate: {
    type: Date, // BLOG POST DATE (DEFAULT TO CURRENT DATE)
    default: Date.now,
  },

  email: {
    type: String, // AUTHOR EMAIL ADDRESS
  },

  profile: {
    type: String, // AUTHOR PROFILE IMAGE URL
  },

  author: {
    type: String, // AUTHOR NAME
    required: true,
  },
});

// 🔸 CREATE BLOG MODEL USING THE SCHEMA
const Blog = mongoose.model("Blog", BlogSchema);

// 🔸 EXPORT BLOG MODEL FOR USE IN CONTROLLERS
module.exports = Blog;