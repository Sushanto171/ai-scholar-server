const User = require("../models/User");
const { sendResponse } = require("../utils");

const getUsers = async (req, res, next) => {
  try {
    const result = await User.find();
    sendResponse(res, 200, true, result);
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  try {
    const userData = req.body;

    const isUser = await User.findOne({ email: userData.email });
    console.log({ isUser });
    
    let result;
    if (!isUser) {
      result = await User.create(userData);
    } else {
      result = isUser;
    }

    sendResponse(res, 201, true, "Successfully users created", result);
  } catch (error) {
    next(error); // pass the error to the global handler
  }
};

module.exports = {
  getUsers,
  createUser
}