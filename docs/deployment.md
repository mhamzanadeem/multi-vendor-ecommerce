# Deployment scaffold (not executed)

Keep current hosting unchanged. Provision separate demo services and synthetic data.
Docker packaging is deferred. This workflow uses provider source builds.

## Render staging API

Connect a separate service to the reimported repository, install with `npm ci`,
start with `npm start`, and configure its database, signing keys, frontend origin
and NODE_ENV=production in the provider secret store. Set PAYMENTS_ENABLED=false.
Render exposes RENDER_GIT_COMMIT; readiness reports this commit or APP_REVISION.
Verify secure cross-origin cookies with the real staging domains/browser.

Configure masked CI variables RENDER_API_KEY and RENDER_SERVICE_ID. Use a scoped
credential. Only use staging service IDs. scripts/deploy-render.js requests the
exact CI commit, polls with a bound, and verifies the resulting commit. It has not
been exercised against an account and must be validated before enabling CD.

## Frontend

Create a separate Vercel demo project with root frontend and npm run build. Set
VITE_BACKEND_URL/VITE_API_URL and VITE_SOCKET_URL before building. Wire deployment
to the same revision as the API. Automated frontend deployment and independent
frontend revision verification are NOT implemented in this scaffold. Until those
are configured, do not claim exact-revision end-to-end delivery.

## Enable only after validation

Configure SMOKE_API_URL and SMOKE_FRONTEND_URL. Set GUARDIAN_CD_ENABLED=true only
after provider access, frontend delivery and the API deployment script are tested.
CI waits for acceptance/build, deploys the API, then runs smoke checks. The smoke
checks assert API revision, readiness, frontend HTML, product-list shape and
anonymous coupon denial. They do not yet prove seller browser workflows.

The blocking manual approve_release job records staging outcome approval only.
Production promotion and a platform release object are not implemented. Configure
protected environments/approvers separately if available. Do not claim enforced
approver identity from a manual job alone.
