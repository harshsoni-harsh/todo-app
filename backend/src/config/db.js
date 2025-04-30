const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");

    const gracefulExit = async (signal) => {
      await mongoose.connection.close();
      console.log(`MongoDB connection closed on ${signal}`);
      process.exit(0);
    };

    process.on("SIGINT", () => gracefulExit("SIGINT"));
    process.on("SIGTERM", () => gracefulExit("SIGTERM"));
    process.once("SIGUSR2", async () => {
      await gracefulExit("SIGUSR2");
      process.kill(process.pid, "SIGUSR2");
    });
  } catch (err) {
    console.error("Error connecting to MongoDB:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
