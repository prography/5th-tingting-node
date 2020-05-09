const socketSessions = {}
const socketBuilder = server => {
  const io = require('socket.io').listen(server)
  io.on('connection', socket => {
    socket.on('enroll', (data) => {
      socket.userId = data.userId
      if (data.userId) socketSessions[data.userId] = socket
      console.log(Object.keys(socketSessions))
    })
    socket.on('disconnect', () => {
      if (socket.userId) delete socketSessions[socket.userId]
      console.log(Object.keys(socketSessions))
    })
  })
}

module.exports = { socketBuilder, socketSessions }
