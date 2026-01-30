const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  phone_number: { type: String, required: true, unique: true },
  password_hash: { type: String, required: true },
  created_at: { type: Date, default: () => new Date() },
  last_login: { type: Date },
  profile_completed_at: { type: Date, default: null },
});

module.exports = model('User', UserSchema);
