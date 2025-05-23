const pool = require('../config/database');

class UserModel {
    static async findByEmail(email) {
        const [rows] = await pool.query('SELECT * FROM user WHERE email = ?', [email]);
        return rows[0];
    }

    static async create(userData) {
        const { name, email, gender, password } = userData;
        const [result] = await pool.query(
            'INSERT INTO user (name, email, gender, password) VALUES (?, ?, ?, ?)',
            [name, email, gender, password]
        );
        return result.insertId;
    }

    static async findById(id) {
        const [rows] = await pool.query('SELECT id, name, email, gender FROM user WHERE id = ?', [id]);
        return rows[0];
    }
}

module.exports = UserModel; 