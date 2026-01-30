const { Schema, model } = require('mongoose');

const FormSubmissionSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  submitted_at: { type: Date, default: () => new Date() },
});

module.exports = model('FormSubmission', FormSubmissionSchema);
