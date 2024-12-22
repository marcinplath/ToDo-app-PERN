CREATE DATABASE todo_app;

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE todo (
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255) NOT NULL,
    priority VARCHAR(10) DEFAULT 'low',
    is_important BOOLEAN DEFAULT false,
    user_id INT NOT NULL REFERENCES users(user_id)
);