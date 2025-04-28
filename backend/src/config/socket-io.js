const { Server } = require("socket.io");
const { authenticateSocket } = require("../middlewares/auth.middleware");
const Todo = require("../models/todo.model");

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

  initChangeStream(io);

  io.on("connection", (socket) => {
    console.log(`User ${socket.user.email} connected with id ${socket.id}`);

    socket.join(socket.user.id);

    socket.on("disconnect", () => {
      console.log(`User ${socket.user.email} disconnected`);
    });
  });

  return io;
};

const initChangeStream = async (io) => {
  try {
    const changeStream = Todo.watch();

    changeStream.on("change", (change) => {
      io.emit("dataChanged", change);
    });

    console.log("Change stream initialized successfully.");
  } catch (err) {
    console.error("Error setting up change stream:", err);
  }
};

const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
};

module.exports = { initSocketIO, getIO };
