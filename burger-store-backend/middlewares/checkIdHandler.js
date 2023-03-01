const ObjectId = require("mongoose").Types.ObjectId;
const createError = require("http-errors");

// check if id is valid
const checkIdIsValid = (req, res, next) => {
  const id = req.params.id;
  if (!ObjectId.isValid(id)) {
    return next(createError(400, "Invalid ID"));
  }
  
  next();
}

module.exports = checkIdIsValid;
