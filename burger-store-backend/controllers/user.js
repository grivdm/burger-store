const User = require('../models/user');

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

exports.getUserById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

exports.createUser = async (req, res, next) => {
  const { name, email } = req.body;
  const user = new User({ name, email });
  try {
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

exports.updateUserById = async (req, res, next) => {
  const { id } = req.params;
  const { name, email } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      id,
      { name, email },
      { new: true }
    );
    res.json(user);
  } catch (error) {
    next(error);
  }
};

exports.deleteUserById = async (req, res, next) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};