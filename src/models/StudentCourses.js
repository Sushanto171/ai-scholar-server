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
      courseTitle: {
        type: String,
        required: true, // TITLE OF THE COURSE
      },
      courseImage: {
        type: String,
        required: true, // IMAGE OR THUMBNAIL OF THE COURSE
      },
      coursePricing: {
        type: Number,
        required: true, // PURCHASE AMOUNT OF THE COURSE
      },
      courseCategory: {
        type: String,
        required: true, // CATEGORY OF THE COURSE
      },
      courseLevel: {
        type: String,
        required: true, // LEVEL OF THE COURSE
      },
      primaryLanguage: {
        type: String,
        required: true, // PRIMARY LANGUAGE OF THE COURSE
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
      enrolledStudent: {
        type: Number,
        required: true, // NUMBER OF STUDENTS ENROLL THE COURSE
      },
    },
  ],
});

// 🔹 EXPORT THE STUDENT COURSES MODEL
module.exports = mongoose.model("StudentCourses", StudentCoursesSchema);