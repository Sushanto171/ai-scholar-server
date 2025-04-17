const mongoose = require("mongoose");

// 🔹 LECTURE PROGRESS SCHEMA: DEFINES PROGRESS STRUCTURE OF COURSE
const LectureProgressSchema = new mongoose.Schema({
  lectureId: String,
  viewed: Boolean,
  dateViewed: Date,
});

// 🔹 COURSE PROGRESS SCHEMA: DEFINES COURSE PROGRESS SCHEMA OR STRUCTURE
const CourseProgressSchema = new mongoose.Schema({
  userId: String,
  courseId: String,
  completed: Boolean,
  completionDate: Date,
  lecturesProgress: [LectureProgressSchema],
});

// EXPORT COURSE PROGRESS MODEL
module.exports = mongoose.model("Progress", CourseProgressSchema);