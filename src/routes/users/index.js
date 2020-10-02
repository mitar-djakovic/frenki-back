const express = require('express');
const router = express.Router();
const uuid = require('uuid');

const User = require('../../models/users');

router.post('/signup', (req, res) => {
  console.log('req ', req.body);
  const userData = {
    ...req.body,
    id: uuid.v4()
  };

  console.log('data', userData);
  User.create(userData)
    .then(user => res.json({ msg: 'User created successfully', createdUser: user }))
    .catch(err => res.status(400).json({ error: 'Unable to create this user.' }));
});

module.exports = router;