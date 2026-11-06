# Contributing to iREPORT

Thanks for helping. This file explains how to set the project up, what to check before you open a pull request, and how
the code is organised.

## Set up

Follow **Quick start** in the [README](README.md): Docker runs PostgreSQL + PostGIS, MinIO and the API; the website runs
with `npx pnpm@10 dev` on http://localhost:5173. Windows users can also read [docs/WINDOWS_SETUP.md](docs/WINDOWS_SETUP.md).

## Before you open a pull request

Run the same checks as CI (`.github/workflows/ci.yml`). All of them must pass.

```bash
docker compose --profile test run --rm tests   # backend tests
python -m pytest ml/tests                      # ML parity tests
npx tsc --noEmit                               # frontend type check
node scripts/check-i18n.mjs                    # every English string has Hindi and Marathi
npx pnpm@10 build                              # production build
```

## Rules the code follows

- **Every visible string is translated.** Add new text to `src/i18n.ts` (citizen pages) or `src/i18nStaff.ts` (officer
  and admin pages) in English, Hindi and Marathi. The i18n check fails otherwise. Machine-written Hindi or Marathi must
  be listed in [docs/LANGUAGE_REVIEW.md](docs/LANGUAGE_REVIEW.md) for a native speaker to check.
- **Database changes go in a new Alembic migration** in `backend/alembic/versions/`. Never edit a migration that is
  already on `main`.
- **Risk numbers live in one place**, `backend/app/risk_config.py`. The SQL copy of the formula must stay identical; a
  test compares them.
- **Officers only see their own area.** Any new authority endpoint must apply the same area check as the existing ones,
  and needs a test that an officer from another area is refused.
- **Accessibility:** buttons need visible text or an accessible name, form fields need labels, and text needs at least
  4.5:1 contrast.
- **Pictures:** add a credit for every new image to [docs/IMAGE_CREDITS.md](docs/IMAGE_CREDITS.md). Do not add stock
  images with watermarks or unknown licences.

## Commits and pull requests

- One topic per pull request, with a short description of what changed and why.
- Write commit messages in the imperative ("Fix due date for missing settings"), with details in the body when useful.
- Do not commit `.env` or real secrets. `.env.example` holds placeholders only.

## Security problems

Do not open a public issue. See [SECURITY.md](SECURITY.md).
