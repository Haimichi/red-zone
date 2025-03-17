const mongoose = require('mongoose');

const fixtureSchema = new mongoose.Schema({
  teams: {
    home: { type: String, required: true, trim: true },
    away: { type: String, required: true, trim: true },
  },
  date: { 
    type: Date, 
    required: true 
  },
  location: { 
    type: String, 
    required: true, 
    trim: true 
  },
  competition: { 
    type: String, 
    required: true, 
    trim: true 
  },
  result: {
    homeScore: { type: Number },
    awayScore: { type: Number },
    status: { 
      type: String, 
      enum: ['upcoming', 'completed', 'live'], 
      default: 'upcoming' 
    },
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  },
});

fixtureSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Fixture', fixtureSchema);