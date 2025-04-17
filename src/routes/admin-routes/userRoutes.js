const {
  createUser,
  getUsers,
  updateUserRole,
  updateUserRoleByEmail,
  updateUserInstructorStatusByEmail,

  singleUser,
} = require("../../controllers/admin-controller/userController");

const router = require("express").Router();

// 🔸 CREATE NEW USER OR RETURN EXISTING USER (POST /users)
router.post("/", createUser);

// 🔸 GET ALL USERS DATA FROM DATABASE (GET /users)
router.get("/", getUsers);

// 🔸 UPDATE USER ROLE BY ADMIN (PATCH /users/:id)
router.patch("/:id", updateUserRole);
router.patch("/user/:email", updateUserRoleByEmail);
router.patch("/status/:email", updateUserInstructorStatusByEmail);
router.get("/:email", singleUser);

module.exports = router;