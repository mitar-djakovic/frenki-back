const express = require('express');
const router = express.Router();
const uuid = require('uuid');

const Account = require('../../models/accounts');

router.post('/signup', (req, res) => {
  console.log('req ', req.body);
  const accountData = {
    ...req.body,
    id: uuid.v4()
  };

  console.log('data', accountData);
  Account.create(accountData)
    .then(account => res.json({ msg: 'Account created successfully', createAccount: account }))
    .catch(err => res.status(400).json({ error: 'Unable to create this account.' }));
});

module.exports = router;