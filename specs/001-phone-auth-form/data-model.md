# Data Model

Entities and Mongoose schema outlines for `001-phone-auth-form` feature.

## User
- Collection: `users`
- Fields:
  - `_id`: ObjectId
  - `phone_number`: string, unique, normalized (E.164)
  - `password_hash`: string (bcrypt/argon2)
  - `created_at`: Date
  - `last_login`: Date
  - `profile_completed_at`: Date | null

Validation rules:
- `phone_number` required, unique, validated by E.164 regex.
- `password_hash` required on account creation (unless using alternate flows).

## FormSubmission
- Collection: `form_submissions`
- Fields:
  - `_id`: ObjectId
  - `user_id`: ObjectId (ref -> `users`)
  - `firstname`: string (required)
  - `lastname`: string (required)
  - `submitted_at`: Date

Indexes:
- `users.phone_number` unique index.
- `form_submissions.user_id` index for lookup.

State transitions:
- On successful form submit, set user's `profile_completed_at` to now if
  previously null.
