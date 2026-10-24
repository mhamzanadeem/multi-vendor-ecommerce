# Rollback

Before enabling deployment, record the current staging deployment ID and commit.
On failed smoke checks, stop promotion and inspect logs. Restore the previous
known-good provider deployment using its platform controls; wait for readiness
and rerun smoke with EXPECTED_REVISION set to that revision. Do not change a
production service or database as a staging rollback. Automatic rollback is not
implemented. Do not use git reset/force-push to roll back deployed application code.
