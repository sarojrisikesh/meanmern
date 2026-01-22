const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Register
router.post('/register', userController.register);
// login user
router.post('/login', userController.login);

// Get all users
router.get('/users', userController.getUsers);

// Update user (POST)
router.post('/users/update/:id', userController.updateUser);

// Delete user
router.delete('/users/delete/:id', userController.deleteUser);

 

module.exports = router;

