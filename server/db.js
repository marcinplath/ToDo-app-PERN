const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "goofy123",
  host: "localhost",
  port: 5432,
  database: "todo_app"
});

module.exports = pool;