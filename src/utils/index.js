const mongoose = require("mongoose");
exports.sendResponse = (res, status, success, message, data) => {
  res.status(status).json({
    success,
    message,
    data,
  });
};

exports.checkId = (id) => {
  const result = mongoose.Types.ObjectId.isValid(id);
  return result;
};
