// 🔸 IMPORT COURSE PROGRESS CONTROLLER FUNCTIONS
const {
  getCurrentCourseProgress,
  markCurrentLectureAsViewed,
  resetCurrentCourseProgress,
} = require("../../controllers/student-controller/courseProgressController");

// 🔸 INITIALIZE EXPRESS ROUTER
const router = require("express").Router();

/**
 * ======================================
 *    COURSE PROGRESS MANAGEMENT ROUTES
 * ======================================
 */

// 🔸 GET CURRENT COURSE PROGRESS (GET /student/course-progress/get-course/:userId/:courseId)
router.get("/get-course/:userId/:courseId", getCurrentCourseProgress);

// 🔸 MARK LECTURE AS VIEWED (POST /student/course-progress/mark-lecture-viewed)
router.post("/mark-lecture-viewed", markCurrentLectureAsViewed);

// 🔸 RESET CURRENT COURSE PROGRESS (POST /student/course-progress/reset-progress)
router.post("/reset-progress", resetCurrentCourseProgress);

module.exports = router;