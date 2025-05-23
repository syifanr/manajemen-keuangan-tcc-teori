const mysql = require('mysql2/promise');

// Konfigurasi untuk koneksi lokal
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'keuangan',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Konfigurasi untuk GCP (dikomentari)
/*
const pool = mysql.createPool({
  host: '34.101.xxx.xxx', // Ganti dengan IP GCP Anda
  user: 'root',
  password: 'your_password',
  database: 'keuangan',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
*/

module.exports = pool; 