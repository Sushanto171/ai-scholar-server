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

// GET ALL MY BLOGS BY EMAIL
const AllBlogs = async (req, res, next) => {
  try {
    const email = req.params.email;
    console.log(email);

    const totalBlog = await Blog.find({ email }); // use Blog.find instead of just find
    sendResponse(res, 200, true, "Get all blogs successfully.", totalBlog);
  } catch (error) {
    next(error);
  }
};

const deleteBlog = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedBlog = await Blog.findByIdAndDelete(id);
    sendResponse(res, 200, true, "blog deleted successfully", deletedBlog);
  } catch (error) {
    next(error);
  }
};

const getDataForUpdate = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log("Getting blog with ID:", id);

    const blogInfo = await Blog.findById(id);

    if (!blogInfo) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    sendResponse(res, 200, true, "Get a blog successfully", blogInfo);
  } catch (error) {
    next(error);
  }
};

// PATCH: /blogs/blog/:id
const updatedBlogById = async(req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedBlog = await Blog.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      data: updatedBlog,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
    next(error)
  }
};



module.exports = {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  AllBlogs,
  deleteBlog,
  getDataForUpdate,
  updatedBlogById
};
