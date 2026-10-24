# Setup without Docker

Use Node 24 and a separately installed MongoDB server or dedicated MongoDB cluster.
No Docker Desktop is required. Node compatibility and clean installation must also
be verified in GitLab CI; a build using existing node_modules is not a clean install.

PowerShell:

```powershell
npm.cmd ci
npm.cmd ci --prefix frontend
Copy-Item backend/config/.env.example backend/config/.env
Copy-Item frontend/.env.example frontend/.env
Copy-Item socket/.env.example socket/.env
```

Do not overwrite existing environment files. Edit local examples with your own
random signing keys and dedicated `guardian_demo` database URI. Never use production
credentials. Payments are disabled in the example; uploads still require Cloudinary.
Public Vite variables are bundled into browser code and must never contain secrets.

```powershell
$env:DEMO_PASSWORD = '<choose-a-demo-only-password-at-least-12-characters>'
npm.cmd run seed:demo
npm.cmd run dev
```

In a second terminal run `npm.cmd start --prefix frontend`. For messaging, in a
third terminal run `Set-Location socket` then `node index.js` (port 4000).
Open http://localhost:5173. API defaults to port 8000.

Fixtures use seller-a/seller-b/customer-a/customer-b at `example.test`. Existing
fixture passwords are preserved on rerun. The seed writes only named fixtures in
`guardian_demo`; it never drops a database. Set FRONTEND_ORIGIN to the exact
frontend origin, comma-separated for multiple allowed origins.

## Tests

```powershell
npm.cmd run test:unit
$env:TEST_DB_URL = 'mongodb://127.0.0.1:27017/guardian_test'
npm.cmd test
npm.cmd run build --prefix frontend
```

Tests refuse other database names. Use dedicated credentials and do not run suites
concurrently against the same database. The integration suite starts the real app,
uses real seller password login and cookies, and cleans only its named fixtures.
It calls no payment, email or image APIs. Missing database access is infrastructure
failure, not proof of the coupon vulnerability.

Before Duo repairs deletion, the cross-seller assertion is expected to fail.
After repair, every assertion must pass unchanged. CI intentionally blocks on this
failure; there is no allow_failure exception for the acceptance suite.
