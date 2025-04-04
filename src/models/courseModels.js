const mongoose = require("mongoose");

const LectureSchema = new mongoose.Schema({
  title: { type: String, required: true },
  videoUrl: { type: String, required: true },
  public_id: { type: String, required: true },
  freePreview: Boolean,
});

const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  subtitle: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true, trim: true },
  instructor: {
    instructorName: { type: String, required: true },
    instructorEmail: { type: String, required: true },
    instructorImage: { type: String, required: true },
  },
  level: {
    type: String,
    required: true,
    enum: ["Beginner", "Intermediate", "Advanced"],
  },
  primaryLanguage: { type: String, required: true },
  welcomeMessage: { type: String, required: true },
  pricing: { type: Number, required: true },
  enrolled: { type: Number, default: 0 },
  objectives: { type: String, required: true },
  date: { type: Date, required: true },
  students: [
    {
      studentName: String,
      studentEmail: String,
      paidAmount: String,
    },
  ],
  curriculum: [LectureSchema],
  isPublished: Boolean,
});

module.exports = mongoose.model("Course", CourseSchema);