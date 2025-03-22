exports.globalErrorHandler = (err, req, res, next) => {
  console.error("GlobalHandled ERROR:", err.stack || err.message);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal server Error",
  });
  next();
};