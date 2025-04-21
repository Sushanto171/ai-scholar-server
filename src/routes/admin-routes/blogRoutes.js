const {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  AllBlogs,
  deleteBlog,
  getDataForUpdate,
  updatedBlogById,
} = require("../../controllers/admin-controller/blogController");

const router = require("express").Router();

router.post("/", createBlog);

router.get("/", getAllBlogs);

router.get("/:id", getSingleBlog);

router.get("/blog/:email", AllBlogs);

router.delete("/blog/:id", deleteBlog);

router.get("/update/:id", getDataForUpdate);

router.patch("/blog/:id", updatedBlogById);

module.exports = router;