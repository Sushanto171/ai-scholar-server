// Definition
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const morgan = require("morgan");
const userRoutes = require("./routes/userRoutes");
const coursesRoutes = require("./routes/coursesRoutes");
const logger = require("./middlewares/logger");
const { globalErrorHandler } = require("./middlewares/errorHandlers");

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(logger);
app.use("/users", userRoutes);
app.use("/courses", coursesRoutes);

// Global error handlers (Must be after routes)
app.use(globalErrorHandler);

// Database connection
mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Connection Error:", err));

app.get("/", (req, res) => {
  res.send("Hello from AI Scholar server...");
});

module.exports = app;