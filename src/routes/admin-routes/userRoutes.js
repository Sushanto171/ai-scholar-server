const {
  createUser,
  getUsers,
  updateUserRole,
  singleUser,
  updateUser,
  updateProfileImage,
} = require("../../controllers/admin-controller/userController");

const router = require("express").Router();

// 🔸 CREATE NEW USER OR RETURN EXISTING USER (POST /users)
router.post("/", createUser);

// 🔸 GET ALL USERS DATA FROM DATABASE (GET /users)
router.get("/", getUsers);

// 🔸 UPDATE USER ROLE BY ADMIN (PATCH /users/:id)
router.patch("/:id", updateUserRole);

router.get("/:email", singleUser);

router.put("/:email", updateUser);

router.put("/image/:email", updateProfileImage);

module.exports = router;