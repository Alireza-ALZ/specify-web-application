function validateSignup(body) {
  const { phone_number, password } = body || {};
  const errors = [];
  if (!phone_number || typeof phone_number !== 'string')
    errors.push('phone_number_required');
  if (!password || typeof password !== 'string' || password.length < 6)
    errors.push('password_invalid');
  return errors;
}

function validateLogin(body) {
  const { phone_number, password } = body || {};
  const errors = [];
  if (!phone_number) errors.push('phone_number_required');
  if (!password) errors.push('password_required');
  return errors;
}

module.exports = { validateSignup, validateLogin };
