const { createBlog } = require("../../controllers/blog-controller/blogController");

const router = require("express").Router();

router.post('/', createBlog);

module.exports = router;