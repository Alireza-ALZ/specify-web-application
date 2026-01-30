function validateForm(body) {
  const { firstname, lastname } = body || {};
  const errors = [];
  if (!firstname || typeof firstname !== 'string')
    errors.push('firstname_required');
  if (!lastname || typeof lastname !== 'string')
    errors.push('lastname_required');
  return errors;
}

module.exports = { validateForm };
