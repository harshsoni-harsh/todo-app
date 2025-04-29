const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const http = require("http");
const swaggerUi = require("swagger-ui-express");

const connectDB = require("./config/db");
const todoRoutes = require("./routes/todo.routes");
const authRoutes = require("./routes/auth.routes");
const { initSocketIO } = require("./config/socket-io");
const { swaggerSpec } = require("./config/swagger");

dotenv.config({ path: ".env" });

const app = express();
const server = http.createServer(app);

connectDB();
initSocketIO(server);

app.use(
  cors({
    origin: process.env.FRONTEND_URI,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
