const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// POST: creating or join a user
router.post('/', userController.createUser);

// GET: geting users by room
router.get('/:room', userController.getUsersByRoom);

module.exports = router;
