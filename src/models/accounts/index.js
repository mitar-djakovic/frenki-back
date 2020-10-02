const mongoose = require('mongoose');

const AccountSchema = new mongoose.Schema({
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

module.exports = Account = mongoose.model('account', AccountSchema);