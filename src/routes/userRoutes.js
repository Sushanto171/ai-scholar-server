const express = require("express");
const { getUsers, createUser } = require("../controllers/userController");

const router = express.Router();

// SAVE USER DATA ON DATABASE (POST /users)
router.post("/", createUser);

// GET ALL USER'S DATA FROM DATABASE (GET /users)
router.get("/", getUsers);

module.exports = router;