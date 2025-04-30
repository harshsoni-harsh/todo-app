const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const swaggerUi = require("swagger-ui-express");

const todoRoutes = require("./routes/todo.routes");
const authRoutes = require("./routes/auth.routes");
const { swaggerSpec } = require("./config/swagger");

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URI,
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = app;
