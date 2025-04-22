// 🔸 IMPORT BLOG CONTROLLER FUNCTIONS
const {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  AllBlogs,
  deleteBlog,
  getDataForUpdate,
  updatedBlogById,
} = require("../../controllers/admin-controller/blogController");

// 🔸 INITIALIZE EXPRESS ROUTER
const router = require("express").Router();

/**
 * ================================
 *        BLOG MANAGEMENT ROUTES
 * ================================
 */

// 🔸 CREATE A NEW BLOG (POST /blogs)
router.post("/", createBlog);

// 🔸 GET ALL BLOGS FROM DATABASE (GET /blogs)
router.get("/", getAllBlogs);

// 🔸 GET A SINGLE BLOG BY ID (GET /blogs/:id)
router.get("/:id", getSingleBlog);

// 🔸 GET ALL BLOGS BY A USER'S EMAIL (GET /blogs/blog/:email)
router.get("/blog/:email", AllBlogs);

// 🔸 DELETE A BLOG BY ID (DELETE /blogs/blog/:id)
router.delete("/blog/:id", deleteBlog);

// 🔸 GET BLOG DATA FOR UPDATE FORM (GET /blogs/update/:id)
router.get("/update/:id", getDataForUpdate);

// 🔸 UPDATE BLOG DATA BY ID (PATCH /blogs/blog/:id)
router.patch("/blog/:id", updatedBlogById);

module.exports = router;