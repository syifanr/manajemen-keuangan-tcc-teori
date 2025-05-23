const TransactionModel = require('../model/TransactionModel');

class TransactionController {
    static async create(req, res) {
        try {
            const { nominal, tanggal, judul, tipe, deskripsi } = req.body;
            const user_id = req.user.id;

            // Validasi input
            if (!nominal || !tanggal || !judul || !tipe) {
                return res.status(400).json({ message: 'Semua field wajib diisi!' });
            }

            const transactionId = await TransactionModel.create({
                user_id,
                nominal,
                tanggal,
                judul,
                tipe,
                deskripsi
            });

            res.status(201).json({
                message: 'Transaksi berhasil ditambahkan',
                id: transactionId
            });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ message: 'Terjadi kesalahan server' });
        }
    }

    static async getAll(req, res) {
        try {
            const transactions = await TransactionModel.findByUserId(req.user.id);
            res.json(transactions);
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ message: 'Terjadi kesalahan server' });
        }
    }

    static async getById(req, res) {
        try {
            const transaction = await TransactionModel.findById(req.params.id);
            
            if (!transaction) {
                return res.status(404).json({ message: 'Transaksi tidak ditemukan!' });
            }

            // Cek apakah transaksi milik user yang login
            if (transaction.user_id !== req.user.id) {
                return res.status(403).json({ message: 'Akses ditolak!' });
            }

            res.json(transaction);
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ message: 'Terjadi kesalahan server' });
        }
    }

    static async update(req, res) {
        try {
            const { nominal, tanggal, judul, tipe, deskripsi } = req.body;
            const transactionId = req.params.id;

            // Cek apakah transaksi ada dan milik user
            const transaction = await TransactionModel.findById(transactionId);
            if (!transaction) {
                return res.status(404).json({ message: 'Transaksi tidak ditemukan!' });
            }

            if (transaction.user_id !== req.user.id) {
                return res.status(403).json({ message: 'Akses ditolak!' });
            }

            const success = await TransactionModel.update(transactionId, {
                nominal,
                tanggal,
                judul,
                tipe,
                deskripsi
            });

            if (success) {
                res.json({ message: 'Transaksi berhasil diperbarui' });
            } else {
                res.status(400).json({ message: 'Gagal memperbarui transaksi' });
            }
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ message: 'Terjadi kesalahan server' });
        }
    }

    static async delete(req, res) {
        try {
            const transactionId = req.params.id;

            // Cek apakah transaksi ada dan milik user
            const transaction = await TransactionModel.findById(transactionId);
            if (!transaction) {
                return res.status(404).json({ message: 'Transaksi tidak ditemukan!' });
            }

            if (transaction.user_id !== req.user.id) {
                return res.status(403).json({ message: 'Akses ditolak!' });
            }

            const success = await TransactionModel.delete(transactionId);
            if (success) {
                res.json({ message: 'Transaksi berhasil dihapus' });
            } else {
                res.status(400).json({ message: 'Gagal menghapus transaksi' });
            }
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ message: 'Terjadi kesalahan server' });
        }
    }
}

module.exports = TransactionController; 