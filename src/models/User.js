const mongoose = require("mongoose");

// 🔹 USER SCHEMA: DEFINES USER STRUCTURE FOR AUTHENTICATION AND ROLE-BASED ACCESS
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, // USER NAME IS MANDATORY
    },
    email: {
      type: String,
      required: true, // EMAIL IS MANDATORY
      lowercase: true,
      unique: true, // MUST BE UNIQUE ACROSS ALL USERS
    },
    password: {
      type: String,
      required: true, // ENCRYPTED PASSWORD
    },
    role: {
      type: String,
      enum: ["student", "instructor", "admin"], // ALLOWED USER ROLES
      default: "student", // DEFAULT ROLE
      required: true,
    },
    image: {
      type: String,
      default: "", // OPTIONAL PROFILE IMAGE
    },
    instructorStatus: {
      type: String,
      default: "", // OPTIONAL PROFILE IMAGE
    },
    banStatus: {
      type: Boolean,
      default: false, // OPTIONAL PROFILE IMAGE
    },
  },
  {
    timestamps: true, // AUTOMATICALLY ADDS CREATED_AT AND UPDATED_AT FIELDS
  }
);

// EXPORT USER MODEL
const User = mongoose.model("User", userSchema);
module.exports = User;