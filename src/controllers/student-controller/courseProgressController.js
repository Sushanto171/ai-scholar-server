const Course = require("../../models/Course");
const CourseProgress = require("../../models/CourseProgress");
const StudentCourses = require("../../models/StudentCourses");

// 🔸 GET CURRENT COURSE PROGRESS (GET /student/course-progress/get-course/:userId/:courseId)
const getCurrentCourseProgress = async (req, res) => {
  try {
    const { userId, courseId } = req.params;

    // CHECK IF USER HAS PURCHASED THE COURSE
    const studentCourses = await StudentCourses.findOne({ userId });
    const hasAccess =
      studentCourses?.courses?.findIndex((item) => item.courseId === courseId) >
      -1;

    if (!hasAccess) {
      return res.status(200).json({
        success: true,
        data: {
          isPurchased: false,
        },
        message: "YOU NEED TO PURCHASE THIS COURSE TO ACCESS IT.",
      });
    }

    // GET USER'S COURSE PROGRESS
    const progress = await CourseProgress.findOne({ userId, courseId });

    if (!progress || progress.lecturesProgress.length === 0) {
      const course = await Course.findById(courseId);

      if (!course) {
        return res.status(404).json({
          success: false,
          message: "COURSE NOT FOUND",
        });
      }

      return res.status(200).json({
        success: true,
        message: "NO PROGRESS FOUND. YOU CAN START WATCHING THE COURSE.",
        data: {
          courseDetails: course,
          progress: [],
          isPurchased: true,
        },
      });
    }

    const courseDetails = await Course.findById(courseId);

    return res.status(200).json({
      success: true,
      data: {
        courseDetails,
        progress: progress.lecturesProgress,
        completed: progress.completed,
        completionDate: progress.completionDate,
        isPurchased: true,
      },
    });
  } catch (error) {
    console.error("GET COURSE PROGRESS ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "INTERNAL SERVER ERROR",
    });
  }
};

// 🔸 MARK LECTURE AS VIEWED (POST /student/course-progress/mark-lecture-viewed)
const markCurrentLectureAsViewed = async (req, res) => {
  try {
    const { userId, courseId, lectureId } = req.body;

    // FIND USER PROGRESS FOR THE COURSE
    let progress = await CourseProgress.findOne({ userId, courseId });

    // IF PROGRESS DOES NOT EXIST, CREATE A NEW RECORD
    if (!progress) {
      progress = new CourseProgress({
        userId,
        courseId,
        lecturesProgress: [
          {
            lectureId,
            viewed: true,
            dateViewed: new Date(),
          },
        ],
      });
      await progress.save();
    } else {
      const lectureProgress = progress.lecturesProgress.find(
        (item) => item.lectureId === lectureId
      );

      if (lectureProgress) {
        lectureProgress.viewed = true;
        lectureProgress.dateViewed = new Date();
      } else {
        progress.lecturesProgress.push({
          lectureId,
          viewed: true,
          dateViewed: new Date(),
        });
      }

      await progress.save();
    }

    // VERIFY COURSE EXISTS
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "COURSE NOT FOUND",
      });
    }

    // CHECK IF ALL LECTURES HAVE BEEN VIEWED
    const allLecturesViewed =
      progress.lecturesProgress.length === course.curriculum.length &&
      progress.lecturesProgress.every((item) => item.viewed);

    if (allLecturesViewed) {
      progress.completed = true;
      progress.completionDate = new Date();
      await progress.save();
    }

    return res.status(200).json({
      success: true,
      message: "LECTURE MARKED AS VIEWED",
      data: progress,
    });
  } catch (error) {
    console.error("MARK LECTURE VIEW ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "INTERNAL SERVER ERROR",
    });
  }
};

// 🔸 RESET CURRENT COURSE PROGRESS (POST /student/course-progress/reset-progress)
const resetCurrentCourseProgress = async (req, res) => {
  try {
    const { userId, courseId } = req.body;

    // FIND EXISTING PROGRESS
    const progress = await CourseProgress.findOne({ userId, courseId });

    if (!progress) {
      return res.status(404).json({
        success: false,
        message: "COURSE PROGRESS NOT FOUND",
      });
    }

    // RESET PROGRESS FIELDS
    progress.lecturesProgress = [];
    progress.completed = false;
    progress.completionDate = null;

    await progress.save();

    return res.status(200).json({
      success: true,
      message: "COURSE PROGRESS HAS BEEN RESET",
      data: progress,
    });
  } catch (error) {
    console.error("RESET COURSE PROGRESS ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "INTERNAL SERVER ERROR",
    });
  }
};

module.exports = {
  getCurrentCourseProgress,
  markCurrentLectureAsViewed,
  resetCurrentCourseProgress,
};