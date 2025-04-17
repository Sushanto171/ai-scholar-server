const mongoose = require("mongoose");

// 🔹 COURSE PURCHASE SCHEMA: DEFINES PURCHASED COURSE SCHEMA OR STRUCTURE
const CoursePurchaseSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
    orderDate: {
      type: Date,
      required: true,
    },
    instructorName: {
      type: String,
      required: true,
    },
    instructorEmail: {
      type: String,
      required: true,
    },
    courseImage: {
      type: String,
      required: true,
    },
    courseTitle: {
      type: String,
      required: true,
    },
    courseId: {
      type: String,
      required: true,
    },
    coursePricing: {
      type: Number,
      required: true,
    },
    paymentId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // AUTOMATICALLY ADDS CREATED_AT AND UPDATED_AT FIELDS
  }
);

// EXPORT COURSE PURCHASE MODEL
module.exports = mongoose.model("CoursePurchase", CoursePurchaseSchema);
