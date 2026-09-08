# SEC working contract

- Build the bilingual, evidence-aware AI Systems Security Observatory for tracing AI-agent trust from model intent through identity, authorization, constrained action, audit, and incident recovery.
- Keep research truth in `content/` (Zod-validated, fail-closed) and `src/content/`; never scan systems, store secrets, authenticate users, or compute an aggregate trust score.
- A control receives its own evidence, assurance level, and sources only. Aggregate trust scores, cross-control rollups, and site-wide pass/fail judgments are observer outputs, never decision inputs.
- Behavior, experiment, world, simulation, metric, and export schema versions are explicit. Update affected versions when semantics change.
- Every catalog record carries explicit sources, stable IDs, a review date no later than the active snapshot cutoff, and a stamped `release.json` with the exact Git SHA. Reject records that fail Zod validation, lack bilingual parity, or exceed the research cutoff.
- Keep Turkish and English controls and explanations equivalent. Label model assumptions and simulation units.
- Verify `npm run validate:codex` and review `git diff --check` before handoff.
- Local work only unless the user authorizes external publication. Preserve unrelated work and processes.
