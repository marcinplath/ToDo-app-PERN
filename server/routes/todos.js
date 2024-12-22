const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth");
const {
    createTodo,
    getTodos,
    getTodoById,
    updateTodo,
    deleteTodo,
} = require("../controllers/todosController");

// Obsługa todos
router.post("/", authMiddleware, createTodo);
router.get("/", authMiddleware, getTodos);
router.get("/:id", authMiddleware, getTodoById);
router.put("/:id", authMiddleware, updateTodo);
router.delete("/:id", authMiddleware, deleteTodo);

module.exports = router;
