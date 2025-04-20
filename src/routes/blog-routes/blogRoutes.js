const { createBlog, getAllBlogs, getSingleBlog, AllBlogs, deleteBlog } = require("../../controllers/blog-controller/blogController");

const router = require("express").Router();

router.post('/', createBlog);

router.get('/', getAllBlogs);

router.get("/:id", getSingleBlog);

router.get("/blog/:email", AllBlogs);

router.delete("/blog/:id", deleteBlog)

module.exports = router;