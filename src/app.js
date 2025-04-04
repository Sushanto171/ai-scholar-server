// Definition
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");
const userRoutes = require("./routes/userRoutes");
const courseRoutes = require("./routes/courseRoutes");
const mediaRoutes = require("./routes/mediaRoutes");
const logger = require("./middlewares/logger");
const { globalErrorHandler } = require("./middlewares/errorHandlers");

const app = express();
const DB_URI = process.env.DB_URI;

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(logger);

// Routes configuration
app.use("/users", userRoutes);
app.use("/courses", courseRoutes);
app.use("/media", mediaRoutes);

// Global error handlers (Must be after routes)
app.use(globalErrorHandler);

// Database connection
mongoose
  .connect(DB_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Connection Error:", err));

app.get("/", (req, res) => {
  res.send("Hello from AI Scholar server...");
});

module.exports = app;