const User = require("../models/user");
const createError = require("http-errors");
require("express-async-errors");

exports.getAllUsers = async (req, res, next) => {
  const users = await User.find();
  res.status(200).json(users);
};

exports.getUserById = async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (user) {
    res.status(200).json(user);
  } else {
    return next(createError(400, "User not found"));
  }
};

exports.createUser = async (req, res, next) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }
    const user = new User(req.body);
    await user.validate();
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    return next(createError(400, error.message))
  }
};

exports.updateUserById = async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    try {
      const updatedUser = await user.save();
      res.status(200).json(updatedUser);
    } catch (err) {
      return next(createError(400, err.message));
    }
  } else {
    return next(createError.NotFound("User not found"));
  }
};

exports.deleteUserById = async (req, res, next) => {
  await User.findByIdAndDelete(req.params.id);
  res.status(204).send();
};