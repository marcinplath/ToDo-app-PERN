const pool = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "secret_key";

exports.registerUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const userExists = await pool.query("SELECT * FROM users WHERE username = $1", [username]);

        if (userExists.rows.length > 0) {
            return res.status(400).json({ message: "Taki uzytkownik juz istnieje!" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await pool.query(
            "INSERT INTO users (username, password) VALUES($1, $2) RETURNING *",
            [username, hashedPassword]
        );

        const token = jwt.sign({ user: { id: newUser.rows[0].user_id } }, JWT_SECRET, { expiresIn: "1h" });
        res.json({ token });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await pool.query("SELECT * FROM users WHERE username = $1", [username]);

        if (user.rows.length === 0) {
            return res.status(400).json({ message: "Wprowadzono nieprawidłowe dane" });
        }

        const validPassword = await bcrypt.compare(password, user.rows[0].password);
        if (!validPassword) {
            return res.status(400).json({ message: "Wprowadzono nieprawidłowe dane" });
        }

        const token = jwt.sign({ user: { id: user.rows[0].user_id } }, JWT_SECRET, { expiresIn: "1h" });
        res.json({ token });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
};

