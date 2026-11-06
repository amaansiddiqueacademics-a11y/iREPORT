# Security policy

iREPORT handles citizens' reports, photos, locations and contact details, so security problems matter to us.

## Reporting a vulnerability

Please **do not open a public issue** for a security problem.

Report it privately through GitHub instead: open the repository's **Security** tab and choose
**Report a vulnerability**. Only the maintainers can see the report.

Please include:

- what the problem is and where it is (file, endpoint or screen);
- steps to reproduce it;
- what an attacker could do with it.

We aim to reply within 7 days and will tell you when it is fixed. Please give us reasonable time to fix it before
disclosing it publicly.

## Supported versions

Only the `main` branch is supported. iREPORT has not been deployed for real users; see the status note in the
[README](README.md).

## Scope

In scope: the code in this repository (backend API, website, database migrations, Docker setup).

Out of scope: the demo accounts and passwords shipped for local development (they are public on purpose and the
server refuses to start in production with placeholder secrets), and third-party services such as OpenStreetMap tiles
or Nominatim.
