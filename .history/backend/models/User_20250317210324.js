const mongoose = require('mongoose');
const { isEmail } = require('validator');

const userSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: [true, 'Vui lòng nhập tên người dùng'], 
    unique: true, 
    trim: true,
    minlength: [3, 'Tên người dùng phải có ít nhất 3 ký tự'],
    maxlength: [30, 'Tên người dùng không được vượt quá 30 ký tự']
  },
  email: { 
    type: String, 
    required: [true, 'Vui lòng nhập email'], 
    unique: true, 
    trim: true, 
    lowercase: true,
    validate: [isEmail, 'Email không hợp lệ'] 
  },
  password: { 
    type: String, 
    required: [true, 'Vui lòng nhập mật khẩu'],
    minlength: [6, 'Mật khẩu phải có ít nhất 6 ký tự'] 
  },
  role: { 
    type: String, 
    enum: {
      values: ['user', 'admin', 'editor'],
      message: 'Vai trò {VALUE} không được hỗ trợ'
    }, 
    default: 'user' 
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

// Cập nhật updatedAt trước khi lưu
userSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('User', userSchema);