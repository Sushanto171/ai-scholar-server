const User = require("../../models/userModel");
const { sendResponse } = require("../../utils/responseHandler");

// 🔸 CREATE NEW USER OR RETURN EXISTING USER (POST /users)
const createUser = async (req, res, next) => {
  try {
    const userData = req.body;

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
    // console.log("id...",id)
    const { role } = req.body;
    // console.log("id...",role)

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

// get a user by email
const singleUser = async (req, res, next) => {
  try {
    const email = req.params.email; // or req.params.email depending on your route

    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }

    const userProfile = await User.findOne({ email });

    if (!userProfile) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "User fetched successfully",
      data: userProfile
    });
  } catch (error) {
    next(error);
  }
};
// update a user by email
const updateUser = async (req, res, next) => {
  try {
    const userData = req.params.email;
    const { name, about, email } = req.body;

    const updateDoc = {
      $set: {
        name,
        email,
        about,
      },
    };

    const result = await User.findOneAndUpdate(
      { email: userData },
      updateDoc,
      { new: true }
    );

    res.send({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};
// update profile by email
const updateProfileImage = async (req, res, next) => {
  try {
    const { email } = req.params;
    const { image } = req.body;

    if (!email || !image) {
      return res.status(400).json({ message: "Email and image URL are required." });
    }

    const updatedUser = await User.findOneAndUpdate(
      { email },
      { $set: { image } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({
      message: "Profile image updated successfully.",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Error updating profile image:", error);
    next(error);
  }
};



module.exports = {
  createUser,
  getUsers,
  updateUserRole,
  singleUser,
  updateUser,
  updateProfileImage
};
