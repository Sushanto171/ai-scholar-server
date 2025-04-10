const {
  createUser,
  getUsers,
  updateUserRole,
} = require("../../controllers/admin-controller/userController");

const router = require("express").Router();

// 🔸 CREATE NEW USER OR RETURN EXISTING USER (POST /users)
router.post("/", createUser);

// 🔸 GET ALL USERS DATA FROM DATABASE (GET /users)
router.get("/", getUsers);

// 🔸 UPDATE USER ROLE BY ADMIN (PATCH /users/:id)
router.patch("/:id", updateUserRole);

module.exports = router;