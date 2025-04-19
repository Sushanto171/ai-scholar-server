const Blog = require("../../models/Blog");
const { sendResponse } = require("../../utils/responseHandler");

const createBlog = async (req, res, next) => {
  try {
    const blogData = req.body;
    console.log(blogData)

    if (!blogData || Object.keys(blogData).length === 0) {
      return sendResponse(res, 400, false, "ALL FIELDS ARE REQUIRED");
    }

    const result = await Blog.create(blogData); 
    sendResponse(res, 201, true, "BLOG CREATED SUCCESSFULLY", result);
  } catch (error) {
    next(error);
  }
};

module.exports = { createBlog };
