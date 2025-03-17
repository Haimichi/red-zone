const Notification = require('../models/Notification');

exports.getNotifications = async (req, res, next) => {
  try {
    const notifications = await Notification.find({ userId: req.user.id })
      .sort({ createdAt: -1 })
      .limit(50);
    res.json(notifications);
  } catch (error) {
    next(error);
  }
};

exports.createNotification = async (req, res, next) => {
  try {
    const notification = new Notification({ ...req.body, userId: req.user.id });
    await notification.save();

    const sendNotification = req.app.get('sendNotification');
    await sendNotification(req.user.id, notification.message, notification.type);

    res.status(201).json(notification);
  } catch (error) {
    next(error);
  }
};