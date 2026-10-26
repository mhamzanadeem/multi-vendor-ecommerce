# Marketplace Guardian ? existing multi-vendor marketplace

Preparatory tooling for a GitLab Duo seller-isolation repair workflow. The
marketplace predates the hackathon; new automation is documented separately.

**Status:** the seller-scoped coupon deletion repair reviewed in
[Showcase MR !3](https://gitlab.com/gitlab-ai-hackathon/transcend-october-2026/43060293/showcase/-/merge_requests/3)
is synchronized into this checkout for deployment through the existing GitHub
hosting integrations. A small banner identifies the hackathon demo and links to
Showcase. This synchronization is not a new agent-authored repair. Verify the
GitHub commit and both hosting deployment records before claiming it is live.
Earlier baseline validation notes below describe the pre-repair snapshot.

- [Setup and tests](docs/setup.md)
- [Starting point and provenance](docs/starting-point.md)
- [Architecture](docs/architecture.md)
- [Duo task](docs/duo-task.md)
- [Deployment configuration](docs/deployment.md)
- [Evidence](docs/evidence.md)
- [Local validation](docs/validation.md)
- [Limitations](docs/limitations.md)
- [Rollback](docs/rollback.md)
- [MIT license](LICENSE)

## Quick start

Node 24 and MongoDB are required. Docker is not required.

```powershell
npm.cmd ci
npm.cmd ci --prefix frontend
```

Copy environment examples only if local configuration does not already exist.
Follow docs/setup.md to configure guardian_demo, seed fictional accounts, and run
`npm.cmd run dev`, `npm.cmd start --prefix frontend`, and the optional socket server.
Never publish real credentials. Payments are disabled in the example environment.

## Validation

```powershell
npm.cmd run test:unit
$env:TEST_DB_URL = 'mongodb://127.0.0.1:27017/guardian_test'
npm.cmd test
npm.cmd run build --prefix frontend
```

The cross-seller coupon assertion must fail on the baseline and pass after a
real Duo repair without changing acceptance checks. Missing database connectivity
is not a reproduced vulnerability. GitLab CI runs the same suite using a MongoDB
service and retains JUnit output. Add a pipeline badge only after the final import
path and actual execution are confirmed.
