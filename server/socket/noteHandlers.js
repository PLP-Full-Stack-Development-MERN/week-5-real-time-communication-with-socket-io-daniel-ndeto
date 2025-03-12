const Note = require('../models/Note');

//  update the DB and notify others When a client edits a note
exports.handleEditNote = async (io, socket, data) => {
  const { noteId, content, room } = data;
  try {

    const note = await Note.findByIdAndUpdate(
      noteId,
      { content, updatedAt: Date.now() },
      { new: true }
    );
    // Broadcasting the updated note to others in the same room
    socket.to(room).emit('noteUpdated', note);
  } catch (error) {
    console.error('Error updating note:', error);
  }
};
