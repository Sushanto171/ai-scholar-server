const Course = require("../models/courseModels");
const { sendResponse, checkId } = require("../utils");

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
      // res.status(201).json({
      //   success: true,
      //   message: "Course has been created successfully",
      //   data: saveCourse,
      // });
      // send response to client
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

// Create a new course
// const createCourse = async (req, res, next) => {
//   try {
//     const {
//       title,
//       description,
//       category,
//       level,
//       duration,
//       price,
//       instructor,
//       rating,
//       image,
//     } = req.body;

//     // Validate required fields
//     if (
//       !title ||
//       !description ||
//       !category ||
//       !level ||
//       !duration ||
//       !price ||
//       !instructor ||
//       !rating ||
//       !image
//     ) {
//       return sendResponse(res, 400, false, "All fields are required");
//     }

//     // create course in database
//     const newCourse = await Course.create(req.body);

//     // send response to client
//     sendResponse(res, 201, true, "Course created successfully", newCourse);
//   } catch (error) {
//     next(error);
//   }
// };

const getAllCourses = async (req, res, next) => {
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

    // const coursesList = await Course.find({});

    // res.status(200).json({
    //   success: true,
    //   data: coursesList,
    // });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
    next(error);
  }
};

// Get all courses
// const getCourses = async (req, res, next) => {
//   try {
//     const { category, limit = 6, skip } = req.query;

//     let courses = await Course.find(category ? { category } : {})
//       .limit(limit)
//       .skip(skip);

//     if (courses.length === 0) {
//       sendResponse(res, 404, true, "Courses not found");
//       return;
//     }

//     // send response to client
//     sendResponse(res, 200, true, "Fetched all courses successfully", courses);
//   } catch (error) {
//     next(error);
//   }
// };

const getCourseDetailsByID = async (req, res, next) => {
  try {
    const courseId = req?.params?.id;

    // validate
    const isValidId = checkId(courseId);
    if (!isValidId) {
      return sendResponse(res, 400, true, "Invalid id");
    }

    // query into database
    const courseDetails = await Course.findById(courseId);

    if (!courseDetails) {
      return sendResponse(res, 404, false, "Course not found");
    }

    // send response to client
    sendResponse(
      res,
      200,
      true,
      "Fetching success by course id ",
      courseDetails
    );

    // const { id } = req.params;
    // const courseDetails = await Course.findById(id);

    // if (!courseDetails) {
    //   return res.status(404).json({
    //     success: false,
    //     message: "Course not found!",
    //   });
    // }

    // res.status(200).json({
    //   success: true,
    //   data: courseDetails,
    // });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
    next(error);
  }
};

// Get a course by id
// const getCourseById = async (req, res, next) => {
//   try {
//     const courseId = req?.params?.id;

//     // validate
//     const isValidId = checkId(courseId);
//     if (!isValidId) {
//       return sendResponse(res, 400, true, "invalid id");
//     }

//     // query into database
//     const course = await Course.findById(courseId);

//     if (!course) {
//       return sendResponse(res, 404, false, "Course not found");
//     }

//     // send response to client
//     sendResponse(res, 200, true, "Fetching success by course id ", course);
//   } catch (error) {
//     next(error);
//   }
// };

const updateCourseByID = async (req, res) => {
  try {
    const courseId = req?.params?.id;
    // validate
    const isValidId = checkId(courseId);
    if (!isValidId) {
      return sendResponse(res, 400, true, "Invalid id");
    }

    const updatedCourseData = req.body;
    const nowUpdate = { $set: updatedCourseData };
    const updatedCourse = await Course.findByIdAndUpdate(courseId, nowUpdate, {
      new: true,
    });

    // validate
    if (!updatedCourse) {
      return sendResponse(res, 404, false, "Course not found");
    }
    // send client response
    sendResponse(res, 200, true, "Course updated successfully", updatedCourse);

    // const { id } = req.params;
    // const updatedCourseData = req.body;

    // const updatedCourse = await Course.findByIdAndUpdate(
    //   id,
    //   updatedCourseData,
    //   { new: true }
    // );

    // if (!updatedCourse) {
    //   return res.status(404).json({
    //     success: false,
    //     message: "Course not found!",
    //   });
    // }

    // res.status(200).json({
    //   success: true,
    //   message: "Course updated successfully",
    //   data: updatedCourse,
    // });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
    next(error);
  }
};

// Update a course by id
// const updateCourseById = async (req, res, next) => {
//   try {
//     const courseId = req?.params?.id;
//     // validate
//     const isValidId = checkId(courseId);
//     if (!isValidId) {
//       return sendResponse(res, 400, true, "invalid id");
//     }

//     const courseData = req.body;
//     const nowUpdate = { $set: courseData };
//     const updatedCourse = await Course.findByIdAndUpdate(courseId, nowUpdate, {
//       new: true,
//     });

//     // validate
//     if (!updatedCourse) {
//       return sendResponse(res, 404, true, "Course not found");
//     }
//     // send client response
//     sendResponse(
//       res,
//       200,
//       true,
//       "The course updated successfully",
//       updatedCourse
//     );
//   } catch (error) {
//     next(error);
//   }
// };

// Delete a course by ID
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
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
    next(error);
  }
};

// Get all available categories
const getCategoryList = async (req, res, next) => {
  try {
    const result = await Course.find({}, "category");
    let categories = [];
    result.forEach((course) => {
      if (!categories.some((item) => item.category === course.category)) {
        categories.push({ category: course.category, _id: course._id });
      }
    });
    // send response client side
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

// module.exports = {
//   getCourses,
//   createCourse,
//   getCourseById,
//   updateCourseById,
//   deleteCourseById,
//   getCategoryList,
// };
