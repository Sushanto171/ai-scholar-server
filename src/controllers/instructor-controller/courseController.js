const Course = require("../../models/Course");
const { sendResponse } = require("../../utils/responseHandler");
const { checkId } = require("../../validations/idValidation");

// 🔹 CREATE A NEW COURSE (POST /courses/add-course)
const addNewCourse = async (req, res, next) => {
  try {
    const courseData = req.body;

    // VALIDATE COURSE DATA
    if (!courseData) {
      return sendResponse(res, 400, false, "ALL FIELDS ARE REQUIRED");
    }

    const newCourse = new Course(courseData);
    const savedCourse = await newCourse.save();

    sendResponse(res, 201, true, "COURSE CREATED SUCCESSFULLY", savedCourse);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// 🔹 GET ALL COURSES WITH FILTERS (GET /courses/get-courses)
const getAllCourses = async (req, res, next) => {
  try {
    const { category, limit = 6, skip } = req.query;

    // QUERY FILTER BY CATEGORY IF PROVIDED
    const query = category ? { category } : {};
    // const query ={}
    const courses = await Course.find(query)

    if (courses.length === 0) {
      return sendResponse(res, 404, false, "NO COURSES FOUND");
    }

    sendResponse(res, 200, true, "COURSES FETCHED SUCCESSFULLY", courses);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// 🔹 GET ALL COURSES FOR INSTRUCTOR (GET /courses/get-all-courses)
const getAllCoursesForInstructor = async (req, res, next) => {
  try {
    const courses = await Course.find();

    if (!courses || courses.length === 0) {
      return sendResponse(res, 404, false, "NO COURSES AVAILABLE");
    }

    sendResponse(res, 200, true, "ALL COURSES FETCHED SUCCESSFULLY", courses);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// 🔹 GET COURSE DETAILS BY ID (GET /courses/get-course/details/:id)
const getCourseDetailsByID = async (req, res, next) => {
  try {
    const courseId = req.params.id;

    // VALIDATE MONGODB ID
    if (!checkId(courseId)) {
      return sendResponse(res, 400, false, "INVALID COURSE ID");
    }

    const courseDetails = await Course.findById(courseId);

    if (!courseDetails) {
      return sendResponse(res, 404, false, "COURSE NOT FOUND");
    }

    sendResponse(
      res,
      200,
      true,
      "COURSE DETAILS FETCHED SUCCESSFULLY",
      courseDetails
    );
  } catch (error) {
    console.log(error);
    next(error);
  }
};
// 🔹 GET COURSE DETAILS BY IInstructor email (GET /courses/get-course/:email)
const getAllCoursesByInstuctorEmail = async (req, res, next) => {
  try {
    const email = req.params.email;
    console.log(email)

    // VALIDATE MONGODB ID
    // if (!checkId(courseId)) {
    //   return sendResponse(res, 400, false, "INVALID COURSE ID");
    // }

    const courses = await Course.find({ "instructor.instructorEmail": email });

    if (!courses) {
      return sendResponse(res, 404, false, "COURSE NOT FOUND");
    }

    sendResponse(
      res,
      200,
      true,
      "COURSE DETAILS FETCHED SUCCESSFULLY",
      courses
    );
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// 🔹 UPDATE A COURSE BY ID (PUT /courses/update/:id)
const updateCourseByID = async (req, res, next) => {
  try {
    const courseId = req.params.id;

    // VALIDATE MONGODB ID
    if (!checkId(courseId)) {
      return sendResponse(res, 400, false, "INVALID COURSE ID");
    }

    const updatedCourseData = req.body;
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      { $set: updatedCourseData },
      { new: true, runValidators: true }
    );

    if (!updatedCourse) {
      return sendResponse(res, 404, false, "COURSE NOT FOUND");
    }

    sendResponse(res, 200, true, "COURSE UPDATED SUCCESSFULLY", updatedCourse);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
// 🔹 UPDATE A COURSE BY ID (PATCH /courses/course/:id)
const updateCourseAdvertiseHideandShow = async (req, res, next) => {
  try {
    const courseId = req.params.id;
    const {status} = req.body
    console.log(courseId, status)

    // VALIDATE MONGODB ID
    if (!checkId(courseId)) {
      return sendResponse(res, 400, false, "INVALID COURSE ID");
    }

    // const updatedCourseData = req.body;
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      { status },
      { new: true, runValidators: true }
    );

    if (!updatedCourse) {
      return sendResponse(res, 404, false, "COURSE NOT FOUND");
    }

    sendResponse(res, 200, true, "COURSE UPDATED SUCCESSFULLY", updatedCourse);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// 🔹 DELETE A COURSE BY ID (DELETE /courses/delete/:id)
const deleteCourseById = async (req, res, next) => {
  try {
    const courseId = req.params.id;

    // VALIDATE MONGODB ID
    if (!checkId(courseId)) {
      return sendResponse(res, 400, false, "INVALID COURSE ID");
    }

    const deletedCourse = await Course.findByIdAndDelete(courseId);
    if (!deletedCourse) {
      return sendResponse(res, 404, false, "COURSE NOT FOUND");
    }

    sendResponse(res, 200, true, "COURSE DELETED SUCCESSFULLY", deletedCourse);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// 🔹 GET ALL UNIQUE COURSE CATEGORIES (GET /courses/categories)
const getCategoryList = async (req, res, next) => {
  try {
    const result = await Course.find({}, "category");

    const categories = [];
    result.forEach((course) => {
      if (!categories.some((item) => item.category === course.category)) {
        categories.push({ category: course.category, _id: course._id });
      }
    });

    if (categories.length === 0) {
      return sendResponse(res, 404, false, "NO CATEGORIES FOUND");
    }

    sendResponse(
      res,
      200,
      true,
      "FETCHED ALL CATEGORIES SUCCESSFULLY",
      categories
    );
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// 💠 EXPORT CONTROLLERS
module.exports = {
  addNewCourse,
  getAllCourses,
  getAllCoursesForInstructor,
  getCourseDetailsByID,
  updateCourseByID,
  deleteCourseById,
  getCategoryList,
  getAllCoursesByInstuctorEmail,
  updateCourseAdvertiseHideandShow
};