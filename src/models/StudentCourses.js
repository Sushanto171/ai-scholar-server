const mongoose = require("mongoose");

// 🔹 STUDENT COURSES SCHEMA: DEFINES THE STRUCTURE FOR TRACKING COURSES PURCHASED BY A STUDENT
const StudentCoursesSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true, // ID OF THE STUDENT USER
  },

  // 🔸 ARRAY OF COURSES PURCHASED BY THE STUDENT
  courses: [
    {
      courseId: {
        type: String,
        required: true, // ID OF THE PURCHASED COURSE
      },
      title: {
        type: String,
        required: true, // TITLE OF THE COURSE
      },
      instructorName: {
        type: String,
        required: true, // NAME OF THE COURSE INSTRUCTOR
      },
      instructorEmail: {
        type: String,
        required: true, // EMAIL OF THE COURSE INSTRUCTOR
      },
      dateOfPurchase: {
        type: Date,
        required: true, // DATE WHEN THE COURSE WAS PURCHASED
      },
      courseImage: {
        type: String,
        required: true, // IMAGE OR THUMBNAIL OF THE COURSE
      },
    },
  ],
});

// 🔹 EXPORT THE STUDENT COURSES MODEL
module.exports = mongoose.model("StudentCourses", StudentCoursesSchema);