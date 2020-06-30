module.exports = io => {
  io.on('connection', (socket) => {
    console.log(`New User connected: ${socket.id}`);
    socket.on('userCoordinates', coords => {
      socket.broadcast.emit('newUserCoordinates', coords)
      // socket.emit('newUserCoordinates',coords)
    });
  });
}