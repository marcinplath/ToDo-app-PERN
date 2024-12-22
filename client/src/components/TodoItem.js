import React, { useState } from "react";

const TodoItem = ({ todo, refreshTodos }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedDescription, setEditedDescription] = useState(todo.description);

    const handleDragStart = (e) => {
        e.dataTransfer.setData("todo", JSON.stringify(todo));
    };

    const handleSaveEdit = async () => {
        try {
            await fetch(`http://localhost:3001/todos/${todo.todo_id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("token"),
                },
                body: JSON.stringify({
                    description: editedDescription,
                    priority: todo.priority,
                    isImportant: todo.is_important,
                }),
            });
            setIsEditing(false);
            refreshTodos();
        } catch (err) {
            console.error("Error saving edit:", err);
        }
    };

    const handleDelete = async () => {
        try {
            await fetch(`http://localhost:3001/todos/${todo.todo_id}`, {
                method: "DELETE",
                headers: {
                    Authorization: localStorage.getItem("token"),
                },
            });
            refreshTodos();
        } catch (err) {
            console.error("Error deleting todo:", err);
        }
    };

    return (
        <li className="todo-item" draggable onDragStart={handleDragStart}>
            {isEditing ? (
                <input
                    type="text"
                    value={editedDescription}
                    onChange={(e) => setEditedDescription(e.target.value)}
                    onBlur={handleSaveEdit}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") handleSaveEdit();
                    }}
                    autoFocus
                />
            ) : (
                <span onDoubleClick={() => setIsEditing(true)}>{todo.description}</span>
            )}
            <button onClick={handleDelete}>Usuń</button>
        </li>
    );
};

export default TodoItem;
