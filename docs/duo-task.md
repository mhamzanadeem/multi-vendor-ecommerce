# Duo execution instructions

This document is a task specification, not an installed flow or execution record.
Select a supported agent/flow in the actual project after verifying permissions.

Create an issue: "Seller can delete another seller's coupon". Attach the baseline
commit and real failing acceptance pipeline. Do not describe setup failures as a
reproduced security defect.

Task to give Duo:

> Inspect the issue, backend/controller/couponCode.js, backend/model/coupounCode.js,
> backend/middleware/auth.js and acceptance tests. Run npm ci, set the disposable
> TEST_DB_URL and run npm test. Reproduce the cross-seller failure. Repair only
> coupon deletion using authenticated seller ownership, preferably an atomic
> owner-scoped query. Return 403 or 404 for unauthorized ownership and preserve
> legitimate owner deletion. Never trust a seller ID supplied in the request body.
> Do not modify backend/tests, scripts/test-database.js, CI validation, secrets,
> licensing or deployment permissions. Create a branch and reviewable MR, never
> push directly to the default branch. Run the unchanged suite. Allow at most two
> repair attempts. Stop on missing credentials/permissions or repeated failure;
> report commands, errors, changes and the smallest required human action.

Protect the default branch and require human review for acceptance-suite changes
where project permissions allow. Prompt restrictions alone are not enforcement.
Record session links, MR, commit, results and attempt count in evidence.md.

For escalation evidence, run a separate task with a genuinely unresolved requirement.
Preserve the real stop record. Do not fabricate sessions or call manual edits Duo work.
Supervised classification requires actual multi-step independent execution; an
agent creating an MR followed by manually operated jobs does not establish that.
