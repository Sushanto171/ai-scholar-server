// ❇️ SEND SUCCESSFUL RESPONSE WITH SUCCESS MESSAGE & DATA
exports.sendResponse = (res, status, success, message, data) => {
  res.status(status).json({
    success,
    message,
    data,
  });
};