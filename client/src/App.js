import React, { useContext, useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import InputTodo from "./components/InputTodo";
import ListTodos from "./components/ListTodos";
import EisenhowerMatrix from "./components/EisenhowerMatrix";
import Login from "./components/Login";
import Register from "./components/Register";

const App = () => {
    const { token, logout } = useContext(AuthContext);
    const [todos, setTodos] = useState([]);
    const [useMatrix, setUseMatrix] = useState(false);

    const getTodos = async () => {
        if (!token) return;
        try {
            const response = await fetch("http://localhost:3001/todos", {
                headers: { Authorization: token },
            });
            if (response.status === 401 || response.status === 403) {
                logout();
                return;
            }
            const data = await response.json();
            setTodos(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error(err);
            setTodos([]);
        }
    };

    useEffect(() => {
        getTodos();
    }, [token]);

    if (!token) {
        return (
            <div className="container my-5">
                <h1 className="text-center mb-10">Witaj! Zaloguj się lub Zarejestruj, aby tworzyć swoje ToDo listy</h1>
                <div className="row">
                    <div className="col-md-6 mb-4">
                        <Login onLogin={getTodos} />
                    </div>
                    <div className="col-md-6 mb-4">
                        <Register onRegister={getTodos} />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container my-5">
            <h1 className="text-center mb-4">Twoja ToDo lista</h1>
            <div className="text-center mb-3">
                <button onClick={logout} className="btn btn-secondary me-2">Wyloguj</button>
                <button
                    onClick={() => setUseMatrix(!useMatrix)}
                    className="btn btn-info"
                >
                    {useMatrix ? "Widok listy" : "Widok macierzy"}
                </button>
            </div>
            <InputTodo refreshTodos={getTodos} />
            {useMatrix ? (
                <EisenhowerMatrix todos={todos} refreshTodos={getTodos} />
            ) : (
                <ListTodos todos={todos} refreshTodos={getTodos} />
            )}
        </div>
    );
};

export default App;
