const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Registering a new user
router.post('/register', authController.registerUser);

// Login an existing user
router.post('/login', authController.loginUser);

module.exports = router;
