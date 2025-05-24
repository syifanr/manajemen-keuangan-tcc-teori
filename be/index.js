require('dotenv').config();
const express = require('express');
const cors = require('cors');
const userRoutes = require('./route/UserRoute');
const transactionRoutes = require('./route/TransactionRoute');
const mysqlPool = require('./config/database.js');
const pgDb = require('./config/postgree.js');

// Log environment variables
console.log('Environment variables:', {
    PORT: process.env.PORT,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET ? 'Set' : 'Not set',
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_NAME: process.env.DB_NAME
});

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/transactions', transactionRoutes);

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Terjadi kesalahan server!' });
});

app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
}); 

async function getTransactionFromMySQL() {
  const [rows] = await mysqlPool.query('SELECT * FROM transaksi');
  return rows;
}

async function getUsersFromPostgres() {
  const res = await pgDb.query('SELECT * FROM users');
  return res.rows;
}
