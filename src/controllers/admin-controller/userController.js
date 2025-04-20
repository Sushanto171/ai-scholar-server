const User = require("../../models/User");
const { sendResponse } = require("../../utils/responseHandler");

/* ============================================================
   🔸 CREATE A NEW USER OR RETURN EXISTING USER (POST /users)
=============================================================== */
const createUser = async (req, res, next) => {
  try {
    const userData = req.body;
    console.log("USER DATA:", userData);

    const existingUser = await User.findOne({ email: userData.email });

    // RETURN EXISTING USER IF FOUND
    if (existingUser) {
      return sendResponse(
        res,
        200,
        true,
        "USER ALREADY EXISTS IN THE DATABASE",
        existingUser
      );
    }

    // CREATE NEW USER
    const newUser = await User.create(userData);
    sendResponse(res, 201, true, "USER CREATED SUCCESSFULLY", newUser);
  } catch (error) {
    next(error);
  }
};

/* ============================================================
   🔸 GET ALL USERS DATA FROM DATABASE (GET /users)
=============================================================== */
const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    sendResponse(res, 200, true, "USERS RETRIEVED SUCCESSFULLY", users);
  } catch (error) {
    next(error);
  }
};

/* ============================================================
   🔸 UPDATE USER ROLE BY USER ID (PATCH /users/:id)
=============================================================== */
const updateUserRole = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log("id...", id);
    const { role , banStatus} = req.body;
    // console.log("banStatus...",role);
    console.log("banStatus...", role, banStatus);
    const updateData = {};
    // // Validate role
    // const allowedRoles = ["student", "instructor", "admin"];
    if (role) {
     
      updateData.role = role;
    }
    
    
    if (typeof banStatus === "boolean") {
      
      updateData.banStatus = banStatus;
    }
    console.log(updateData)

    const updatedUser = await User.findByIdAndUpdate(
      id,
      updateData ,
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return sendResponse(res, 404, false, "USER NOT FOUND");
    }

    sendResponse(res, 200, true, "USER ROLE UPDATED SUCCESSFULLY", updatedUser);
  } catch (error) {
    next(error);
  }
};

/* ============================================================
   🔸 UPDATE USER ROLE BY EMAIL (PATCH /users/:email)
=============================================================== */
const updateUserRoleByEmail = async (req, res, next) => {
  try {
    const { email } = req.params;
    const { role, instructorStatus } = req.body;

    console.log("EMAIL:", email);
    console.log("ROLE & STATUS:", role, instructorStatus);

    const allowedRoles = ["student", "instructor", "admin"];
    if (!allowedRoles.includes(role)) {
      return sendResponse(res, 400, false, "INVALID ROLE PROVIDED");
    }

    const updatedUserByEmail = await User.findOneAndUpdate(
      { email },
      { role, instructorStatus },
      { new: true, runValidators: true }
    );

    if (!updatedUserByEmail) {
      return sendResponse(res, 404, false, "USER NOT FOUND");
    }

    sendResponse(
      res,
      200,
      true,
      "USER ROLE UPDATED SUCCESSFULLY",
      updatedUserByEmail
    );
  } catch (error) {
    next(error);
  }
};

/* =====================================================================
   🔸 UPDATE USER INSTRUCTOR STATUS ONLY (PATCH /users/status/:email)
======================================================================== */
const updateUserInstructorStatusByEmail = async (req, res, next) => {
  try {
    const { email } = req.params;
    const { role, instructorStatus } = req.body;

    console.log("EMAIL:", email);
    console.log("ROLE:", role);
    console.log("INSTRUCTOR STATUS:", instructorStatus);

    const updatedUserByEmail = await User.findOneAndUpdate(
      { email },
      { instructorStatus },
      { new: true, runValidators: true }
    );

    if (!updatedUserByEmail) {
      return sendResponse(res, 404, false, "USER NOT FOUND");
    }

    sendResponse(
      res,
      200,
      true,
      "USER STATUS UPDATED SUCCESSFULLY",
      updatedUserByEmail
    );
  } catch (error) {
    next(error);
  }
};

/* ============================================================
   🔸 GET SINGLE USER BY EMAIL (GET /users/:email)
=============================================================== */
const singleUser = async (req, res, next) => {
  try {
    const email = req.params.email;

    // EMAIL IS REQUIRED
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "EMAIL IS REQUIRED",
      });
    }

    const userProfile = await User.findOne({ email });

    if (!userProfile) {
      return res.status(404).json({
        success: false,
        message: "USER NOT FOUND",
      });
    }

    sendResponse(res, 200, true, "USER FETCHED SUCCESSFULLY", userProfile);
  } catch (error) {
    next(error);
  }
};

/* ============================================================
   🔸 UPDATE USER PROFILE BY EMAIL (PUT /users/:email)
=============================================================== */
const updateUser = async (req, res, next) => {
  try {
    const userEmail = req.params.email;
    const { name, about, email } = req.body;

    const updateDoc = {
      $set: {
        name,
        email,
        about,
      },
    };

    const updatedUserProfile = await User.findOneAndUpdate(
      { email: userEmail },
      updateDoc,
      {
        new: true,
      }
    );

    sendResponse(
      res,
      200,
      true,
      "USER PROFILE UPDATED SUCCESSFULLY",
      updatedUserProfile
    );
  } catch (error) {
    next(error);
  }
};
/* ============================================================
   🔸 Delete  USER PROFILE BY ID (Delete /users/user/:id)
=============================================================== */
const deleteUser = async (req, res, next) => {
  try {
    const {id} = req.params;
    console.log(id)

    // const updateDoc = {
    //   $set: {
    //     name,
    //     email,
    //     about,
    //   },
    // };

    const updatedUserProfile = await User.findByIdAndDelete(
      id
    );

    sendResponse(
      res,
      200,
      true,
      "USER PROFILE DELETED SUCCESSFULLY"
    );
  } catch (error) {
    next(error);
  }
};

/* ==================================================================
   🔸 UPDATE USER PROFILE IMAGE BY EMAIL (PUT /users/image/:email)
===================================================================== */
const updateProfileImage = async (req, res, next) => {
  try {
    const { email } = req.params;
    const { image } = req.body;

    // VALIDATION
    if (!email || !image) {
      return res.status(400).json({
        message: "EMAIL AND IMAGE URL ARE REQUIRED",
      });
    }

    const updatedUser = await User.findOneAndUpdate(
      { email },
      { $set: { image } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        message: "USER NOT FOUND",
      });
    }

    sendResponse(
      res,
      200,
      true,
      "PROFILE IMAGE UPDATED SUCCESSFULLY",
      updatedUser
    );
  } catch (error) {
    console.error("ERROR UPDATING PROFILE IMAGE:", error);
    next(error);
  }
};

// 🔹 EXPORT ALL USER CONTROLLER FUNCTIONS
module.exports = {
  createUser,
  getUsers,
  updateUserRole,
  updateUserRoleByEmail,
  updateUserInstructorStatusByEmail,
  singleUser,
  updateUser,
  updateProfileImage,
  deleteUser
};