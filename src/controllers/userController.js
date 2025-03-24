const User = require("../models/userModels");
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
        : "Successfully users created",
      result
    );
  } catch (error) {
    next(error); // pass the error to the global handler
  }
};


module.exports = {
  getUsers,
<<<<<<< HEAD:controllers/userControllers.js
  createUser
};


=======
  createUser,
};
>>>>>>> 87b9fa3451153bdc85f43ed031b0181f9e97b846:src/controllers/userController.js
