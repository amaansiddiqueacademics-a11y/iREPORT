## What changed and why

<!-- One or two sentences. Link the issue if there is one: "Fixes #12". -->

## How it was checked

- [ ] Backend tests pass (`docker compose --profile test run --rm tests`)
- [ ] Type check, i18n check and build pass (`npx tsc --noEmit`, `node scripts/check-i18n.mjs`, `npx pnpm@10 build`)
- [ ] New visible text is in English, Hindi and Marathi
- [ ] Database changes are in a new migration
- [ ] Tried in the browser (say which role and screens)
