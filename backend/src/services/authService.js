const bcrypt = require('bcryptjs');
const User = require('../models/user');

const SALT_ROUNDS = 10;

async function createUser({ phone_number, password }) {
  const existing = await User.findOne({ phone_number }).exec();
  if (existing) throw new Error('phone_exists');
  const hash = await bcrypt.hash(password, SALT_ROUNDS);
  const user = new User({ phone_number, password_hash: hash });
  await user.save();
  return user;
}

async function verifyCredentials({ phone_number, password }) {
  const user = await User.findOne({ phone_number }).exec();
  if (!user) return null;
  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) return null;
  user.last_login = new Date();
  await user.save();
  return user;
}

module.exports = { createUser, verifyCredentials };
