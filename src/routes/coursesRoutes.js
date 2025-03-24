const {
  getCourses,
  createCourse,
  getCourseById,
  updateCourseById,
  deleteCourseById,
} = require("../controllers/coursesController");

const router = require("express").Router();

// get all courses
router.get("/", getCourses);

// get a course by id
router.get("/:id", getCourseById);

// create a new course
router.post("/", createCourse);

// update a course by id
router.patch("/:id", updateCourseById);

// delete a course by id
router.delete("/:id", deleteCourseById);

module.exports = router;
