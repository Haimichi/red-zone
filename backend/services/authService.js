const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../config/env');

exports.register = async (username, email, password) => {
  let user = await User.findOne({ $or: [{ email }, { username }] });
  if (user) throw new Error('User already exists');

  const hashedPassword = await bcrypt.hash(password, 10);
  user = new User({ username, email, password: hashedPassword });
  await user.save();
  return user;
};

exports.login = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Invalid credentials');
  }
  const token = jwt.sign({ id: user._id, role: user.role }, config.jwtSecret, { expiresIn: '1h' });
  return { token, user };
};

exports.getUserById = async (id) => {
  const user = await User.findById(id).select('-password');
  if (!user) throw new Error('User not found');
  return user;
};