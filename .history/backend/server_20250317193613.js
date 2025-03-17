const http = require('http');
const { Server } = require('socket.io');
const app = require('./app');
const config = require('./config/env');
const { initSocket } = require('./sockets/notificationSocket');

const server = http.createServer(app);
const io = new Server(server);

// Khởi tạo WebSocket
initSocket(io);

const PORT = config.port;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});