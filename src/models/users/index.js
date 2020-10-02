const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  repeatPassword: {
    type: String
  }
});

module.exports = User = mongoose.model('user', UserSchema);