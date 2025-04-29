const { Server } = require("socket.io");
const { authenticateSocket } = require("../middlewares/auth.middleware");

let io;
const initSocketIO = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URI,
      methods: "*",
      credentials: true,
    },
  });

  io.use(authenticateSocket);

  io.on("connection", (socket) => {
    console.log(`User ${socket.user.email} connected with id ${socket.id}`);

    socket.join(socket.user.id);

    socket.on("disconnect", () => {
      console.log(`User ${socket.user.email} disconnected`);
    });
  });

  return io;
};

const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
};

module.exports = { initSocketIO, getIO };
