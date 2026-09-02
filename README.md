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

Local preview binds only to `http://127.0.0.1:4174`. Stop refuses to terminate a listener owned by another checkout.

## Content contract

Research records live under `content/` and are parsed fail-closed with Zod. Every public record carries complete English and Turkish text, explicit sources, stable IDs, and a review date no later than the active snapshot cutoff.

Assurance is recorded per control as `declared`, `enforced`, `observed`, or `proven`; SEC never calculates an aggregate trust score. Claims are labeled `evidence`, `synthesis`, or `watch-signal`.

## Validation

`npm run validate:codex` runs lifecycle ownership tests, content validation, TypeScript, ESLint, component tests, a production build, artifact checks, and desktop/mobile Playwright plus axe checks. A valid `dist/` contains hashed JS/CSS, local fonts, `staticwebapp.config.json`, and `release.json` with the exact Git SHA.

## Publication

The intended public repository is `aserdargun/sec-aserdargun-com`. GitHub Actions deploy the already validated `dist/` artifact to the Free, West Europe Azure Static Web App `swa-sec-aserdargun-com` in `rg-sec-aserdargun-com`. The workflow uses the secret `AZURE_STATIC_WEB_APPS_API_TOKEN_SWA_SEC_ASERDARGUN_COM` and does not use Oryx or Vercel.

The production domain is `sec.aserdargun.com`; custom-domain and DNS records are managed separately after the Azure-generated hostname is verified.

## Licensing

Source code is MIT licensed. Original research prose and structured catalog content are licensed under CC BY 4.0; third-party source material remains under its respective owner's terms.
