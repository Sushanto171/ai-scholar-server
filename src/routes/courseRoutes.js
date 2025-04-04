const {
  addNewCourse,
  getAllCourses,
  getCourseDetailsByID,
  updateCourseByID,
  deleteCourseById,
  getCategoryList,
} = require("../controllers/coursesController");

const router = require("express").Router();

// CREATE A NEW COURSE
router.post("/add-course", addNewCourse);

// GET ALL COURSES
router.get("/get-courses", getAllCourses);

// GET A COURSE DETAILS BY ID
router.get("/get-course/details/:id", getCourseDetailsByID);

// UPDATE A COURSE BY ID
router.put("/update/:id", updateCourseByID);

// DELETE A COURSE BY ID
router.delete("/delete/:id", deleteCourseById);

// GET ALL CATEGORY LIST
router.get("/categories", getCategoryList);

module.exports = router;