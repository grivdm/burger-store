const User = require("../models/user");
const Address = require("../models/address");
const createError = require("http-errors");
require("express-async-errors");

// check if user is exist by id
// this middleware is used in the following routes:
// GET a single user by ID
// PUT an existing user by ID
// DELETE an existing user by ID
// PUT an existing user password by ID
exports.checkIfUserExist = async (req, res, next) => {
  const userInDb = await User.findById(req.params.id);
  if (!userInDb) {
    return next(createError.NotFound("User not found"));
  }
  req.userInDb = userInDb;
  next();
};


// GET all users
exports.getAllUsers = async (req, res, next) => {
  const users = await User.find();
  res.status(200).json(users);
};

// GET a single user by ID
exports.getUserById = async (req, res, next) => {
  res.status(200).json(req.userInDb);
};

// POST a new user
exports.createUser = async (req, res, next) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return next(createError(400, "Email already exists"));
    }
    const user = new User(req.body);
    await user.validate();
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    return next(createError(400, error.message));
  }
};


// PUT an existing user by ID
exports.updateUserById = async (req, res, next) => {
  const user = req.userInDb;
  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  try{
    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } catch (err){
    return next(createError(400, err.message));
  }
};

// PUT an existing user password by ID
exports.updateUserPasswordById = async (req, res, next) => {
  const user = req.userInDb;
  user.password = req.body.password || user.password;
  try{
    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } catch (err){
    return next(createError(400, err.message));
  }

}

// GET orders of a user by ID
exports.getOrdersByUserId = async (req, res, next) => {
  const user = req.userInDb;
  const orders = await User.findById(user._id).populate("orders");
  res.status(200).json(orders);
};


// GET addresses of a user by ID
exports.getAddressesByUserId = async (req, res, next) => {
  const user = req.userInDb;
  const addresses = await User.findById(user._id).populate("addresses");
  res.status(200).json(addresses);
};


// POST a new address for a user by ID
exports.createAddressByUserId = async (req, res, next) => {
  const user = req.userInDb;
  const {address} = req.body;
  const newAddress = new Address({address: address, user: user._id}); 
  try {
    await newAddress.validate();
    await newAddress.save();
    // user.addresses.push(newAddress._id);
    // await user.save();
    res.status(201).json(newAddress);
  } catch (error) {
    return next(createError(400, error.message));
  }
};

  

// DELETE an existing user by ID
exports.deleteUserById = async (req, res, next) => {
  const userId = req.userInDb._id;
  await User.findByIdAndDelete(userId);
  res.status(204).send();
};
