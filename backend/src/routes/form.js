const express = require('express');
const router = express.Router();

const requireAuth = require('../middleware/authSession');
const { validateForm } = require('../validators/formValidator');
const { submitForm } = require('../services/formService');

router.post('/submit', requireAuth, async (req, res) => {
  const errors = validateForm(req.body);
  if (errors.length) return res.status(400).json({ errors });
  try {
    const submission = await submitForm({
      userId: req.session.userId,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
    });
    res.json({ id: submission._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'internal_error' });
  }
});

module.exports = router;
