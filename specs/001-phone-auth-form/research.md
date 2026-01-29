# Research: Phone Auth + Form Submission

Decision: Use Node.js + Express for backend, MongoDB with Mongoose for storage,
plain HTML/CSS/JS for frontend.

Rationale:
- You specified NodeJS + Express and MongoDB/Mongoose; this is well-supported
  and lightweight for a small web app.
- HTML/CSS/JS frontend fits a sharp, attractive UI without heavy frameworks.

Choices made:
- Language/Runtime: Node.js 18+ (LTS) — wide ecosystem, stable for Express.
- Frameworks: Express 4.x for server routing and middleware.
- Database: MongoDB (hosted or local) with Mongoose ODM for schemas and
  validation.
- Authentication: Phone number + password (hashed) per provided model.
- Testing: `jest` for unit tests, `supertest` for HTTP integration tests,
  `playwright` or `cypress` for end-to-end UI tests.
- Linting/formatting: `eslint` + `prettier` with CI enforcement.
- CI: GitHub Actions recommended; include lint, unit tests, integration
  tests, accessibility smoke checks, and a lightweight performance smoke test.

Alternatives considered:
- SMS OTP or TOTP-first authentication — rejected because your data model
  explicitly includes a hashed password field; phone+password is simpler to
  implement and aligns with the provided models. MFA can be added later.

Security & Compliance:
- Passwords MUST be salted and hashed (bcrypt/argon2). Rate-limit auth
  endpoints and implement account lockout after repeated failures.
- Encrypt transport (TLS) and secure cookie/session storage for web sessions.

Performance:
- Goal: p95 < 200ms for auth and form submission endpoints under baseline
  single-instance load. If requirements increase, add caching and scaling.

Open Questions (resolved):
- Data retention: keep data until user requests deletion (per spec).
