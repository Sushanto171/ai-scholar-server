const {
  createUser,
  getUsers,
  updateUserRole,
  updateUserRoleByEmail,
  updateUserInstructorStatusByEmail,
  singleUser,
  updateUser,
  updateProfileImage,
} = require("../../controllers/admin-controller/userController");

const router = require("express").Router();

// 🔸 CREATE NEW USER OR RETURN EXISTING USER (POST /users)
router.post("/", createUser);

// 🔸 GET ALL USERS DATA FROM DATABASE (GET /users)
router.get("/", getUsers);

// 🔸 UPDATE USER ROLE BY ID (PATCH /users/:id)
router.patch("/:id", updateUserRole);

// 🔸 UPDATE USER ROLE BY EMAIL (PATCH /users/:email)
router.patch("/:email", updateUserRoleByEmail);

// 🔸 UPDATE USER STATUS FROM STUDENT TO INSTRUCTOR (PATCH /users/status/:email)
router.patch("/status/:email", updateUserInstructorStatusByEmail);

// 🔸 GET SINGLE USER'S DATA FROM DATABASE (GET /users/:email)
router.get("/:email", singleUser);

// 🔸 UPDATE USER DATA BY EMAIL (PUT /users/:email)
router.put("/:email", updateUser);

// 🔸 UPDATE USER PROFILE IMAGE BY EMAIL (PUT /users/image/:email)
router.put("/image/:email", updateProfileImage);

module.exports = router;