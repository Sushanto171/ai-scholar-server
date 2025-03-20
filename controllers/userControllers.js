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

    const result = await User.insertOne(userData);

    sendResponse(res, 201, true, "Successfully users created", result);
  } catch (error) {
    next(error); // pass the error to the global handler
  }
};
