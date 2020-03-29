const mongoose = require('mongoose');
const validator = require('validator');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please include valid email'],
    unique: true,
    index: true,
    validate: [validator.isEmail, 'Wrong email']
  },
  password: {
    type: String,
    required: true,
    minlength: [6, 'Password must contain more then 5 characters']
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
