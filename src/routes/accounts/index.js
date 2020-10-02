const express = require('express');
const router = express.Router();
const uuid = require('uuid');

const Account = require('../../models/accounts');

router.post('/signup', (req, res) => {
  console.log('req ', req.body);
  const userData = {
    ...req.body,
    id: uuid.v4()
  };

  console.log('data', userData);
  Account.create(userData)
    .then(account => res.json({ msg: 'Account created successfully', createdUser: account }))
    .catch(err => res.status(400).json({ error: 'Unable to create this account.' }));
});

module.exports = router;