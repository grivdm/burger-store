const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const checkIdIsValid = require("../middlewares/checkIdHandler");

// GET all users
router.get("/", userController.getAllUsers);

// GET an user by ID
router.get(
  "/:id",
  checkIdIsValid,
  userController.checkIfUserExist,
  userController.getUserById
);

// POST a new user
router.post("/", userController.createUser);

// PUT an user by ID
router.put(
  "/:id",
  checkIdIsValid,
  userController.checkIfUserExist,
  userController.updateUserById
);

// DELETE an user by ID
router.delete(
  "/:id",
  checkIdIsValid,
  userController.checkIfUserExist,
  userController.deleteUserById
);

//PUT an user password by ID
router.put(
  "/:id/password",
  checkIdIsValid,
  userController.checkIfUserExist,
  userController.updateUserPasswordById
);


//GET orders of a user by ID
router.get(
  "/:id/orders",
  checkIdIsValid,
  userController.checkIfUserExist,
  userController.getOrdersByUserId
);

//GET addresses of a user by ID
router.get(
  "/:id/addresses",
  checkIdIsValid,
  userController.checkIfUserExist,
  userController.getAddressesByUserId
);

//POST a new address for a user by ID
router.post(
  "/:id/addresses",
  checkIdIsValid,
  userController.checkIfUserExist,
  userController.createAddressByUserId
);

// Export the router
module.exports = router;
