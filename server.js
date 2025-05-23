import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { Pool as PgPool } from "pg";
import mysql from "mysql2/promise";

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Config PostgreSQL (user)
const pgPool = new PgPool({
  user: "postgres_user",
  host: "localhost",
  database: "your_pg_db",
  password: "postgres_password",
  port: 5432,
});

// Config MySQL (transactions)
const mysqlPool = mysql.createPool({
  host: "localhost",
  user: "mysql_user",
  password: "mysql_password",
  database: "your_mysql_db",
});

// API: Get all users from PostgreSQL
app.get("/api/users", async (req, res) => {
  try {
    const result = await pgPool.query("SELECT id, username FROM users");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API: Get all transactions from MySQL
app.get("/api/transactions", async (req, res) => {
  try {
    const [rows] = await mysqlPool.query("SELECT * FROM transactions");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API: Add transaction (with user_id)
app.post("/api/transactions", async (req, res) => {
  const { user_id, title, description, amount, date } = req.body;
  try {
    const [result] = await mysqlPool.query(
      "INSERT INTO transactions (user_id, title, description, amount, date) VALUES (?, ?, ?, ?, ?)",
      [user_id, title, description, amount, date]
    );
    res.json({ id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
