const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    trim: true 
  },
  position: { 
    type: String, 
    required: true 
  },
  number: { 
    type: Number, 
    min: 1 
  },
  stats: {
    goals: { type: Number, default: 0 },
    assists: { type: Number, default: 0 },
    matches: { type: Number, default: 0 },
  },
  media: [{
    type: { type: String, enum: ['image', 'video'], required: true },
    url: { type: String, required: true, trim: true }
  }],
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  },
});

playerSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Player', playerSchema);