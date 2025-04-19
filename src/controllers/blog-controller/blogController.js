const Blog = require("../../models/Blog");
const { sendResponse } = require("../../utils/responseHandler");

//create a new blog
const createBlog = async (req, res, next) => {
  try {
    const blogData = req.body;

    if (!blogData || Object.keys(blogData).length === 0) {
      return sendResponse(res, 400, false, "ALL FIELDS ARE REQUIRED");
    }

    const result = await Blog.create(blogData);
    sendResponse(res, 201, true, "BLOG CREATED SUCCESSFULLY", result);
  } catch (error) {
    next(error);
  }
};

// get all blogs
const getAllBlogs = async (req, res, next) => {
  try {
    const blogInfo = await Blog.find();
    sendResponse(res, 200, true, "blog RETRIEVED SUCCESSFULLY", blogInfo);
  } catch (error) {
    next(error);
  }
};

//get a blog by id
const getSingleBlog = async (req, res, next) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    sendResponse(res, 200, true, "get blog successfully", blog);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createBlog,
  getAllBlogs,
  getSingleBlog
};
