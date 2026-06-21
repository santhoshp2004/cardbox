const express = require('express');
const { registerSA, login, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register-sa', registerSA); // Development util to create first SA
router.post('/login', login);
router.get('/me', protect, getMe);

module.exports = router;
