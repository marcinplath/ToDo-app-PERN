const pool = require("../db");

exports.createTodo = async (req, res) => {
    try {
        const { description, priority, isImportant } = req.body;
        const newTodo = await pool.query(
            "INSERT INTO todo (description, user_id, priority, is_important) VALUES($1, $2, $3, $4) RETURNING *",
            [description, req.user.id, priority, isImportant]
        );
        res.json(newTodo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
};

exports.getTodos = async (req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo WHERE user_id = $1", [req.user.id]);
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
    }
};

exports.getTodoById = async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await pool.query(
            "SELECT * FROM todo WHERE todo_id = $1 AND user_id = $2",
            [id, req.user.id]
        );
        if (todo.rows.length === 0) {
            return res.status(404).json({ message: "Todo not found or not yours" });
        }
        res.json(todo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
};

exports.updateTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const { description, priority, isImportant } = req.body;

        const todoCheck = await pool.query(
            "SELECT * FROM todo WHERE todo_id = $1 AND user_id = $2",
            [id, req.user.id]
        );
        if (todoCheck.rows.length === 0) {
            return res.status(404).json({ message: "Todo not found or not yours" });
        }

        await pool.query(
            "UPDATE todo SET description = $1, priority = $2, is_important = $3 WHERE todo_id = $4",
            [description, priority, isImportant, id]
        );
        res.json("Todo was updated!");
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
};


exports.deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;

        const todoCheck = await pool.query(
            "SELECT * FROM todo WHERE todo_id = $1 AND user_id = $2",
            [id, req.user.id]
        );
        if (todoCheck.rows.length === 0) {
            return res.status(404).json({ message: "Todo not found or not yours" });
        }

        await pool.query("DELETE FROM todo WHERE todo_id = $1 AND user_id = $2", [id, req.user.id]);
        res.json("Todo was deleted!");
    } catch (err) {
        console.error(err.message);
    }
};
