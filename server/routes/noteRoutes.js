const express = require('express');
const router = express.Router();
const noteController = require('../controllers/noteController');

// POST: createing a new note
router.post('/', noteController.createNote);

// GET: retrieving notes by room
router.get('/:room', noteController.getNotesByRoom);

// PUT: updating a note by its id
router.put('/:id', noteController.updateNote);

module.exports = router;
