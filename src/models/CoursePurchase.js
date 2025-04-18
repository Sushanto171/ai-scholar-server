const mongoose = require("mongoose");

// 🔹 COURSE PURCHASE SCHEMA: DEFINES THE STRUCTURE OF A PURCHASED COURSE
const CoursePurchaseSchema = new mongoose.Schema(
  {
    // 🔸 ID OF THE USER WHO PURCHASED THE COURSE
    userId: {
      type: String,
      required: true,
    },

    // 🔸 NAME OF THE USER
    userName: {
      type: String,
      required: true,
    },

    // 🔸 EMAIL OF THE USER
    userEmail: {
      type: String,
      required: true,
    },

    // 🔸 CURRENT PAYMENT STATUS FOR THIS COURSE PURCHASE
    paymentStatus: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },

    // 🔸 DATE WHEN THE COURSE WAS ORDERED
    orderDate: {
      type: Date,
      required: true,
    },

    // 🔸 NAME OF THE INSTRUCTOR WHO CREATED THE COURSE
    instructorName: {
      type: String,
      required: true,
    },

    // 🔸 EMAIL OF THE INSTRUCTOR
    instructorEmail: {
      type: String,
      required: true,
    },

    // 🔸 IMAGE OR THUMBNAIL OF THE COURSE
    courseImage: {
      type: String,
      required: true,
    },

    // 🔸 TITLE OF THE COURSE
    courseTitle: {
      type: String,
      required: true,
    },

    // 🔸 ID OF THE COURSE THAT WAS PURCHASED
    courseId: {
      type: String,
      required: true,
    },

    // 🔸 PRICE OF THE COURSE AT TIME OF PURCHASE
    coursePricing: {
      type: Number,
      required: true,
    },

    // 🔸 STRIPE PAYMENT ID USED TO TRACK TRANSACTION
    paymentId: {
      type: String,
      required: true,
    },
  },
  {
    // 🔸 AUTOMATICALLY INCLUDES 'createdAt' AND 'updatedAt' TIMESTAMPS
    timestamps: true,
  }
);

// 🔹 EXPORT THE COURSE PURCHASE MODEL
module.exports = mongoose.model("CoursePurchase", CoursePurchaseSchema);