const createError = require("http-errors");

exports.ensureAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.isAdmin) {
    return next();
  }
  return next(createError(401, "User is not admin"));
};
