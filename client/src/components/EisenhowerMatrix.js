import React from "react";
import MatrixCategory from "./MatrixCategory";
import "../App.css";

const EisenhowerMatrix = ({ todos, refreshTodos }) => {
    const categorizeTodos = (todos) => {
        const categories = {
            "Pilne i Ważne": [],
            "Pilne i Nieważne": [],
            "Niepilne i Ważne": [],
            "Niepilne i Nieważne": [],
        };

        todos.forEach((todo) => {
            if (todo.priority === "high" && todo.is_important) {
                categories["Pilne i Ważne"].push(todo);
            } else if (todo.priority === "high" && !todo.is_important) {
                categories["Pilne i Nieważne"].push(todo);
            } else if (todo.priority === "low" && todo.is_important) {
                categories["Niepilne i Ważne"].push(todo);
            } else {
                categories["Niepilne i Nieważne"].push(todo);
            }
        });

        return categories;
    };

    const categorizedTodos = categorizeTodos(todos);

    return (
        <div className="eisenhower-matrix">
            {Object.entries(categorizedTodos).map(([category, categoryTodos]) => (
                <MatrixCategory
                    key={category}
                    category={category}
                    todos={categoryTodos}
                    refreshTodos={refreshTodos}
                />
            ))}
        </div>
    );
};

export default EisenhowerMatrix;
