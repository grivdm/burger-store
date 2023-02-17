const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

// GET all users
router.get('/', userController.getAllUsers);

// GET a single user by ID
router.get('/:id', userController.getUserById);

// POST a new user
router.post('/', userController.createUser);

// PUT an existing user by ID
router.put('/:id', userController.updateUserById);

// DELETE an existing user by ID
router.delete('/:id', userController.deleteUserById);

module.exports = router;