import React, { useState, useContext } from "react";
import AuthContext from "../AuthContext";

const EditTodo = ({ todo, refreshTodos }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [description, setDescription] = useState(todo?.description || "");
    const [priority, setPriority] = useState(todo?.priority || "low");
    const [isImportant, setIsImportant] = useState(todo?.is_important || false);
    const { token } = useContext(AuthContext);

    const updateTodo = async (e) => {
        e.preventDefault();
        if (!token) return;
        try {
            await fetch(`http://localhost:3001/todos/${todo.todo_id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token
                },
                body: JSON.stringify({ description, priority, isImportant })
            });
            setIsEditing(false);
            refreshTodos();
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <>
            <button
                onClick={() => setIsEditing(true)}
                className="btn btn-warning"
                style={{ marginRight: "10px" }}
            >
                Edytuj
            </button>
            {isEditing && (
                <div className="modal" style={{ display: "flex" }}>
                    <div className="modal-content">
                        <h3>Edytuj ToDo</h3>
                        <form onSubmit={updateTodo}>
                            {/* Edycja opisu */}
                            <input
                                type="text"
                                className="form-control mb-3"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />

                            {/* Edycja priorytetu */}
                            <select
                                className="form-select mb-3"
                                value={priority}
                                onChange={(e) => setPriority(e.target.value)}
                            >
                                <option value="low">Nie pilne</option>
                                <option value="high">Pilne</option>
                            </select>

                            {/* Edycja flagi "ważne" */}
                            <div className="form-check mb-3">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id={`important-checkbox-${todo.todo_id}`}
                                    checked={isImportant}
                                    onChange={(e) => setIsImportant(e.target.checked)}
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor={`important-checkbox-${todo.todo_id}`}
                                >
                                    Wazne
                                </label>
                            </div>

                            {/* Przyciski */}
                            <div className="modal-actions">
                                <button type="submit" className="btn btn-primary">
                                    Zapisz
                                </button>
                                <button
                                    onClick={() => setIsEditing(false)}
                                    className="btn btn-secondary"
                                >
                                    Anuluj
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default EditTodo;
