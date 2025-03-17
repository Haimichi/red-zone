const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: { type: String, required: true },
  number: { type: Number },
  stats: {
    goals: { type: Number, default: 0 },
    assists: { type: Number, default: 0 },
    matches: { type: Number, default: 0 },
  },
  media: [{ type: { type: String, enum: ['image', 'video'] }, url: String }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Player', playerSchema);