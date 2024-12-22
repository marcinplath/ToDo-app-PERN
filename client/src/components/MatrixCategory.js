import React from "react";
import TodoItem from "./TodoItem";

const MatrixCategory = ({ category, todos, refreshTodos }) => {
    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = async (e) => {
        e.preventDefault();
        const todo = JSON.parse(e.dataTransfer.getData("todo"));

        const newPriority = category.includes("Pilne") ? "high" : "low";
        const newIsImportant = category.includes("Ważne");

        try {
            await fetch(`http://localhost:3001/todos/${todo.todo_id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("token"),
                },
                body: JSON.stringify({
                    description: todo.description,
                    priority: newPriority,
                    isImportant: newIsImportant,
                }),
            });
            refreshTodos();
        } catch (err) {
            console.error("Error updating todo:", err);
        }
    };

    return (
        <div className="matrix-category" onDrop={handleDrop} onDragOver={handleDragOver}>
            <h3>{category}</h3>
            <ul>
                {todos.map((todo) => (
                    <TodoItem key={todo.todo_id} todo={todo} refreshTodos={refreshTodos} />
                ))}
            </ul>
        </div>
    );
};

export default MatrixCategory;
