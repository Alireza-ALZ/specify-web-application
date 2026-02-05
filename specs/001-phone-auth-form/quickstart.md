# Quickstart: Run locally (Phone Auth + Form)

Prerequisites:
- Node.js 18+ and npm
- MongoDB (local or connection string)

Steps:

1. Install:

```bash
npm install
```

2. Create `.env` with at least:

```
MONGODB_URI=mongodb://localhost:27017/specify_app
SESSION_SECRET=replace-me
PORT=3000
```

3. Run migrations / ensure indexes (Mongoose will create indexes at startup)

4. Start the app:

```bash
npm run dev
```

5. Register a user via `POST /api/auth/signup` then login via
`POST /api/auth/login`. Access the form at the frontend and POST to
`/api/form/submit`.

Notes:
- Tests: `npm test` runs unit and integration tests.
- Lint: `npm run lint`.
