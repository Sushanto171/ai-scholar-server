const Course = require("../models/courseModels");
const { sendResponse } = require("../utils");

// get all courses
const getCourses = async (req, res, next) => {
  try {
    const courses = await Course.find();

    if (courses.length === 0) {
      return sendResponse(res, 404, true, "Courses not found");
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
    const courseId = req.params.id;

    // validate
    if (!courseId) {
      sendResponse(res, 400, true, "invalid id");
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

module.exports = {
  getCourses,
  createCourse,
  getCourseById,
};
