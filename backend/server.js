require('dotenv').config();
const http = require('http');
const app = require('./app');
const { Server } = require('socket.io');
const { initSocket } = require('./sockets/notificationSocket');

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

// Khởi tạo WebSocket
initSocket(io);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server đang chạy trên cổng ${PORT}`);
});

// Xử lý lỗi không mong muốn
process.on('unhandledRejection', (err) => {
  console.error('Lỗi không mong muốn:', err);
  server.close(() => process.exit(1));
});