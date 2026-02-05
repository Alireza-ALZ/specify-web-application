# Tasks: Phone Auth + Form Submission

**Input**: Design documents from `specs/001-phone-auth-form/`
**Prerequisites**: `plan.md`, `spec.md`, `data-model.md`, `contracts/openapi.yaml`

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Initialize repository structure and top-level manifests: create `backend/package.json`, `frontend/package.json`, `.gitignore`, `.env.example` (paths: backend/package.json, frontend/package.json, .gitignore, .env.example)
- [ ] T002 Initialize backend Node project and install core dependencies in `backend/package.json` (express, mongoose, bcrypt, express-session, connect-mongo, dotenv) (path: backend/package.json)
- [ ] T003 Initialize frontend skeleton: `frontend/index.html`, `frontend/src/styles.css`, `frontend/src/app.js` (paths: frontend/index.html, frontend/src/styles.css, frontend/src/app.js)
- [ ] T004 [P] Configure linting and formatting: add `.eslintrc.js`, `.prettierrc` and `package.json` scripts in both `backend/` and `frontend/` (paths: backend/.eslintrc.js, frontend/.eslintrc.js, backend/.prettierrc, frontend/.prettierrc)
- [ ] T005 [P] Configure CI skeleton and constitution compliance checks: create `.github/workflows/ci.yml` with lint/test/accessibility/perf smoke steps (path: .github/workflows/ci.yml)
- [ ] T006 Create `.env.example` with `MONGODB_URI`, `SESSION_SECRET`, `PORT` (path: .env.example)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

- [ ] T007 Setup MongoDB connection and Mongoose bootstrap in `backend/src/db/index.js` (path: backend/src/db/index.js)
- [ ] T008 [P] Create `User` Mongoose model (`backend/src/models/user.js`) with fields `phone_number`, `password_hash`, `created_at`, `last_login`, `profile_completed_at` and unique index on `phone_number` (path: backend/src/models/user.js)
- [ ] T009 [P] Create `FormSubmission` Mongoose model (`backend/src/models/formSubmission.js`) with fields `user_id`, `firstname`, `lastname`, `submitted_at` (path: backend/src/models/formSubmission.js)
- [ ] T010 [P] Implement authentication service skeleton (`backend/src/services/authService.js`) including password hashing helpers (path: backend/src/services/authService.js)
- [ ] T011 Setup Express application skeleton and routing (`backend/src/app.js`, `backend/src/routes/index.js`) (paths: backend/src/app.js, backend/src/routes/index.js)
- [ ] T012 [P] Implement session management and connect-mongo session store configuration (`backend/src/middleware/session.js`, backend/src/config/session.js) (paths: backend/src/middleware/session.js, backend/src/config/session.js)
- [ ] T013 [P] Add validation utilities (`backend/src/validators/authValidator.js`, `backend/src/validators/formValidator.js`) (paths: backend/src/validators/authValidator.js, backend/src/validators/formValidator.js)
- [ ] T014 [P] Setup testing frameworks and CI test scripts: `backend/jest.config.js`, `backend/package.json` test scripts, create `backend/tests/unit` and `backend/tests/integration` folders (paths: backend/jest.config.js, backend/package.json, backend/tests/unit, backend/tests/integration)
- [ ] T015 [P] Add basic security middleware: rate limiter, helmet (paths: backend/src/middleware/rateLimit.js, backend/src/middleware/security.js)

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - Phone signup & login (Priority: P1)

**Goal**: Allow users to sign up (phone + password) and log in to create a session

**Independent Test**: Integration tests that POST to `/api/auth/signup` and `/api/auth/login` and assert DB records and session cookie

### Tests (TDD style)

- [ ] T016 [P] [US1] Write integration test for signup flow `backend/tests/integration/auth.signup.test.js` (should fail before implementation) (path: backend/tests/integration/auth.signup.test.js)
- [ ] T017 [P] [US1] Write integration test for login flow `backend/tests/integration/auth.login.test.js` (path: backend/tests/integration/auth.login.test.js)
- [ ] T018 [P] [US1] Write unit tests for `authService` in `backend/tests/unit/authService.test.js` (path: backend/tests/unit/authService.test.js)

### Implementation for User Story 1

