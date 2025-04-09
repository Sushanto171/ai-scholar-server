const User = require("../../models/userModel");
const { sendResponse } = require("../../utils/responseHandler");

// SAVE USER DATA ON DATABASE (POST /users)
const createUser = async (req, res, next) => {
  try {
    const userData = req.body;

    const isUser = await User.findOne({ email: userData.email });
    console.log({ isUser });

    let result;

    if (!isUser) {
      console.log({ userData });
      result = await User.create(userData);
    } else {
      result = isUser;
    }

    sendResponse(
      res,
      isUser ? 200 : 201,
      true,
      isUser
        ? "User already existing the database"
        : "Successfully user created",
      result
    );
  } catch (error) {
    next(error); // pass the error to the global handler
  }
};

// GET ALL USER'S DATA FROM DATABASE (GET /users)
const getUsers = async (req, res, next) => {
  try {
    const result = await User.find();
    sendResponse(res, 200, true, result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsers,
  createUser,
};
