module.exports = function (io, useSocket) {
  if (useSocket === true) {
    io.on("connection", (socket, options) => {
      socket.emit("message", { msg: "Welcome Socket.io~" + socket.id })
      console.log(
        `user connected..., socket.id : ${socket.id}, socket.query `,
        socket.handshake.query
      )

      socket.on("join", (room, func) => {
        socket.join(room)
        io.to(room).emit(`Hello ${room} members`)
        console.log("Joining room : ", room, socket.rooms)
        func && func()
      })

      socket.on("rooms", (func) => {
        console.log(JSON.stringify(socket.rooms))
        func(JSON.stringify(socket.rooms))
      })

      socket.on("leave", (data, func) => {
        socket.leave(data)
      })

      socket.on("message", (data, func) => {
        console.log("message : ", data.msg, socket.rooms)
        func(data.msg)
      })

      socket.on(
        "disconnecting",
        (data) => console.log("user disconnecting..." + socket.id),
        socket.rooms
      )
      socket.on(
        "disconnect",
        (data) => console.log("user disconnected..." + socket.id),
        socket.rooms
      )
    })
  }
}
