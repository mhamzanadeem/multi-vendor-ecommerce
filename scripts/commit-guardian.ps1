# Run from your own PowerShell session after reviewing the implementation.
$ErrorActionPreference = 'Stop'
Set-Location -LiteralPath (Split-Path -Parent $PSScriptRoot)

$guardianFiles = @(
  '.gitignore', '.gitlab-ci.yml', 'README.md', 'package.json', 'package-lock.json',
  'frontend/package.json', 'frontend/package-lock.json', 'frontend/.env.example',
  'frontend/public/demo-product.svg', 'backend/config/.env.example',
  'backend/app.js', 'backend/controller/payment.js', 'backend/db/Database.js',
  'backend/server.js', 'backend/utils/jwtToken.js', 'backend/utils/shopToken.js',
  'backend/tests/config.test.js', 'backend/tests/readiness.test.js',
  'backend/tests/coupon-ownership.test.js', 'socket/.env.example',
  'scripts/test-database.js', 'scripts/seed-demo.js', 'scripts/smoke-staging.js',
  'scripts/deploy-render.js', 'scripts/commit-guardian.ps1',
  'docs/starting-point.md', 'docs/setup.md', 'docs/duo-task.md',
  'docs/deployment.md', 'docs/architecture.md', 'docs/evidence.md',
  'docs/limitations.md', 'docs/rollback.md', 'docs/validation.md'
)

$branch = git branch --show-current
if ($LASTEXITCODE -ne 0 -or $branch -ne 'main') { throw 'Expected main; inspect your branch before committing.' }
$remote = git remote get-url origin
if ($LASTEXITCODE -ne 0 -or $remote -ne 'https://github.com/mhamzanadeem/multi-vendor-ecommerce.git') {
  throw 'Unexpected origin; inspect remotes before pushing.'
}
$staged = git diff --cached --name-only
if ($LASTEXITCODE -ne 0 -or $staged) { throw 'Index must be empty so unrelated staged work is not committed.' }
git diff --check -- @guardianFiles
if ($LASTEXITCODE -ne 0) { throw 'Whitespace check failed.' }
git add -- @guardianFiles
if ($LASTEXITCODE -ne 0) { throw 'Staging failed; no commit or push attempted.' }
git commit -m 'Add Guardian acceptance baseline, reproducible setup and GitLab CI scaffolding' -m 'Reproduce cross-seller coupon deletion through real seller authentication; preserve the defect for a genuine Duo repair. Add isolated fixtures, readiness checks, source-deployment tooling and explicit evidence/limitations documentation. Defer Docker and account-side execution.'
if ($LASTEXITCODE -ne 0) { throw 'Commit failed; push not attempted.' }
git push origin main
if ($LASTEXITCODE -ne 0) { throw 'Push failed. Commit is preserved locally; inspect authentication or remote changes. Do not force-push.' }
