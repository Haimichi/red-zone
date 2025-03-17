const Player = require('../models/Player');
const Staff = require('../models/Staff');
const redisClient = require('../config/redis');

exports.getPlayers = async () => {
  const cacheKey = 'players';
  const cached = await redisClient.get(cacheKey);
  if (cached) return JSON.parse(cached);

  const players = await Player.find().sort({ name: 1 });
  await redisClient.setEx(cacheKey, 3600, JSON.stringify(players));
  return players;
};

exports.getPlayerById = async (id) => {
  const player = await Player.findById(id);
  if (!player) throw new Error('Player not found');
  return player;
};

exports.getStaff = async () => {
  const cacheKey = 'staff';
  const cached = await redisClient.get(cacheKey);
  if (cached) return JSON.parse(cached);

  const staff = await Staff.find().sort({ role: 1 });
  await redisClient.setEx(cacheKey, 3600, JSON.stringify(staff));
  return staff;
};