const createError = require("http-errors");

exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
    return next(createError(401, "Unauthorized"));
};