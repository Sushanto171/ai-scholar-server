const mongoose = require("mongoose");

// 🔹 LECTURE SCHEMA: DEFINES INDIVIDUAL LECTURE STRUCTURE FOR A COURSE CURRICULUM
const LectureSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, // LECTURE TITLE IS MANDATORY
  },
  videoUrl: {
    type: String,
    required: true, // VIDEO URL MUST BE PROVIDED
  },
  public_id: {
    type: String,
    required: true, // CLOUDINARY PUBLIC ID FOR VIDEO ASSET
  },
  freePreview: {
    type: Boolean,
    default: false, // ALLOWS FREE PREVIEW IF SET TO TRUE
  },
});

// 🔹 COURSE SCHEMA: DEFINES THE MAIN COURSE STRUCTURE
const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, // COURSE TITLE IS MANDATORY
  },
  description: {
    type: String,
    required: true, // COURSE DESCRIPTION IS MANDATORY
  },
  subtitle: {
    type: String,
    required: true, // SHORT SUBTITLE FOR THE COURSE
  },
  image: {
    type: String,
    required: true, // COVER IMAGE URL FOR COURSE
  },
  category: {
    type: String,
    required: true, // COURSE CATEGORY
  },
  instructor: {
    instructorName: {
      type: String,
      required: true, // INSTRUCTOR'S NAME
    },
    instructorEmail: {
      type: String,
      required: true, // INSTRUCTOR'S EMAIL
    },
    instructorImage: {
      type: String, // OPTIONAL IMAGE URL FOR INSTRUCTOR
    },
  },
  level: {
    type: String,
    required: true, // COURSE DIFFICULTY LEVEL (BEGINNER, INTERMEDIATE, ADVANCED)
  },
  primaryLanguage: {
    type: String,
    required: true, // LANGUAGE IN WHICH THE COURSE IS TAUGHT
  },
  welcomeMessage: {
    type: String,
    required: true, // MESSAGE DISPLAYED TO ENROLLED STUDENTS
  },
  pricing: {
    type: Number,
    required: true, // PRICE OF THE COURSE
  },
  enrolled: {
    type: Number,
    default: 0, // NUMBER OF STUDENTS ENROLLED
  },
  objectives: {
    type: String,
    required: true, // LEARNING OBJECTIVES OF THE COURSE
  },
  date: {
    type: Date,
    required: true, // DATE WHEN COURSE IS CREATED OR PUBLISHED
  },
  students: [
    {
      studentId: String,
      studentName: String,
      studentEmail: String,
      paidAmount: String,
    },
  ],
  status: {
    type: String, // STATUS OF COURSE (e.g., "pending", "approved", "rejected")
    default: "",
  },
  curriculum: [LectureSchema], // ARRAY OF LECTURES
  isPublished: {
    type: Boolean,
    default: false, // FLAG TO INDICATE IF COURSE IS PUBLISHED
  },
});

// EXPORT COURSE MODEL
module.exports = mongoose.model("Course", CourseSchema);