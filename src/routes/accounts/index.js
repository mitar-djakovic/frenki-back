const express = require('express');

const router = express.Router();
const uuid = require('uuid');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config');

const secret = config.get('secret');

const Account = require('../../models/accounts');

router.post('/signup', (req, res) => {
  const {
    email, firstName, lastName, password,
  } = req.body;

  const hashedPassword = bcrypt.hashSync(password, 10);

  const accountData = {
    email,
    firstName,
    lastName,
    password: hashedPassword,
    repeatPassword: hashedPassword,
    id: uuid.v4(),
  };

  Account.create(accountData)
    .then((account) => res.status(201).send({
      auth: true, msg: 'Account created successfully', account,
    }))
    .catch((err) => {
      console.log('err', err);
      return res.status(400).json({ error: 'Unable to create this account.' });
    });
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  Account.findOne({ email }).exec((err, account) => {
    if (err) return res.status(500).send({ message: 'Error 500' });
    if (!account) return res.status(404).send('Account not found');

    const passwordIsValid = bcrypt.compareSync(password, account.password);

    if (!passwordIsValid) return res.status(401).send({ auth: false, token: null, msg: 'Invalid Credentials' });

    const token = jwt.sign({ id: account.id }, secret, {
      expiresIn: 86400, // expires in 24 hours
    });

    return res.status(200).send({ message: 'Account found', token });
  });
});

module.exports = router;
