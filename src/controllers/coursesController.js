const Course = require("../models/courseModels");
const { sendResponse, checkId } = require("../utils");

// CREATE A NEW COURSE (POST /courses/add-course)
const addNewCourse = async (req, res, next) => {
  try {
    const courseData = req.body;

    // Validate required fields
    if (!courseData) {
      return sendResponse(res, 400, false, "All fields are required");
    }

    const newlyCreatedCourse = new Course(courseData);
    const saveCourse = await newlyCreatedCourse.save();

    if (saveCourse) {
      // Send response to client
      sendResponse(res, 201, true, "Course created successfully", saveCourse);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
    next(error);
  }
};

// GET ALL COURSES (GET /courses/get-courses)
const getAllCourses = async (req, res, next) => {
  try {
    const { category, limit = 6, skip } = req.query;

    let courses = await Course.find(category ? { category } : {})
      .limit(limit)
      .skip(skip);

    if (courses.length === 0) {
      sendResponse(res, 404, false, "Courses not found");
      return;
    }

    // Send response to client
    sendResponse(res, 200, true, "Fetched all courses successfully", courses);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
    next(error);
  }
};

// GET A COURSE DETAILS BY ID (GET /courses/get-course/details/:id)
const getCourseDetailsByID = async (req, res, next) => {
  try {
    const courseId = req?.params?.id;

    // Validate
    const isValidId = checkId(courseId);
    if (!isValidId) {
      return sendResponse(res, 400, false, "Invalid id");
    }

    // Query into database
    const courseDetails = await Course.findById(courseId);

    if (!courseDetails) {
      return sendResponse(res, 404, false, "Course not found");
    }

    // Send response to client
    sendResponse(
      res,
      200,
      true,
      "Fetching success by course id ",
      courseDetails
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
    next(error);
  }
};

// UPDATE A COURSE BY ID (PUT /courses/update/:id)
const updateCourseByID = async (req, res, next) => {
  try {
    const courseId = req?.params?.id;

    // Validate
    const isValidId = checkId(courseId);
    if (!isValidId) {
      return sendResponse(res, 400, false, "Invalid id");
    }

    const updatedCourseData = req.body;
    const nowUpdate = { $set: updatedCourseData };
    const updatedCourse = await Course.findByIdAndUpdate(courseId, nowUpdate, {
      new: true,
    });

    // Validate
    if (!updatedCourse) {
      return sendResponse(res, 404, false, "Course not found");
    }

    // Send response to client
    sendResponse(res, 200, true, "Course updated successfully", updatedCourse);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
    next(error);
  }
};

// DELETE A COURSE BY ID (DELETE /courses/delete/:id)
const deleteCourseById = async (req, res, next) => {
  try {
    const courseId = req?.params?.id;

    // Validate
    const isValidId = checkId(courseId);
    if (!isValidId) {
      return sendResponse(res, 400, false, "Invalid id");
    }

    const result = await Course.findOneAndDelete({ _id: courseId });

    // Send response to client
    sendResponse(res, 200, true, "Successfully deleted the course", result);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
    next(error);
  }
};

// GET ALL CATEGORY LIST (GET /courses/categories)
const getCategoryList = async (req, res, next) => {
  try {
    const result = await Course.find({}, "category");

    let categories = [];

    result.forEach((course) => {
      if (!categories.some((item) => item.category === course.category)) {
        categories.push({ category: course.category, _id: course._id });
      }
    });

    // Send response to client
    sendResponse(res, 200, true, "Successfully get all categories", categories);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
    next(error);
  }
};

module.exports = {
  addNewCourse,
  getAllCourses,
  getCourseDetailsByID,
  updateCourseByID,
  deleteCourseById,
  getCategoryList,
};