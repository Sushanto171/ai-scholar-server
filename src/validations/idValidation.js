const mongoose = require("mongoose");

exports.checkId = (id) => {
  const result = mongoose.Types.ObjectId.isValid(id);
  return result;
};