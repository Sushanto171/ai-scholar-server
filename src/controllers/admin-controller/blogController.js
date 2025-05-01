const Blog = require("../../models/Blog");
const { sendResponse } = require("../../utils/responseHandler");

/* ============================================================
   🔸 CREATE A NEW BLOG (POST /blogs)
=============================================================== */
const createBlog = async (req, res, next) => {
  try {
    const blogData = req.body;

    // VALIDATE IF BLOG DATA EXISTS
    if (!blogData || Object.keys(blogData).length === 0) {
      return sendResponse(res, 400, false, "ALL FIELDS ARE REQUIRED");
    }

    // CREATE A NEW BLOG
    const newBlog = await Blog.create(blogData);
    sendResponse(res, 201, true, "BLOG CREATED SUCCESSFULLY", newBlog);
  } catch (error) {
    next(error);
  }
};

/* ============================================================
   🔸 GET ALL BLOGS (GET /blogs)
=============================================================== */
const getAllBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find().sort({ views: -1, postDate: -1 });
    sendResponse(res, 200, true, "BLOGS RETRIEVED SUCCESSFULLY", blogs);
  } catch (error) {
    next(error);
  }
};

/* ============================================================
   🔸 GET A SINGLE BLOG BY ID (GET /blogs/:id)
=============================================================== */
const getSingleBlog = async (req, res, next) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findById(id);

    if (!blog) {
      return sendResponse(res, 404, false, "BLOG NOT FOUND");
    }

    sendResponse(res, 200, true, "BLOG RETRIEVED SUCCESSFULLY", blog);
  } catch (error) {
    next(error);
  }
};

/* ============================================================
   🔸 GET ALL BLOGS BY AUTHOR EMAIL (GET /blogs/blog/:email)
=============================================================== */
const getBlogsByEmail = async (req, res, next) => {
  try {
    const { email } = req.params;

    if (!email) {
      return sendResponse(res, 400, false, "EMAIL IS REQUIRED");
    }

    const userBlogs = await Blog.find({ email });

    sendResponse(res, 200, true, "BLOGS RETRIEVED SUCCESSFULLY", userBlogs);
  } catch (error) {
    next(error);
  }
};

/* ============================================================
   🔸 DELETE A BLOG BY ID (DELETE /blogs/blog/:id)
=============================================================== */
const deleteBlog = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedBlog = await Blog.findByIdAndDelete(id);

    if (!deletedBlog) {
      return sendResponse(res, 404, false, "BLOG NOT FOUND");
    }

    sendResponse(res, 200, true, "BLOG DELETED SUCCESSFULLY", deletedBlog);
  } catch (error) {
    next(error);
  }
};

/* ============================================================
   🔸 GET A BLOG FOR UPDATE (GET /blogs/update/:id)
=============================================================== */
const getDataForUpdate = async (req, res, next) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findById(id);

    if (!blog) {
      return sendResponse(res, 404, false, "BLOG NOT FOUND");
    }

    sendResponse(res, 200, true, "BLOG DATA RETRIEVED SUCCESSFULLY", blog);
  } catch (error) {
    next(error);
  }
};

/* ============================================================
   🔸 UPDATE A BLOG BY ID (PATCH /blogs/blog/:id)
=============================================================== */
const updateBlogById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedBlog = await Blog.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedBlog) {
      return sendResponse(res, 404, false, "BLOG NOT FOUND");
    }

    sendResponse(res, 200, true, "BLOG UPDATED SUCCESSFULLY", updatedBlog);
  } catch (error) {
    next(error);
  }
};

/* ============================================================
   🔸 INCREMENT BLOG VIEWS (PATCH /blogs/views/:id)
=============================================================== */
const incrementBlogViews = async (req, res, next) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findByIdAndUpdate(
      id,
      { $inc: { views: 1 } },
      { new: true }
    );

    if (!blog) {
      return sendResponse(res, 404, false, "BLOG NOT FOUND");
    }

    sendResponse(res, 200, true, "VIEW COUNT UPDATED", blog);
  } catch (error) {
    next(error);
  }
};

/* ============================================================
   🔹 EXPORT ALL BLOG CONTROLLER FUNCTIONS
=============================================================== */
module.exports = {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  getBlogsByEmail,
  deleteBlog,
  getDataForUpdate,
  updateBlogById,
  incrementBlogViews,
};