const mongoose = require("mongoose");

// 🔹 STUDENT COURSES SCHEMA: DEFINES STUDENT ENROLLED COURSES STRUCTURE
const StudentCoursesSchema = new mongoose.Schema({
  userId: String,
  courses: [
    {
      courseId: String,
      title: String,
      instructorName: String,
      instructorEmail: String,
      dateOfPurchase: Date,
      courseImage: String,
    },
  ],
});

// EXPORT STUDENT COURSES MODEL
module.exports = mongoose.model("StudentCourses", StudentCoursesSchema);