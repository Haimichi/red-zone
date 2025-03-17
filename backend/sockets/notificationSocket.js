const Notification = require('../models/Notification');
const notificationService = require('../services/notificationService');

const initSocket = (io) => {
  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('join', (userId) => {
      socket.join(userId);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });

  const sendNotification = async (userId, message, type) => {
    const notification = await notificationService.createNotification(message, type, userId);
    io.to(userId).emit('notification', notification);
  };

  return { sendNotification };
};

exports.initSocket = (io) => {
  io.on('connection', (socket) => {
    socket.on('join', (userId) => {
      socket.join(userId); // Mỗi user join room riêng
    });
  });
};

exports.sendNotification = async (userId, message) => {
  await Notification.create({ userId, message });
  io.to(userId).emit('notification', { message });
};

module.exports = { initSocket };