const express = require('express');
const router = express.Router();
const authService = require('../services/authService');
const authMiddleware = require('../middleware/auth');
const { validateRequired } = require('../utils/validator');
const { validateAuth } = require('../middleware/validator');
router.post('/login', validateAuth, authController.login);
router.post('/refresh', authController.refreshToken);

router.post('/register', async (req, res, next) => {
  try {
    validateRequired(['username', 'email', 'password'], req.body);
    const user = await authService.register(req.body.username, req.body.email, req.body.password);
    res.status(201).json({ message: 'User registered' });
  } catch (error) {
    next(error);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    validateRequired(['email', 'password'], req.body);
    const { token } = await authService.login(req.body.email, req.body.password);
    res.json({ token });
  } catch (error) {
    next(error);
  }
});

module.exports = router;