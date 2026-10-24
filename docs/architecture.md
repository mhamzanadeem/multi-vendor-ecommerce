# Architecture

React/Vite frontend -> Express API -> MongoDB. Cloudinary, Stripe and email are
external integrations. Socket.IO is a separate process with in-memory connection
state. Multi-instance socket behavior requires additional design.

Acceptance tests -> ephemeral HTTP listener -> real login/coupon routes ->
dedicated guardian_test database. Providers are not used by this scenario.

Intended workflow: issue -> supported Duo execution -> repair MR -> unchanged
acceptance tests + frontend build -> staging source build -> smoke -> approval.
Actual Duo orchestration and credentials are account-side prerequisites, not
capabilities established by committing this repository.
