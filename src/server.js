// 🌐 Environment & Packages
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");

// 📁 Routes
const userRoutes = require("./routes/admin-routes/userRoutes");
const blogRoutes = require("./routes/admin-routes/blogRoutes");
const courseRoutes = require("./routes/instructor-routes/courseRoutes");
const mediaRoutes = require("./routes/instructor-routes/mediaRoutes");
const dashboardRoutes = require("./routes/admin-routes/dashboardRoutes");
const studentViewCourseRoutes = require("./routes/student-routes/courseRoutes");
const studentCoursesRoutes = require("./routes/student-routes/studentCoursesRoutes");
const studentCourseProgressRoutes = require("./routes/student-routes/courseProgressRoutes");
const coursePurchaseRoutes = require("./routes/student-routes/coursePurchaseRoutes");

// 🛠 Middleware & Config
const logger = require("./middlewares/logger");
const { globalErrorHandler } = require("./middlewares/globalErrorHandler");
const { configureCloudinary } = require("./config/cloudinaryConfig");

// 🔧 App & DB Setup
const app = express();
const DB_URI = process.env.DB_URI;

// 🌀 Configure Cloudinary
configureCloudinary();

// 📡 Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(logger);

// 🔗 Database Connection
mongoose
  .connect(DB_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// 📦 Routes Configuration
app.use("/users", userRoutes);
app.use("/blogs", blogRoutes);
app.use("/courses", courseRoutes);
app.use("/media", mediaRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/student/courses", studentViewCourseRoutes);
app.use("/student/course-payment", coursePurchaseRoutes);
app.use("/student/enrolled-courses", studentCoursesRoutes);
app.use("/student/course-progress", studentCourseProgressRoutes);

// 🌐 Root Route
app.get("/", (req, res) => {
  res.send("Hello from AI Scholar server...");
});

// 🧩 Global Error Handlers
app.use(globalErrorHandler);

// 📌 Fallback Error Middleware
app.use((error, req, res, next) => {
  console.error(error.stack);

  res.status(500).json({
    success: false,
    message: "Something went wrong!",
  });
});

module.exports = app;