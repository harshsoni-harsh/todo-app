const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const http = require("http");

const connectDB = require("./config/db");
const todoRoutes = require("./routes/todo.routes");
const authRoutes = require("./routes/auth.routes");
const { initSocketIO } = require("./config/socket-io");

dotenv.config({ path: ".env" });

const app = express();
const server = http.createServer(app);
app.use(
  cors({
    origin: process.env.FRONTEND_URI,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

connectDB();
initSocketIO(server);

app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
