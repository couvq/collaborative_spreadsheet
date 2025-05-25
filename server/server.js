const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

const positions = new Map()

io.on("connection", (socket) => {
  console.log(`user ${socket.id} connected...`);

  socket.on('disconnect', (reason) => {
    console.log(`Socket ${socket.id} Disconnected with reason: ${reason}`)
    positions.delete(socket.id)
    io.emit(
      "cursor_move",
      JSON.stringify([...positions.entries()])
    );
  })

  socket.on("cursor_move", (position) => {
    positions.set(socket.id, position)
    console.log(`${socket.id} moved to ${JSON.stringify(position)}`);
    io.emit(
      "cursor_move",
      JSON.stringify([...positions.entries()])
    );
  });
});

httpServer.listen(8080);
