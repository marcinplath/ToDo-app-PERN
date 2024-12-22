import React, { useContext } from "react";
import AuthContext from "../AuthContext";
import EditTodo from "./EditTodo";

const ListTodos = ({ todos, refreshTodos }) => {
    const { token } = useContext(AuthContext);

    const deleteTodo = async (id) => {
        if (!token) return;
        try {
            await fetch(`http://localhost:3001/todos/${id}`, {
                method: "DELETE",
                headers: { Authorization: token }
            });
            refreshTodos();
        } catch (err) {
            console.error(err.message);
        }
    };

    if (!Array.isArray(todos)) return <div>Ładowanie...</div>;

    return (
        <div className="table-responsive">
            <table className="table table-striped table-hover align-middle">
                <thead className="table-light">
                    <tr>
                        <th>Opis</th>
                        <th>Priorytet</th>
                        <th>Termin</th>
                        <th>Akcje</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map((todo) => (
                        <tr key={todo.todo_id}>
                            <td>{todo.description}</td>
                            <td>{todo.priority === "low" ? "Niepilne" : "Pilne"}</td>
                            <td>{todo.is_important ? "Wazne" : "Niewazne"}</td>
                            <td>
                                <EditTodo todo={todo} refreshTodos={refreshTodos} />
                                <button
                                    className="btn btn-danger ms-2"
                                    onClick={() => deleteTodo(todo.todo_id)}
                                >
                                    Usuń
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListTodos;