- [ ] T019 [US1] Implement signup endpoint in `backend/src/routes/auth.js` (path: backend/src/routes/auth.js) (depends on T008, T010, T011)
- [ ] T020 [US1] Implement login endpoint in `backend/src/routes/auth.js` (path: backend/src/routes/auth.js) (depends on T010, T012)
- [ ] T021 [US1] Implement authService logic: create user, hash password, check duplicates (`backend/src/services/authService.js`) (path: backend/src/services/authService.js)
- [ ] T022 [US1] Implement server-side validation for signup/login in `backend/src/validators/authValidator.js` (path: backend/src/validators/authValidator.js)
- [ ] T023 [US1] Add client-side auth pages and JS: `frontend/src/pages/auth.html`, `frontend/src/components/auth.js` (paths: frontend/src/pages/auth.html, frontend/src/components/auth.js)
- [ ] T024 [US1] Ensure session cookies set on login and protected-route middleware `backend/src/middleware/authSession.js` (path: backend/src/middleware/authSession.js)
- [ ] T025 [US1] Confirm integration tests pass and iterate until green (CI gates) (path: backend/tests/integration)

**Checkpoint**: User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Complete and submit user information form (Priority: P1)

**Goal**: Authenticated users complete `firstname` & `lastname` form and data persists

**Independent Test**: Integration test that authenticates a user, POSTs to `/api/form/submit`, and asserts `form_submissions` entry and `users.profile_completed_at` update

### Tests

- [ ] T026 [P] [US2] Write integration test for form submission in `backend/tests/integration/form.submit.test.js` (path: backend/tests/integration/form.submit.test.js)
- [ ] T027 [P] [US2] Write unit tests for `formService` in `backend/tests/unit/formService.test.js` (path: backend/tests/unit/formService.test.js)

### Implementation for User Story 2

- [ ] T028 [P] [US2] Implement form submission endpoint `backend/src/routes/form.js` (path: backend/src/routes/form.js) (depends on T009, T011)
- [ ] T029 [US2] Implement `formService` to persist `FormSubmission` and update `users.profile_completed_at` (`backend/src/services/formService.js`) (path: backend/src/services/formService.js)
- [ ] T030 [US2] Implement server-side form validation `backend/src/validators/formValidator.js` (path: backend/src/validators/formValidator.js)
- [ ] T031 [US2] Implement frontend form page `frontend/src/pages/form.html` and client JS `frontend/src/components/form.js` to POST to `/api/form/submit` (paths: frontend/src/pages/form.html, frontend/src/components/form.js)
- [ ] T032 [US2] Add audit logging call in submission flow `backend/src/services/auditService.js` (path: backend/src/services/auditService.js)
- [ ] T033 [US2] Confirm integration tests pass for form submission and iterate until green (path: backend/tests/integration)

**Checkpoint**: User Story 2 should be independently testable and functional

---

## Phase 5: Polish & Cross-Cutting Concerns

- [ ] T034 [P] Documentation: Add `specs/001-phone-auth-form/README.md` with architecture notes and run instructions (path: specs/001-phone-auth-form/README.md)
- [ ] T035 [P] Accessibility smoke tests and fix: add `frontend/tests/accessibility/form.accessibility.test.js` and CI step (path: frontend/tests/accessibility/form.accessibility.test.js)
- [ ] T036 [P] Performance smoke check script `scripts/perf/smoke.sh` and CI integration (paths: scripts/perf/smoke.sh, .github/workflows/ci.yml)
- [ ] T037 Security hardening: ensure HTTPS, cookie flags, rate limiting, and input sanitization (`backend/src/middleware/security.js`) (path: backend/src/middleware/security.js)
- [ ] T038 [P] Add end-to-end tests (Playwright) for primary user flows `e2e/` (path: e2e/)
- [ ] T039 [P] Final code cleanup and refactor, ensure all linting/tests pass (paths: backend/, frontend/)

---

## Dependencies & Execution Order

- **Setup (Phase 1)**: No dependencies - start immediately.
- **Foundational (Phase 2)**: Blocks all user stories; must complete before Phase 3.
- **User Stories (Phase 3+)**: Depend on Foundational phase completion. Within each story: Tests (fail) → Services → Endpoints → Frontend → Integration.

## Parallel Opportunities

- Tasks marked `[P]` can be worked on in parallel (different files, independent).
- After foundation completion, User Story 1 and User Story 2 test writing and implementation can be worked on in parallel by separate developers.

## Implementation Strategy

1. Complete Phase 1 & Phase 2 to enable parallel story work.
2. Follow TDD for critical flows: write failing tests (integration) for auth and form submission, then implement services and endpoints until tests pass.
3. Deploy minimal working demo for the auth + form flow and validate manually.
4. Iterate polish items: accessibility, performance, security.
