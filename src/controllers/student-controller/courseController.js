const Course = require("../../models/Course");
const StudentCourses = require("../../models/StudentCourses");
const { sendResponse } = require("../../utils/responseHandler");
const { checkId } = require("../../validations/idValidation");

// 🔸 GET ALL COURSES FOR STUDENT VIEW (GET /student/courses/get-courses)
const getAllStudentViewCourses = async (req, res, next) => {
  try {
    const {
      category = [],
      level = [],
      primaryLanguage = [],
      sortBy = "price-lowtohigh",
    } = req.query;

    // BUILDING FILTER QUERY BASED ON PROVIDED PARAMETERS
    let filters = {};

    if (category.length) {
      filters.category = { $in: category.split(",") };
    }
    if (level.length) {
      filters.level = { $in: level.split(",") };
    }
    if (primaryLanguage.length) {
      filters.primaryLanguage = { $in: primaryLanguage.split(",") };
    }

    let sortParam = {};

    switch (sortBy) {
      case "price-lowtohigh":
        sortParam.pricing = 1;
        break;
      case "price-hightolow":
        sortParam.pricing = -1;
        break;
      case "title-atoz":
        sortParam.title = 1;
        break;
      case "title-ztoa":
        sortParam.title = -1;
        break;
      case "date-newest":
        sortParam.date = -1;
        break;
      case "date-oldest":
        sortParam.date = 1;
        break;
      default:
        sortParam.pricing = 1;
        break;
    }

    // FETCHING COURSES FROM DATABASE USING FILTERS AND SORT OPTIONS
    const coursesList = await Course.find(filters).sort(sortParam);

    // SENDING SUCCESSFUL RESPONSE WITH COURSE LIST
    return sendResponse(
      res,
      200,
      true,
      "FETCHED ALL COURSES SUCCESSFULLY",
      coursesList
    );
  } catch (error) {
    console.error("ERROR WHILE FETCHING COURSES:", error);
    res.status(500).json({
      success: false,
      message: "INTERNAL SERVER ERROR",
    });
    next(error);
  }
};

// 🔸 SEARCH COURSES (GET /student/courses/search)
const searchCourses = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || query.length < 2) {
      return sendResponse(
        res,
        400,
        false,
        "Search query must be at least 2 characters"
      );
    }

    const results = await Course.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
        { "instructor.instructorName": { $regex: query, $options: "i" } },
      ],
    }).limit(20);

    return sendResponse(
      res,
      200,
      true,
      "Search results fetched successfully",
      results
    );
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({
      success: false,
      message: "Error performing search",
      error: process.env.NODE_ENV === "development" ? error.message : null,
    });
  }
};

// 🔸 GET COURSE DETAILS BY ID (GET /student/courses/get-course/details/:id)
const getStudentViewCourseDetails = async (req, res, next) => {
  try {
    const courseId = req?.params?.id;

    const isValidId = checkId(courseId);
    if (!isValidId) {
      return sendResponse(res, 400, false, "INVALID COURSE ID");
    }

    // QUERYING COURSE DETAILS FROM DATABASE
    const courseDetails = await Course.findById(courseId);

    if (!courseDetails) {
      return sendResponse(res, 404, false, "COURSE NOT FOUND");
    }

    // SENDING SUCCESSFUL RESPONSE WITH COURSE DATA
    return sendResponse(
      res,
      200,
      true,
      "COURSE DETAILS RETRIEVED SUCCESSFULLY",
      courseDetails
    );
  } catch (error) {
    console.error("ERROR WHILE FETCHING COURSE DETAILS:", error);
    res.status(500).json({
      success: false,
      message: "INTERNAL SERVER ERROR",
    });
    next(error);
  }
};

// 🔸 CHECK PURCHASE INFO (GET /student/courses/purchase-info/:id/:studentId)
const checkCoursePurchaseInfo = async (req, res) => {
  try {
    const { id: courseId, studentId } = req.params;

    // VALIDATE IDS
    if (!checkId(courseId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid course ID",
      });
    }

    if (!checkId(studentId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid student ID",
      });
    }

    // CHECK IF STUDENT HAS PURCHASED THE COURSE
    const studentCourses = await StudentCourses.findOne({ userId: studentId });
    const hasPurchased = studentCourses?.courses.some(
      (course) => course.courseId === courseId
    );

    res.status(200).json({
      success: true,
      data: hasPurchased || false,
    });
  } catch (error) {
    console.error("Purchase check error:", error);
    res.status(500).json({
      success: false,
      message: "Error checking purchase status",
      error: process.env.NODE_ENV === "development" ? error.message : null,
    });
  }
};

// 💫 EXPORTING CONTROLLER FUNCTIONS
module.exports = {
  getAllStudentViewCourses,
  searchCourses,
  getStudentViewCourseDetails,
  checkCoursePurchaseInfo,
};