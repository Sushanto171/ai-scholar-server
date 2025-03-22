const User = require("../models/userModels");
const { sendResponse } = require("../utils");

exports.getUsers = async (req, res, next) => {
  try {
    const result = await User.find();

    sendResponse(res, 200, true, result);
  } catch (error) {
    next(error);
  }
};

exports.createUser = async (req, res, next) => {
  try {
    const userData = req.body;

    const isUser = await User.findOne({ email: userData.email });
    console.log({ isUser });
    let result;
    if (!isUser) {
      result = await User.insertOne(userData);
    } else {
      result = isUser;
    }

    sendResponse(res, 201, true, "Successfully users created", result);
  } catch (error) {
    next(error); // pass the error to the global handler
  }
};
