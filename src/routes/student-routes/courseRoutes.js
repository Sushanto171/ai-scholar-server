const {
  getAllStudentViewCourses,
  getStudentViewCourseDetails,
  checkCoursePurchaseInfo,
} = require("../../controllers/student-controller/courseController");

const router = require("express").Router();

// 🔸 GET ALL COURSES FOR STUDENT VIEW (GET /student/courses/get-courses)
router.get("/get-courses", getAllStudentViewCourses);

// 🔸 GET COURSE DETAILS BY ID (GET /student/courses/get-course/details/:id)
router.get("/get-course/details/:id", getStudentViewCourseDetails);

// 🔸 CHECK PURCHASE INFO (GET /student/courses/purchase-info/:id/:studentId)
router.get("/purchase-info/:id/:studentId", checkCoursePurchaseInfo);

module.exports = router;