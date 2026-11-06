# Open items

Open items after the authority v2 work. Each line says what is missing and why.

- **Map checks from OpenStreetMap:** the Overpass download has never completed (it failed again on 31 Oct 2026 from a sandboxed network: every server reset or timed out). Run it from a normal connection with `docker compose exec api python -m scripts.load_osm`, then copy the result out with `docker compose cp api:/srv/data/osm_features.geojson backend/data/` and commit it, so everyone else can load it with `--from-fixture` instead of downloading. Until then "near a school" and "on a main road" use the citizen's flags, labelled "citizen says".
- **Ward boundaries outside BMC:** migration 0017 loads the official BMC ward polygons (33 of the 42 areas). The areas outside BMC limits (Thane, Kalyan, Navi Mumbai and the rest) still fall back to the nearest area centre; load their polygons with `scripts/load_wards.py`.
- **Browser check of officer actions:** login for every role, the citizen report flow (photo, GPS, duplicate guard, submit), the officer complaint brief, Acknowledge and the Analysis tab were clicked through in a browser on 31 Oct 2026. Assign, schedule, hold, reject, duplicate, transfer, bulk actions and the citizen confirm / reopen buttons are covered by API tests only.
- **Hindi and Marathi:** all new text was machine-written and needs review by native speakers (see `docs/LANGUAGE_REVIEW.md`).
- **Live-wire scoring:** a single live-wire report with nothing else known scores 4 x 1 (MODERATE RISK). Decide on a floor for impact 4 (DECISIONS.md entry 69).
- **Image model:** six classes only; needs real Mumbai photos and data for water leakage, drainage and electrical hazards.
- **Performance:** photo analysis and the 100,000-incident list were measured on an earlier build; re-measure on the real server with `scripts/bench.py`.
- **Admin weights page:** a screen to edit the risk configuration was not built; the numbers live in `backend/app/risk_config.py`.
- **Nominatim:** place search runs from the browser; add a backend proxy if usage grows.

---

