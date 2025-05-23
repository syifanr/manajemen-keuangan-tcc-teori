const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../model/UserModel');

class UserController {
    static async register(req, res) {
        try {
            const { name, email, gender, password } = req.body;

            // Validasi input
            if (!name || !email || !password) {
                return res.status(400).json({ message: 'Semua field harus diisi!' });
            }

            // Cek email sudah terdaftar
            const existingUser = await UserModel.findByEmail(email);
            if (existingUser) {
                return res.status(400).json({ message: 'Email sudah terdaftar!' });
            }

            // Hash password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // Simpan user baru
            const userId = await UserModel.create({
                name,
                email,
                gender,
                password: hashedPassword
            });

            res.status(201).json({ message: 'Registrasi berhasil!' });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ message: 'Terjadi kesalahan server' });
        }
    }

    static async login(req, res) {
        try {
            const { email, password } = req.body;

            // Validasi input
            if (!email || !password) {
                return res.status(400).json({ message: 'Email dan password harus diisi!' });
            }

            // Cek user
            const user = await UserModel.findByEmail(email);
            if (!user) {
                return res.status(400).json({ message: 'Email tidak ditemukan!' });
            }

            // Validasi password
            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                return res.status(400).json({ message: 'Password salah!' });
            }

            // Buat token
            const accessToken = jwt.sign(
                { id: user.id, email: user.email },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '1d' }
            );

            res.json({
                message: 'Login berhasil!',
                accessToken,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    gender: user.gender
                }
            });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ message: 'Terjadi kesalahan server' });
        }
    }

    static async getProfile(req, res) {
        try {
            const user = await UserModel.findById(req.user.id);
            if (!user) {
                return res.status(404).json({ message: 'User tidak ditemukan!' });
            }

            res.json(user);
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ message: 'Terjadi kesalahan server' });
        }
    }
}

module.exports = UserController; 