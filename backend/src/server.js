require("dotenv").config();
const http = require("http");

const app = require("./app");
const connectDB = require("./config/db");
const { initSocketIO } = require("./config/socket-io");

const PORT = process.env.PORT || 4000;

const server = http.createServer(app);

const startServer = async () => {
  try {
    await connectDB();
    initSocketIO(server);

    server.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
};

startServer();
