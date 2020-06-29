module.exports = io => {
  io.on('connection', (socket) => {
    console.log('New User connected');
    socket.on('userCoordinates', coords => {
      socket.broadcast.emit('newUserCoordinates', coords)
    });
  });
}