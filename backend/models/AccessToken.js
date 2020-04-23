const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  _id: String,
  user: String
});

const AccessToken = mongoose.model('AccessToken', schema);

module.exports = AccessToken;
