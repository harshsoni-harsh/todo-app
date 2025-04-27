const express = require("express");
const todoController = require("../controllers/todo.controller");
const verifyToken = require("../middlewares/auth.middleware");

const router = express.Router();
router.use(verifyToken);

router.post("/", todoController.createTodo);
router.get("/", todoController.getTodos);
router.put("/:id", todoController.updateTodo);
router.delete("/:id", todoController.deleteTodo);

module.exports = router;
