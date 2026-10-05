# base-project-init

Starter monorepo for full-stack / LLD interviews. **Clone or copy this repo**, then add domain code using the conventions in [`backend/README.md`](backend/README.md).

| Layer | Stack |
|-------|--------|
| Backend | NestJS, Postgres, `sequelize-typescript`, CLI migrations, `class-validator` |
| Frontend | Vue 3 + Vite |
| Mock API | json-server → `frontend/src/mock/db.json` (Vite proxies `/api`) |

## Quick start

1. `cp backend/.env.example backend/.env` — set Postgres credentials.
2. `createdb myapp_db` (or your `DATABASE_NAME`).
3. From repo root: `npm run setup`
4. `npm run backend:dev` → `http://localhost:3000/health`
5. `npm run frontend:dev`
6. Optional: `npm run mock:dev` → `fetch('/api/records')` in dev

## Backend structure (summary)

When adding a resource, follow **migration → model → repository → service → DTO → controller → module**. Details, validation, and npm scripts are in **[backend/README.md](backend/README.md)**.

## Cursor / AI

Project rule: [`.cursor/rules/nest-backend-template.mdc`](.cursor/rules/nest-backend-template.mdc) — copy this folder when spinning up a new repo so agents follow the same layout.
