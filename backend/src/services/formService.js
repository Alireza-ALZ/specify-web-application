const FormSubmission = require('../models/formSubmission');
const User = require('../models/user');

async function submitForm({ userId, firstname, lastname }) {
  const submission = new FormSubmission({
    user_id: userId,
    firstname,
    lastname,
  });
  await submission.save();
  await User.findByIdAndUpdate(userId, {
    profile_completed_at: new Date(),
  }).exec();
  return submission;
}

module.exports = { submitForm };
