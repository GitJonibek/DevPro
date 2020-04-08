const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    required: true,
    type: String,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('users', UserSchema);

module.exports = User;
