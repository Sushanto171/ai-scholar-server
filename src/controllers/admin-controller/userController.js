const User = require("../../models/userModel");
const { sendResponse } = require("../../utils/responseHandler");

// 🔸 CREATE NEW USER OR RETURN EXISTING USER (POST /users)
const createUser = async (req, res, next) => {
  try {
    const userData = req.body;
    console.log(userData);

    const existingUser = await User.findOne({ email: userData.email });

    if (existingUser) {
      return sendResponse(
        res,
        200,
        true,
        "User already exists in the database",
        existingUser
      );
    }

    const newUser = await User.create(userData);
    sendResponse(res, 201, true, "User created successfully", newUser);
  } catch (error) {
    next(error);
  }
};

// 🔸 GET ALL USERS DATA FROM DATABASE (GET /users)
const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    sendResponse(res, 200, true, "Users retrieved successfully", users);
  } catch (error) {
    next(error);
  }
};

// 🔸 UPDATE USER ROLE BY ADMIN (PATCH /users/:id)
const updateUserRole = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log("id...", id);
    const { role } = req.body;
    console.log("id...", role);

    // Validate role
    const allowedRoles = ["student", "instructor", "admin"];
    if (!allowedRoles.includes(role)) {
      return sendResponse(res, 400, false, "Invalid role provided");
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { role },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return sendResponse(res, 404, false, "User not found");
    }

    sendResponse(res, 200, true, "User role updated successfully", updatedUser);
  } catch (error) {
    next(error);
  }
};
// 🔸 UPDATE USER ROLE BY ADMIN (PATCH /users/:email)
const updateUserRoleByEmail = async (req, res, next) => {
  try {
    const { email } = req.params;
    console.log("id...", email);
    const { role, instructorStatus } = req.body;
    console.log("role...", role, instructorStatus);

    // Validate role
    const allowedRoles = ["student", "instructor", "admin"];
    if (!allowedRoles.includes(role)) {
      return sendResponse(res, 400, false, "Invalid role provided");
    }

    const updatedUserbyEmaill = await User.findOneAndUpdate(
      { email },
      { role },
      { instructorStatus },
      { new: true, runValidators: true }
    );

    if (!updatedUserbyEmaill) {
      return sendResponse(res, 404, false, "User not found");
    }

    sendResponse(
      res,
      200,
      true,
      "User role updated successfully",
      updatedUserbyEmaill
    );
  } catch (error) {
    next(error);
  }
};
// 🔸 UPDATE USER ROLE BY ADMIN (PATCH /users/:email)
const updateUserInstructorStatusByEmail = async (req, res, next) => {
  try {
    const { email } = req.params;
    console.log("id...", email);
    const { instructorStatus } = req.body;
    console.log("instructorStatus...", instructorStatus);

    // Validate role
    // const allowedRoles = ["student", "instructor", "admin"];
    // if (!allowedRoles.includes(role)) {
    //   return sendResponse(res, 400, false, "Invalid role provided");
    // }

    const updatedUserbyEmail = await User.findOneAndUpdate(
      { email },
      { instructorStatus },
      { new: true, runValidators: true }
    );

    if (!updatedUserbyEmail) {
      return sendResponse(res, 404, false, "User not found");
    }

    sendResponse(
      res,
      200,
      true,
      "User role updated successfully",
      updatedUserbyEmail
    );
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createUser,
  getUsers,
  updateUserRole,
  updateUserRoleByEmail,
  updateUserInstructorStatusByEmail,
};
