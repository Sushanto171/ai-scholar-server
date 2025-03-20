require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PROT || 5000;

// middleware
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Ai-Scholar now running...");
});

app.listen(port, () => {
  console.log(`AI-Scholar Server running on port: ${port}`);
});
