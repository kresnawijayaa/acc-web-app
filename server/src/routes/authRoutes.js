const express = require('express');
const { register, login, googleAuth, sendOtp, verifyOtp, refreshAuth, check  } = require('../controllers/authContoller');
const router = express.Router();
const { verifyToken } = require('../middlewares/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.post('/google', googleAuth);
router.post('/otp', sendOtp);
router.post('/verify-otp', verifyOtp);
router.post('/refresh-token', refreshAuth);
router.get('/check', verifyToken, check)

module.exports = router;