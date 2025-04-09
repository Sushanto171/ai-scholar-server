const {
  addNewCourse,
  getAllCourses,
  getCourseDetailsByID,
  updateCourseByID,
  deleteCourseById,
  getCategoryList,
} = require("../../controllers/instructor-controller/courseController");

const router = require("express").Router();

// CREATE A NEW COURSE (POST /courses/add-course)
router.post("/add-course", addNewCourse);

// GET ALL COURSES (GET /courses/get-courses)
router.get("/get-courses", getAllCourses);

// GET A COURSE DETAILS BY ID (GET /courses/get-course/details/:id)
router.get("/get-course/details/:id", getCourseDetailsByID);

// UPDATE A COURSE BY ID (PUT /courses/update/:id)
router.put("/update/:id", updateCourseByID);

// DELETE A COURSE BY ID (DELETE /courses/delete/:id)
router.delete("/delete/:id", deleteCourseById);

// GET ALL CATEGORY LIST (GET /courses/categories)
router.get("/categories", getCategoryList);

module.exports = router;