# SEC working contract

- Build the bilingual, evidence-aware AI Systems Security Observatory for tracing AI-agent trust from model intent through identity, authorization, constrained action, audit, and incident recovery.
- Keep research truth in `content/` (Zod-validated, fail-closed) and `src/content/`; never scan systems, store secrets, authenticate users, or compute an aggregate trust score.
- A control receives its own evidence, assurance level, and sources only. Aggregate trust scores, cross-control rollups, and site-wide pass/fail judgments are observer outputs, never decision inputs.
- Behavior, experiment, world, simulation, metric, and export schema versions are explicit. Update affected versions when semantics change.
- Every catalog record carries explicit sources, stable IDs, a review date no later than the active snapshot cutoff, and a stamped `release.json` with the exact Git SHA. Reject records that fail Zod validation, lack bilingual parity, or exceed the research cutoff.
- Keep Turkish and English controls and explanations equivalent. Label model assumptions and simulation units.
- `src/content/portfolio.ts` takes public application identities and the portfolio review date from the canonical manifest in the sibling `aserdargun-com` repo (`../aserdargun-com/data/living-system.json`), projected into the committed `src/content/portfolio.lock.json`. Run `npm run sync:portfolio` to regenerate that lock after an upstream identity change; `src/content/portfolio.sync.test.ts` fails on drift. If the script reports a review date newer than the snapshot cutoff, cut a new snapshot — never edit `reviewedAt` by hand.
- Verify `npm run validate:codex` and review `git diff --check` before handoff.
- Local work only unless the user authorizes external publication. Preserve unrelated work and processes.
