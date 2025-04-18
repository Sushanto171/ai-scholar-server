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

// 🔸 GET COURSE DETAILS BY ID (GET /student/courses/get-course/details/:id)
const getStudentViewCourseDetails = async (req, res, next) => {
  try {
    const courseId = req?.params?.id;

    // VALIDATING MONGODB OBJECT ID
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
    const { id, studentId } = req.params;
    const studentCourses = await StudentCourses.findOne({
      userId: studentId,
    });

    const ifStudentAlreadyBoughtCurrentCourse =
      studentCourses.courses.findIndex((item) => item.courseId === id) > -1;
    res.status(200).json({
      success: true,
      data: ifStudentAlreadyBoughtCurrentCourse,
    });
  } catch (error) {
    console.error("ERROR WHILE FETCHING COURSE BOUGHT DETAILS:", error);
    res.status(500).json({
      success: false,
      message: "INTERNAL SERVER ERROR",
    });
  }
};

// 💫 EXPORTING CONTROLLER FUNCTIONS
module.exports = {
  getAllStudentViewCourses,
  getStudentViewCourseDetails,
  checkCoursePurchaseInfo,
};