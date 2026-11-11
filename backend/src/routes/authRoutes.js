const express = require('express');
const rateLimit = require('express-rate-limit');
const {
  registerUser,
  loginUser,
  getCurrentUser,
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const {
  validateBody,
  validateRegisterInput,
  validateLoginInput,
} = require('../middleware/validationMiddleware');

const router = express.Router();

const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: process.env.NODE_ENV === 'test' ? 500 : 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many authentication attempts. Please try again in 15 minutes.',
  },
});

router.post(
  '/register',
  authRateLimiter,
  validateBody(validateRegisterInput),
  registerUser
);

router.post(
  '/login',
  authRateLimiter,
  validateBody(validateLoginInput),
  loginUser
);

router.get('/me', protect, getCurrentUser);

module.exports = router;
