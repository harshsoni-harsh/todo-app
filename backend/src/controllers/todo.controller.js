const Todo = require("../models/todo.model");
const { getIO } = require("../config/socket-io");

exports.createTodo = async (req, res) => {
  const { title, description } = req.body;
  const userId = req.user.id;
  try {
    const todo = new Todo({
      title,
      description,
      userId: req.user.id,
    });
    await todo.save();

    const io = getIO();
    io.to(userId).emit("todoCreated", todo);

    res.status(201).json({ todo });
  } catch (error) {
    res.status(500).json({ error: "Failed to create todo" });
  }
};

exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.user.id });
    res.status(200).json({ todos });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch todos" });
  }
};

exports.updateTodo = async (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;
  const userId = req.user.id;
  try {
    const todo = await Todo.findByIdAndUpdate(
      id,
      { title, description, completed },
      { new: true },
    );
    if (!todo) return res.status(404).json({ error: "Todo not found" });

    const io = getIO();
    io.to(userId).emit("todoUpdated", todo);

    res.status(200).json({ todo });
  } catch (error) {
    res.status(500).json({ error: "Failed to update todo" });
  }
};

exports.deleteTodo = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  try {
    const todo = await Todo.findByIdAndDelete(id);
    if (!todo) return res.status(404).json({ error: "Todo not found" });

    const io = getIO();
    io.to(userId).emit("todoDeleted", todo._id);

    res.status(200).json({ message: "Todo deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete todo" });
  }
};
