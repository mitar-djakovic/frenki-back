const express = require('express');
const router = express.Router();
const uuid = require('uuid');

const Account = require('../../models/accounts');

router.post('/signup', (req, res) => {
  const { email, firstName, lastName, password, repeatPassword } = req.body;

  const accountData = {
    email,
    firstName,
    lastName,
    password,
    repeatPassword,
    id: uuid.v4()
  }

  Account.create(accountData)
    .then(account => res.json({ msg: 'Account created successfully', createAccount: account }))
    .catch(err => res.status(400).json({ error: 'Unable to create this account.' }));
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  Account.findOne({ email }).exec((err, account) => {
    if (err) {
      res.status(500).send({ message: 'Error 500' })
    }
    if (account) {
      console.log('account ===>', account)
      res.status(200).send({ message: 'Account found' })
    }
  })
});

module.exports = router;