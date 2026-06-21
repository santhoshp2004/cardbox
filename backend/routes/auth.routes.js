const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { protect } = require('../middleware/auth.middleware');
const { actionLogger } = require('../middleware/logger.middleware');

router.post('/login', actionLogger('LOGIN'), authController.login);
router.get('/me', protect, authController.getMe);

module.exports = router;
