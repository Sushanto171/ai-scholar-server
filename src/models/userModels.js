const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true,
    },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["student", "instructor", "admin"],
      default: "student",
      required: true,
    },
    image: { type: String, default: "" },
  },
);

const User = mongoose.model("User", userSchema);

module.exports = User;