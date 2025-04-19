const { createBlog, getAllBlogs, getSingleBlog } = require("../../controllers/blog-controller/blogController");

const router = require("express").Router();

router.post('/', createBlog);

router.get('/', getAllBlogs);

router.get("/:id", getSingleBlog)

module.exports = router;