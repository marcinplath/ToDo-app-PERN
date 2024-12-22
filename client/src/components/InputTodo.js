import React, { useState, useContext } from "react";
import AuthContext from "../AuthContext";

const InputTodo = ({ refreshTodos }) => {
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("low");
    const [isImportant, setIsImportant] = useState(false);
    const { token } = useContext(AuthContext);

    const addTodo = async (e) => {
        e.preventDefault();
        if (!token) return;
        try {
            await fetch("http://localhost:3001/todos", {
                method: "POST",
                headers: { "Content-Type": "application/json", Authorization: token },
                body: JSON.stringify({ description, priority, isImportant }),
            });
            setDescription("");
            setPriority("low");
            setIsImportant(false);
            refreshTodos();
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <form onSubmit={addTodo} className="d-flex flex-column mb-4">
            <div className="d-flex mb-2">
                <input
                    type="text"
                    className="form-control me-2"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Dodaj rzecz do zrobienia..."
                    required
                />
                <button type="submit" className="btn btn-primary">Dodaj</button>
            </div>
            <div className="d-flex align-items-center">
                <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="form-select me-2"
                >
                    <option value="low">Niepilne</option>
                    <option value="high">Pilne</option>
                </select>
                <label className="form-check-label me-2">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        checked={isImportant}
                        onChange={(e) => setIsImportant(e.target.checked)}
                    />
                    Wazne
                </label>
            </div>
        </form>
    );
};

export default InputTodo;
