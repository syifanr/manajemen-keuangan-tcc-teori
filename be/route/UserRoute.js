const express = require('express');
const router = express.Router();
const UserController = require('../controller/UserController');
const verifyToken = require('../middleware/VerifyToken');

// Route untuk register
router.post('/register', UserController.register);

// Route untuk login
router.post('/login', UserController.login);

// Route untuk mendapatkan profil user (memerlukan token)
router.get('/profile', verifyToken, UserController.getProfile);

module.exports = router; 