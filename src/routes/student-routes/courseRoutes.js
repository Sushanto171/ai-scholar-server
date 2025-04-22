// 🔸 IMPORT STUDENT COURSE CONTROLLER FUNCTIONS
const {
  getAllStudentViewCourses,
  searchCourses,
  getStudentViewCourseDetails,
  checkCoursePurchaseInfo,
} = require("../../controllers/student-controller/courseController");

// 🔸 INITIALIZE EXPRESS ROUTER
const router = require("express").Router();

/**
 * ======================================
 *    STUDENT COURSE MANAGEMENT ROUTES
 * ======================================
 */

// 🔸 GET ALL COURSES FOR STUDENT VIEW (GET /student/courses/get-courses)
router.get("/get-courses", getAllStudentViewCourses);

// 🔸 SEARCH COURSES (GET /student/courses/search)
router.get("/search", searchCourses);

// 🔸 GET COURSE DETAILS BY ID (GET /student/courses/get-course/details/:id)
router.get("/get-course/details/:id", getStudentViewCourseDetails);

// 🔸 CHECK PURCHASE INFO (GET /student/courses/purchase-info/:id/:studentId)
router.get("/purchase-info/:id/:studentId", checkCoursePurchaseInfo);

module.exports = router;