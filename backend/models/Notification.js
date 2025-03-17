const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  message: { 
    type: String, 
    required: true, 
    trim: true 
  },
  type: { 
    type: String, 
    enum: ['news', 'fixture', 'other'], 
    required: true 
  },
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
});

module.exports = mongoose.model('Notification', notificationSchema);