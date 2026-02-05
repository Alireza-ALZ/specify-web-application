const express = require('express');
const router = express.Router();

const { createUser, verifyCredentials } = require('../services/authService');
const {
  validateSignup,
  validateLogin,
} = require('../validators/authValidator');

router.post('/signup', async (req, res) => {
  const errors = validateSignup(req.body);
  if (errors.length) return res.status(400).json({ errors });
  try {
    const user = await createUser(req.body);
    req.session.userId = user._id ? user._id.toString() : undefined;
    res.status(201).json({ id: user._id, phone_number: user.phone_number });
  } catch (err) {
    if (err.message === 'phone_exists')
      return res.status(409).json({ error: 'phone_exists' });
    console.error(err);
    res.status(500).json({ error: 'internal_error' });
  }
});

router.post('/login', async (req, res) => {
  const errors = validateLogin(req.body);
  if (errors.length) return res.status(400).json({ errors });
  try {
    const user = await verifyCredentials(req.body);
    if (!user) return res.status(401).json({ error: 'invalid_credentials' });
    req.session.userId = user._id ? user._id.toString() : undefined;
    res.json({ id: user._id, phone_number: user.phone_number });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'internal_error' });
  }
});

module.exports = router;
