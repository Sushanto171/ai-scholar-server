const User = require("../models/userModels");
const { sendResponse } = require("../utils");

const getUsers = async (req, res, next) => {
  try {
    const result = await User.find();
    sendResponse(res, 200, true, "Successfully fetched all users data", result);
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  try {
    const userData = req.body;

    const isUser = await User.findOne({ email: userData.email });

    let result;
    if (!isUser) {
      // console.log({ userData });
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
        : "Successfully users created",
      result
    );
  } catch (error) {
    next(error); // pass the error to the global handler
  }
};

const updateUser = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsers,
  createUser
};
