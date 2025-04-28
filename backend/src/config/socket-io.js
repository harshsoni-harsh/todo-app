const { Server } = require('socket.io');
const Todo = require('../models/todo.model');

let io;

const initSocketIO = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URI,
      methods: "*",
      credentials: true,
    },
  });

  io.use(require('../middlewares/auth.middleware').authenticateSocket);

  initChangeStream(io);

  io.on('connection', (socket) => {
    console.log(`User ${socket.userId} connected`);

    socket.on('disconnect', () => {
      console.log(`User ${socket.userId} disconnected`);
    });
  });

  return io;
};

const initChangeStream = async (io) => {
  try {
    const changeStream = Todo.watch();

    changeStream.on('change', (change) => {
      console.log('Change detected:', change);
      io.emit('dataChanged', change);
    });

    console.log('Change stream initialized successfully.');
  } catch (err) {
    console.error('Error setting up change stream:', err);
  }
};

module.exports = { initSocketIO };
