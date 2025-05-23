const pool = require('../config/database');

class TransactionModel {
    static async create(transactionData) {
        const { user_id, nominal, tanggal, judul, tipe, deskripsi } = transactionData;
        const [result] = await pool.query(
            'INSERT INTO transaksi (user_id, nominal, tanggal, judul, tipe, deskripsi) VALUES (?, ?, ?, ?, ?, ?)',
            [user_id, nominal, tanggal, judul, tipe, deskripsi]
        );
        return result.insertId;
    }

    static async findAll() {
        const [rows] = await pool.query('SELECT * FROM transaksi ORDER BY tanggal DESC');
        return rows;
    }

    static async findByUserId(userId) {
        const [rows] = await pool.query(
            'SELECT * FROM transaksi WHERE user_id = ? ORDER BY tanggal DESC',
            [userId]
        );
        return rows;
    }

    static async findById(id) {
        const [rows] = await pool.query('SELECT * FROM transaksi WHERE id = ?', [id]);
        return rows[0];
    }

    static async update(id, transactionData) {
        const { nominal, tanggal, judul, tipe, deskripsi } = transactionData;
        const [result] = await pool.query(
            'UPDATE transaksi SET nominal = ?, tanggal = ?, judul = ?, tipe = ?, deskripsi = ? WHERE id = ?',
            [nominal, tanggal, judul, tipe, deskripsi, id]
        );
        return result.affectedRows > 0;
    }

    static async delete(id) {
        const [result] = await pool.query('DELETE FROM transaksi WHERE id = ?', [id]);
        return result.affectedRows > 0;
    }
}

module.exports = TransactionModel; 