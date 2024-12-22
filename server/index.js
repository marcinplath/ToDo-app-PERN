const dotenv = require('dotenv')

const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

const authRoutes = require("./routes/auth");
const todosRoutes = require("./routes/todos");


app.use("/auth", authRoutes);
app.use("/todos", todosRoutes);

app.listen(PORT, () => {
    console.log(`Serwer działa na porcie ${PORT}`);
});
