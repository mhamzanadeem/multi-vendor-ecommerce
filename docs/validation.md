# Local validation — 2026-10-24

Executed in the Windows checkout using Node v24.18.0 and existing dependencies.

| Check | Actual result |
|---|---|
| npm run test:unit | 3 passed |
| Full suite against localhost guardian_test | 7 tests, 6 passed, 1 expected baseline failure |
| Coupon defect | Seller A deletion returned 201 instead of 403/404 |
| Legitimate owner deletion | Passed |
| Anonymous deletion | Denied; coupon preserved |
| Invalid/missing coupon IDs | Controlled client errors |
| API readiness without database | 503 and correct revision |
| Payments disabled | 503 without Stripe initialization |
| npm run build --prefix frontend | Passed: 1647 modules; large bundle warning |
| JavaScript syntax checks (deployment, seed, smoke) | Passed |
| CI YAML | Parsed with PyYAML; not validated by GitLab CI Lint |

JUnit was generated locally at reports/acceptance.xml (ignored; CI will retain its
own reports). These are local results, not GitLab execution evidence. The
cross-seller failure is an assertion against actual HTTP behavior, not a missing
database/dependency error. The coupon handler was not modified.

Dependency download attempt failed with EACCES accessing registry.npmjs.org in
this environment. No new package was added. Clean npm ci and account-side
execution remain to be verified; existing node_modules were used for local tests.

No Duo session, provider deployment, production release, eligibility decision or
Devpost submission was executed. See limitations.md for remaining work.

Offline npm ci --dry-run --ignore-scripts completed successfully for root and frontend. This checks install planning/lockfile consistency, not an actual clean installation.

## Publication status

Local git add failed: .git/index.lock permission denied (session protects Git
metadata). No commit was created. GitHub connector reports pull=true, push=false.
No remote write was attempted through that read-only connector. Run
`& .\scripts\commit-guardian.ps1` from your existing PowerShell session in the repository
terminal after reviewing changes. This stages only implementation files and
excludes the pre-existing login edit, data01.txt, vercel.json and real environment
files. The script stops on errors and never force-pushes. Reimport only after the
GitHub commit is visible.

## Existing Atlas database support

User authorized multi-vendor-ecommerce. Guard now accepts that exact name; fixtures
use unique run IDs and cleanup deletes only IDs created by that execution.
Schema auto-index creation is disabled. Three unit/readiness checks passed after
this update. Atlas connectivity was not attempted with private credentials. CI
now reads TEST_DB_URL from project variables instead of a local MongoDB service.
