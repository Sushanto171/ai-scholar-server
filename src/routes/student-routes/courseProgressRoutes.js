const {
  getCurrentCourseProgress,
  markCurrentLectureAsViewed,
  resetCurrentCourseProgress,
} = require("../../controllers/student-controller/courseProgressController");

const router = require("express").Router();

// 🔸 GET CURRENT COURSE PROGRESS (GET /student/course-progress/get-course/:userId/:courseId)
router.get("/get-course/:userId/:courseId", getCurrentCourseProgress);

// 🔸 MARK LECTURE AS VIEWED (POST /student/course-progress/mark-lecture-viewed)
router.post("/mark-lecture-viewed", markCurrentLectureAsViewed);

// 🔸 RESET CURRENT COURSE PROGRESS (POST /student/course-progress/reset-progress)
router.post("/reset-progress", resetCurrentCourseProgress);

module.exports = router;