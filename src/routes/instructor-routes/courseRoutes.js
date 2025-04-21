const {
  addNewCourse,
  getAllCourses,
  getCourseDetailsByID,
  updateCourseByID,
  deleteCourseById,
  getCategoryList,
  getAllCoursesForInstructor,
  getAllCoursesByInstructorEmail,
  updateCourseAdvertiseHideAndShow,
} = require("../../controllers/instructor-controller/courseController");

const router = require("express").Router();

// 🔹 CREATE A NEW COURSE (POST /courses/add-course)
router.post("/add-course", addNewCourse);

// 🔹 GET ALL COURSES WITH FILTERS (GET /courses/get-courses)
router.get("/get-courses", getAllCourses);

// 🔹 GET COURSE DETAILS BY INSTRUCTOR EMAIL (GET /courses/instructor/:email)
router.get("/instructor/:email", getAllCoursesByInstructorEmail);

// 🔹 UPDATE COURSE ADVERTISE HIDE & SHOW FEATURE (PATCH /courses/course/:id)
router.patch("/course/:id", updateCourseAdvertiseHideAndShow);

// 🔹 GET ALL COURSES FOR INSTRUCTOR (GET /courses/get-all-courses)
router.get("/get-all-courses", getAllCoursesForInstructor);

// 🔹 GET COURSE DETAILS BY ID (GET /courses/get-course/details/:id)
router.get("/get-course/details/:id", getCourseDetailsByID);

// 🔹 UPDATE A COURSE BY ID (PUT /courses/update/:id)
router.put("/update/:id", updateCourseByID);

// 🔹 DELETE A COURSE BY ID (DELETE /courses/delete/:id)
router.delete("/delete/:id", deleteCourseById);

// 🔹 GET ALL UNIQUE COURSE CATEGORIES (GET /courses/categories)
router.get("/categories", getCategoryList);

module.exports = router;