const express = require('express');
const router = express.Router();
const notificationService = require('../services/notificationService');
const authMiddleware = require('../middleware/auth');

router.get('/', authMiddleware, async (req, res, next) => {
  try {
    const notifications = await notificationService.getNotifications(req.user.id);
    res.json(notifications);
  } catch (error) {
    next(error);
  }
});

router.post('/', authMiddleware, async (req, res, next) => {
  try {
    const notification = await notificationService.createNotification(
      req.body.message,
      req.body.type,
      req.user.id
    );
    const sendNotification = req.app.get('sendNotification');
    await sendNotification(req.user.id, notification.message, notification.type);
    res.status(201).json(notification);
  } catch (error) {
    next(error);
  }
});

module.exports = router;