require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PROT || 5000;
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const { globalErrorHandler } = require("./middlewares/errorHandlers");

// middleware
app.use(express.json());
app.use(cors());
app.use("/users", userRoutes);

// global error handlers (Must be after routes)
app.use(globalErrorHandler);

// Database connection
mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Connection Error:", err));

  
app.get("/", (req, res) => {
  res.send("Ai-Scholar now running...");
});


app.listen(port, () => {
  console.log(`AI-Scholar Server running on port: ${port}`);
});
