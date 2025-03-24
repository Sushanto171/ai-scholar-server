const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true, trim: true },
    level: {
      type: String,
      required: true,
      enum: ["Beginner", "Intermediate", "Advanced"],
    },
    duration: { type: String, required: true },
    price: { type: String, required: true },
    instructor: { type: String, required: true },
    rating: { type: Number, required: true, min: 0, max: 5 },
    image: { type: String, required: true },
    lessons: [
      {
        title: { type: String },
        videoUrl: { type: String },
        duration: { type: String },
      },
    ],
  },
  { timestamp: true }
);

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
