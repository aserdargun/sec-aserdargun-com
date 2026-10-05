# SEC — AI Systems Security Observatory

SEC is a bilingual, static research instrument for examining whether an AI agent's action can be trusted from model intent through identity, delegated authority, constrained execution, audit evidence, and recovery.

The product is organized around the trust path:

`model → agent → identity → credential → authorization → tool → sandbox → data → action → audit → incident`

It does not scan systems, store secrets, authenticate users, provide a compliance result, or replace a security assessment.

## Local lifecycle

The repository guarantees Node.js 22 through its lifecycle wrapper.

```bash
sh scripts/npm22.sh ci
sh scripts/npm22.sh run preview:start
sh scripts/npm22.sh run preview:status
sh scripts/npm22.sh run validate:codex
sh scripts/npm22.sh run preview:stop
```

Local preview binds to `http://127.0.0.1:4174` by default. Each preview start builds the current checkout; state is kept separately per port. Stop refuses to terminate a listener owned by another checkout. When that port is already in use, the whole validation chain can use a checkout-specific port, for example `SEC_PREVIEW_PORT=43123 npm run validate:codex`.

## Content contract

Research records live under `content/` and are parsed fail-closed with Zod. Every public record carries complete English and Turkish text, explicit sources, stable IDs, and a review date no later than the active snapshot cutoff.

The `assurance` field records an implementation evidence target per control as `declared`, `enforced`, `observed`, or `proven`; These labels are requirements, not measured deployment results or executed test artifacts. SEC never calculates an aggregate trust score. Control records expose implementation guidance, tradeoffs, all mapped nodes and threats, and linked evidence in both desktop and mobile views. Claims are labeled `evidence`, `synthesis`, or `watch-signal`.

Portfolio identities and the portfolio review date are not hand-copied. `npm run sync:portfolio` regenerates `src/content/portfolio.lock.json` from the canonical manifest in the sibling `aserdargun-com` repo (`../aserdargun-com/data/living-system.json`; override with `ASERDARGUN_LIVING_SYSTEM=<path>`), and `src/content/portfolio.sync.test.ts` fails on drift. If the script reports a review date newer than the active cutoff, cut a new snapshot instead of editing `reviewedAt`.

The active research cutoff is **2026-10-05**: 11 sources, 13 claims, 11 trust nodes, 10 threats, 14 controls, four illustrative scenarios, and seven framework mappings. The ACS reference disclosure is pinned to Git revision `193753778977e88c6573adbf7f98e42eacd2c15a`; it is source-reported evidence, not a SEC execution result. MCP token requirements link to the versioned authorization specification. MITRE ATLAS releases content monthly under a YYYY.MM scheme, so the ATLAS row is expected to move more often than the others. Snapshot notes retain editorial history; prior snapshots do not freeze copies of the entire catalog.

## Portfolio context

The Security Brief connects HNS architecture questions, CTX context and memory boundaries, and EVL evaluation questions to SEC’s control evidence requirements. LCL and CLD carry those questions into local and cloud deployment choices. These are learning relationships, not runtime integrations, deployment approvals, or security assessments of the portfolio. Editorial links live in `src/content/portfolio.ts` and are validated alongside the research catalog.

The root site's published application metadata is maintained separately in `aserdargun-com/data/living-system.json`. Its release SHA and research cutoff describe the verified public release; local research updates must not be represented as already deployed.

## Validation

`npm run validate:codex` runs lifecycle ownership tests, content validation, TypeScript, ESLint, component tests, a production build, artifact checks, and desktop/mobile Playwright plus axe checks. A valid `dist/` contains hashed JS/CSS, local fonts, `staticwebapp.config.json`, and `release.json` with the exact checkout Git SHA, a local-change flag, and the configuration checksum. CI refuses to stamp a dirty checkout. Artifact validation checks the source configuration against its deployed copy and verifies HTML asset references.

## Publication

The intended public repository is `aserdargun/sec-aserdargun-com`. GitHub Actions deploy the already validated `dist/` artifact to the Free, West Europe Azure Static Web App `swa-sec-aserdargun-com` in `rg-sec-aserdargun-com`. The workflow uses the secret `AZURE_STATIC_WEB_APPS_API_TOKEN_SWA_SEC_ASERDARGUN_COM` and does not use Oryx or Vercel.

The production domain is `sec.aserdargun.com`; custom-domain and DNS records are managed separately after the Azure-generated hostname is verified.

## Licensing

Source code is MIT licensed. Original research prose and structured catalog content are licensed under CC BY 4.0; third-party source material remains under its respective owner's terms.
