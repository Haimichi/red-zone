const Notification = require('../models/Notification');

exports.getNotifications = async (userId) => {
  return await Notification.find({ userId }).sort({ createdAt: -1 }).limit(50);
};

exports.createNotification = async (message, type, userId) => {
  const notification = new Notification({ message, type, userId });
  await notification.save();
  return notification;
};