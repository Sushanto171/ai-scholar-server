const Course = require("../models/courseModels");
const { sendResponse, checkId } = require("../utils");

// get all courses
const getCourses = async (req, res, next) => {
  try {
    const { category, limit = 6, skip } = req.query;

    let courses = await Course.find(category ? { category } : {})
      .limit(limit)
      .skip(skip);

    if (courses.length === 0) {
      sendResponse(res, 404, true, "Courses not found");
      return;
    }

    // send response to client
    sendResponse(res, 200, true, "Fetched all courses successfully", courses);
  } catch (error) {
    next(error);
  }
};

// create course
const createCourse = async (req, res, next) => {
  try {
    const {
      title,
      description,
      category,
      level,
      duration,
      price,
      instructor,
      rating,
      image,
    } = req.body;

    // Validate required fields
    if (
      !title ||
      !description ||
      !category ||
      !level ||
      !duration ||
      !price ||
      !instructor ||
      !rating ||
      !image
    ) {
      return sendResponse(res, 400, false, "All fields are required");
    }

    // create course in database
    const newCourse = await Course.create(req.body);

    // send response to client
    sendResponse(res, 201, true, "Course created successfully", newCourse);
  } catch (error) {
    next(error);
  }
};

// Get a course by id
const getCourseById = async (req, res, next) => {
  try {
    const courseId = req?.params?.id;

    // validate
    const isValidId = checkId(courseId);
    if (!isValidId) {
      return sendResponse(res, 400, true, "invalid id");
    }

    // query into database
    const course = await Course.findById(courseId);

    if (!course) {
      return sendResponse(res, 404, false, "Course not found");
    }

    // send response to client
    sendResponse(res, 200, true, "Fetching success by course id ", course);
  } catch (error) {
    next(error);
  }
};

// Update a course by id
const updateCourseById = async (req, res, next) => {
  try {
    const courseId = req?.params?.id;
    // validate
    const isValidId = checkId(courseId);
    if (!isValidId) {
      return sendResponse(res, 400, true, "invalid id");
    }

    const courseData = req.body;
    const nowUpdate = { $set: courseData };
    const updatedCourse = await Course.findByIdAndUpdate(courseId, nowUpdate, {
      new: true,
    });

    // validate
    if (!updatedCourse) {
      return sendResponse(res, 404, true, "Course not found");
    }
    // send client response
    sendResponse(
      res,
      200,
      true,
      "The course updated successfully",
      updatedCourse
    );
  } catch (error) {
    next(error);
  }
};

// delete a course by ID
const deleteCourseById = async (req, res, next) => {
  try {
    const courseId = req?.params?.id;
    // validate
    const isValidId = checkId(courseId);
    if (!isValidId) {
      return sendResponse(res, 400, true, "invalid id");
    }

    const result = await Course.findOneAndDelete({ _id: courseId });

    sendResponse(res, 200, true, "Successfully deleted the course", result);
  } catch (error) {
    next(error);
  }
};

// get all available categories
const getCategoryList = async (req, res, next) => {
  try {
    const result = await Course.find({}, "category");
    let categories = [];
  result.forEach((course)=>{
    if(!categories.some(item=> item.category === course.category)){
      categories.push({category: course.category, _id: course._id})
    }
  })
    // send response client side
    sendResponse(res, 200, true, "Successfully get all categories", categories);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCourses,
  createCourse,
  getCourseById,
  updateCourseById,
  deleteCourseById,
  getCategoryList,
};
