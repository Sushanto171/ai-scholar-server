const {
  getCourses,
  createCourse,
  getCourseById,
  updateCourseById,
  deleteCourseById,
  getCategoryList,
} = require("../controllers/coursesController");

const router = require("express").Router();

// GET ALL COURSES
router.get("/", getCourses);

// GET ALL CATEGORY LIST
router.get("/categories", getCategoryList);

// GET A COURSE BY ID
router.get("/:id", getCourseById);

// CREATE A NEW COURSE
router.post("/", createCourse);

// UPDATE A COURSE BY ID
router.patch("/:id", updateCourseById);

// DELETE A COURSE BY ID
router.delete("/:id", deleteCourseById);

module.exports = router;