const express = require('express');
const router = express.Router();
const TransactionController = require('../controller/TransactionController');
const verifyToken = require('../middleware/VerifyToken');

// Semua route memerlukan token
router.use(verifyToken);

// Route untuk mendapatkan semua transaksi user
router.get('/', TransactionController.getAll);

// Route untuk mendapatkan transaksi berdasarkan ID
router.get('/:id', TransactionController.getById);

// Route untuk membuat transaksi baru
router.post('/', TransactionController.create);

// Route untuk mengupdate transaksi
router.put('/:id', TransactionController.update);

// Route untuk menghapus transaksi
router.delete('/:id', TransactionController.delete);

module.exports = router; 