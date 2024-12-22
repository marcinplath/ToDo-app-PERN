# ToDo Application with Eisenhower Matrix
A web-based task management system that helps users organize their tasks using Eisenhower's Matrix.
> Live demo [_coming soon_].

## Table of Contents
* [General Info](#general-info)
* [Technologies Used](#technologies-used)
* [Features](#features)
* [Screenshots](#screenshots)
* [Setup](#setup)
* [Project Status](#project-status)
* [Room for Improvement](#room-for-improvement)
* [Contact](#contact)

## General Information
The ToDo Application helps users organize their tasks based on priority and deadline using Eisenhower's Matrix. Users can:

Add tasks with a description, priority, and deadline.
Edit or delete existing tasks.
Filter tasks based on priority categories (e.g., "Important-Urgent").
Securely manage tasks with authentication.

### Purpose
The goal of this project was to create a modern, user-friendly system that helps users stay organized and productive by effectively categorizing their tasks.

---

## Technologies Used
**Frontend**

- React.js: For building dynamic UI components.
- Bootstrap: For responsive styling and layouts.

**Backend**

- Node.js with Express.js: For API routing and backend logic.
- PostgreSQL: Relational database for storing tasks and user data.

**Authentication**
- JSON Web Tokens (JWT): For secure user authentication.

**Tools**
- Visual Studio Code: Development environment.
- Postman: For API testing.
- Nodemon: Automatic server restarts during development.

---

## Features
📝 Task Management:
- Add tasks with a description, deadline, and priority.
- Edit and delete tasks.
- View tasks in a responsive table format.
  
📊 Eisenhower Matrix Integration:
- Drag&Drop to simply change task category
 - Tasks are categorized into:
 - Important-Urgent
 - Important-Not Urgent
 - Not Important-Urgent
 - Not Important-Not Urgent

🔒 Authentication:
- Secure login and registration with JWT.
  
🌐 Responsive Design:
- Optimized for both desktop and mobile devices using Bootstrap.

---

## Screenshots

### Login page
<img width="1437" alt="logowanie" src="https://github.com/user-attachments/assets/cf4e61cb-20d1-46af-bf44-ed463bfcef4d" />

### List view/adding tasks
<img width="1437" alt="lista" src="https://github.com/user-attachments/assets/6c90c69e-1bba-4d8c-9b5e-3401519e55c3" />

### Matrix view/adding tasks

https://github.com/user-attachments/assets/8eb45c0a-fd53-488a-a0a7-34921375a9be

---

## Setup

### Requirements:
- Node.js v16+
- PostgreSQL v12+
- Browser (Chrome/Edge/Firefox etc.)

### Installation Steps:
1. Clone the repository:
   ```bash
   git clone https://github.com/marcinplath/ToDo-app-PERN.git
   cd ToDo-app-PERN

2. Create Database: 
  ```bash
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
  ```
3.Install dependencies for frontend:

  ```bash
cd client
npm install
  ```
4.Run backend:

```bash
cd backend
node index
# Backend runs on: http://localhost:3001
```
5.Run frontend:
```bash
cd client
npm start
# Frontend runs on: http://localhost:3000
```


## Project Status
Project is: in progress
The main functionalities (task management, user authentication, and priority-based filtering) are working. Future improvements include more complex task creation(date) and enhanced UI.

## Room for Improvement

Areas to improve:
Add real-time notifications for task deadlines using WebSockets.
Role-based access for administrators and regular users.
Integration with a calendar API for better task visualization.
###To-do:
Allow users to view task history.
Improve UI with animations and transitions.


## Contact
Created by @marcinplath - feel free to reach out with suggestions or feedback!

