const {
  getCoursesByStudentId,
} = require("../../controllers/student-controller/studentCoursesController");

const router = require("express").Router();

// 🔸 GET STUDENT COURSES (GET /student/enrolled-courses/get-courses/:studentId)
router.get("/get-courses/:studentId", getCoursesByStudentId);

module.exports = router;