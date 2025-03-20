const { getUsers, createUser } = require("../controllers/userControllers");

const router = require("express").Router();

router.get("/", getUsers);

router.post("/", createUser);

module.exports = router;
