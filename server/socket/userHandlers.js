const User = require('../models/User');

// When a user joins, update connection status and broadcast the new user list
exports.userJoin = async (io, socket, data) => {
  const { username, room } = data;

  try {
    let user = await User.findOne({ username, room });
    if (!user) {
      user = new User({ username, room });
    }
    user.connected = true;
    await user.save();
    const users = await User.find({ room, connected: true });
    io.to(room).emit('usersList', users);
  } catch (error) {
    console.error('Error in user join:', error);
  }
};

// Handling user disconnect events
exports.userDisconnect = async (io, socket) => {
  try {
    const user = users[socket.id];

    if (user) {
      const { room, username } = user;
      delete users[socket.id];
      const users = await User.find
      ({ room, connected: true });
      io.to(room).emit('usersList', users);
      io.to(room).emit('notification', `${username} has left the room.`);

      await User.updateOne({ username, room }, { connected: false });
      console.log(`${username} left room ${room}`);
    }
    
  } catch (error) {
    console.error('Error in user disconnect:', error);
  }
  socket.disconnect();
  console.log('User disconnected');
}

