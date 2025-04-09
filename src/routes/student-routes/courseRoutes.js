const express = require("express");
const {
  getStudentViewCourseDetails,
  getAllStudentViewCourses,
  checkCoursePurchaseInfo,
} = require("../../controllers/student-controller/course-controller");

const router = express.Router();

router.get("/get-courses", getAllStudentViewCourses);
router.get("/get-course/details/:id", getStudentViewCourseDetails);

module.exports = router;