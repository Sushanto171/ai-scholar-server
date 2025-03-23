const {
  getCourses,
  createCourse,
  getCourseById,
} = require("../controllers/coursesController");

const router = require("express").Router();

// get all courses
router.get("/", getCourses);

// get a course by id
router.get("/:id", getCourseById);

// create a new course
router.post("/", createCourse);

module.exports = router;
