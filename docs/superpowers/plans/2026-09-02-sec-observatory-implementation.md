# SEC Observatory Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build, validate, publish, and structurally integrate the bilingual SEC — AI Systems Security Observatory at `sec.aserdargun.com`.

**Architecture:** A React/Vite/TypeScript static application compiles bilingual structured research data through fail-closed Zod schemas into seven routes centered on an interactive Trust Path and Scenario Workbench. GitHub Actions validate and build one release-stamped `dist/` artifact, Azure Static Web Apps Free serves that exact artifact, and the root portfolio integrates the verified live app into both canonical data and the Learning System topology.

**Tech Stack:** Node.js 22, npm, React 19, Vite 8, TypeScript 6, React Router 7, Zod 4, Vitest 4, Testing Library, Playwright 1.62, axe-core, Azure Static Web Apps Free, GitHub Actions.

**Spec:** `docs/superpowers/specs/2026-09-02-sec-ai-systems-security-observatory-design.md`

## Global Constraints

- Product identity is `SEC — AI Systems Security Observatory`.
- Product loop is `Map → Constrain → Enforce → Observe → Prove → Recover`.
- Trust path order is `model → agent → identity → credential → authorization → tool → sandbox → data → action → audit → incident`.
- Assurance levels are `declared`, `enforced`, `observed`, and `proven`; never calculate one aggregate score.
- Claim kinds are `evidence`, `synthesis`, and `watch-signal`; unknown stays unknown.
- English and Turkish content must be complete in the same record.
- Production research uses live-checked primary or authoritative sources and visible review dates.
- The application is static-only: no backend, authentication, analytics, form submission, active scanning, stored secret, or compliance guarantee.
- UI direction is forensic ledger × authorization trace; no neon hacker visual language, KPI cards, bento layout, decorative trust meter, or horizontal mobile workflow.
- Local Run binds strictly to `127.0.0.1:4174`; Stop may terminate only a listener owned by this checkout.
- Node.js is `22.x`; package manager is npm with a committed `package-lock.json`.
- Azure target is West Europe, Free, `rg-sec-aserdargun-com` / `swa-sec-aserdargun-com`, subscription `aserdargun subscription 2`.
- Production custom domain is `sec.aserdargun.com`; IHS uses action-time-confirmed TXT first and CNAME second.
- Vercel is excluded.
- Root integration occurs only after SEC generated-host/custom-domain readiness and must change both `data/living-system.json` and the real HNS → SEC → LCL/CLD topology.

---

## File map

### Project and lifecycle

- `package.json`, `package-lock.json`: locked runtime and scripts.
- `vite.config.ts`, `tsconfig*.json`, `eslint.config.js`: compiler, test, build, and lint contract.
- `.codex/environments/environment.toml`: exact Setup/Run/Validate/Stop actions.
- `scripts/preview-control.mjs`: checkout-owned preview lifecycle on port 4174.
- `scripts/validate-content.ts`: schema/reference/policy/date validation CLI.
- `scripts/validate-artifact.mjs`: built route, asset, MIME-config, and release-file assertions.
- `scripts/stamp-release.mjs`: writes exact Git SHA to `dist/release.json`.
- `tests/lifecycle/preview-control.test.mjs`: owned/foreign listener regression coverage.
- `tests/lifecycle/environment-contract.test.mjs`: environment action contract.

### Data model and research

- `content/sources.json`: authoritative sources.
- `content/claims.json`: evidence/synthesis/watch-signal claims.
- `content/trust-nodes.json`: ordered eleven-node trust path.
- `content/threats.json`: threat taxonomy and mappings.
- `content/controls.json`: preventative/detective/containing/recovery controls.
- `content/scenarios.json`: four representative scenarios.
- `content/framework-mappings.json`: NIST/OWASP/MITRE/MCP/EU mappings.
- `content/snapshots/2026-09-02.json`: first reviewed Security Brief snapshot.
- `src/content/schema.ts`: all Zod schemas and inferred types.
- `src/content/catalog.ts`: imports, parses, and indexes the catalog.
- `src/content/selectors.ts`: locale, mapping, filtering, and scenario selectors.
- `src/content/schema.test.ts`, `src/content/selectors.test.ts`: fail-closed and selector tests.

### Application and features

- `src/app/App.tsx`, `src/app/routes.tsx`: locale-aware route composition.
- `src/i18n/locale.ts`, `src/i18n/copy.ts`: locale resolution and UI copy.
- `src/components/AppShell.tsx`, `GlobalHeader.tsx`, `LanguageSwitch.tsx`, `SourceLink.tsx`, `StatusMark.tsx`: shared application chrome.
- `src/features/brief/SecurityBriefPage.tsx`: current synthesis and entry surface.
- `src/features/trust/TrustPathPage.tsx`, `TrustPath.tsx`, `TrustNodeDetail.tsx`, `MobileTrustTrace.tsx`: central trust-path workflow.
- `src/features/threats/ThreatsPage.tsx`, `ThreatToolbar.tsx`, `ThreatIndex.tsx`: threat filtering and disclosure.
- `src/features/controls/ControlsPage.tsx`, `ControlMatrix.tsx`, `MobileControlRecords.tsx`: control/evidence matrix.
- `src/features/scenarios/ScenariosPage.tsx`, `ScenarioPicker.tsx`, `ScenarioTrace.tsx`: validated, shareable scenario workbench.
- `src/features/standards/StandardsPage.tsx`, `StandardsCrosswalk.tsx`: framework mapping surface.
- `src/features/methodology/MethodologyPage.tsx`: editorial and evidence method.
- `src/styles/tokens.css`, `global.css`, `shell.css`, `trust.css`, `matrix.css`, `responsive.css`: visual system and responsive composition.

### Tests and publication

- `src/test/setup.ts`, focused `*.test.tsx` files beside components: component behavior and accessibility semantics.
- `tests/e2e/sec.spec.ts`: bilingual primary workflows.
- `tests/e2e/accessibility.spec.ts`: axe, keyboard, zoom, and overflow acceptance.
- `tests/e2e/routes.spec.ts`: deep-route, redirect, 404, header, and artifact checks.
- `playwright.config.ts`: production preview matrix.
- `public/staticwebapp.config.json`: redirect, SPA fallback, MIME, and security headers.
- `.github/workflows/validate.yml`: validation-only CI.
- `.github/workflows/deploy-swa-sec-aserdargun-com.yml`: exact prebuilt artifact deployment.
- `README.md`, `LICENSE`, `LICENSE-CONTENT`: public handoff and licenses.

---

### Task 1: Establish the tested project and local lifecycle foundation

**Files:**
- Create: `package.json`, `package-lock.json`, `index.html`, `src/main.tsx`, `src/vite-env.d.ts`
- Create: `vite.config.ts`, `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`, `eslint.config.js`
- Create: `.gitignore`, `.codex/environments/environment.toml`
- Create: `scripts/preview-control.mjs`
- Test: `tests/lifecycle/preview-control.test.mjs`, `tests/lifecycle/environment-contract.test.mjs`

**Interfaces:**
- Produces: scripts `dev`, `build`, `content:check`, `typecheck`, `lint`, `test:run`, `test:e2e`, `preview:start`, `preview:status`, `preview:stop`, `artifact:check`, `check`, and `validate:codex`.
- Produces: preview state under `.codex/runtime/preview.json` with `{ pid, cwd, port, startedAt }`.

- [ ] **Step 1: Write lifecycle contract tests**

```js
test('environment delegates ordered actions', () => {
  assert.deepEqual(actions.map(({ name }) => name), ['Run', 'Validate', 'Stop'])
  assert.equal(actions[0].command, 'npm run preview:start')
  assert.equal(actions[1].command, 'npm run validate:codex')
  assert.equal(actions[2].command, 'npm run preview:stop')
})

test('stop refuses a listener owned by another cwd', async () => {
  const result = await runControl('stop', { recordedCwd: foreignDir })
  assert.equal(result.code, 1)
  assert.match(result.stderr, /Refusing to stop/)
  assert.equal(await listenerIsAlive(), true)
})
```

- [ ] **Step 2: Run lifecycle tests and verify RED**

Run: `node --test tests/lifecycle/*.test.mjs`  
Expected: FAIL because environment and preview controller do not exist.

- [ ] **Step 3: Add locked dependencies and lifecycle implementation**

`package.json` must declare Node `22.x`, the scripts above, React/Vite/TypeScript/Zod dependencies, and Vitest/Testing Library/Playwright/axe dev dependencies. `preview-control.mjs` must resolve live listener PIDs, compare the live process cwd to the checkout realpath, send SIGTERM, wait, and use SIGKILL only for the same verified PID.

```toml
# THIS IS AUTOGENERATED. DO NOT EDIT MANUALLY
version = 1
name = "SEC — AI Systems Security Observatory"

[setup]
script = "npm ci && npx playwright install chromium"

[[actions]]
name = "Run"
icon = "run"
command = "npm run preview:start"

[[actions]]
name = "Validate"
icon = "tool"
command = "npm run validate:codex"

[[actions]]
name = "Stop"
icon = "tool"
command = "npm run preview:stop"
```

- [ ] **Step 4: Install and run lifecycle tests GREEN**

Run: `npm install && node --test tests/lifecycle/*.test.mjs`  
Expected: lockfile created; owned listener stops, foreign listener is refused, no-listener stop succeeds, and environment contract passes.

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json index.html src/main.tsx src/vite-env.d.ts vite.config.ts tsconfig*.json eslint.config.js .gitignore .codex scripts/preview-control.mjs tests/lifecycle
git commit -m "chore: establish SEC project lifecycle"
```

### Task 2: Implement fail-closed research schemas and the baseline catalog

**Files:**
- Create: `src/content/schema.ts`, `src/content/catalog.ts`, `src/content/selectors.ts`
- Create: `content/sources.json`, `claims.json`, `trust-nodes.json`, `threats.json`, `controls.json`, `scenarios.json`, `framework-mappings.json`, `snapshots/2026-09-02.json`
- Create: `scripts/validate-content.ts`
- Test: `src/content/schema.test.ts`, `src/content/selectors.test.ts`

**Interfaces:**
- Produces: `parseCatalog(input: unknown): Catalog`.
- Produces: `localize<T extends LocaleText>(value: T, locale: Locale): string`.
- Produces: `getThreatsForNode(nodeId: TrustNodeId): Threat[]`, `getControlsForThreat(threatId: string): Control[]`, `getScenarioTrace(scenarioId: string): ScenarioTraceStep[]`.

- [ ] **Step 1: Write schema and reference tests**

```ts
it('requires the exact trust path order', () => {
  expect(catalog.trustNodes.map((node) => node.id)).toEqual([
    'model', 'agent', 'identity', 'credential', 'authorization', 'tool',
    'sandbox', 'data', 'action', 'audit', 'incident',
  ])
})

it('rejects an evidence claim without a source', () => {
  const invalid = structuredClone(rawCatalog)
  invalid.claims[0].sourceIds = []
  expect(() => parseCatalog(invalid)).toThrow(/evidence claim.*source/i)
})

it('rejects dangling threat and control references', () => {
  const invalid = structuredClone(rawCatalog)
  invalid.threats[0].controlIds.push('missing-control')
  expect(() => parseCatalog(invalid)).toThrow(/missing-control/)
})
```

- [ ] **Step 2: Run content tests RED**

Run: `npm run test:run -- src/content/schema.test.ts src/content/selectors.test.ts`  
Expected: FAIL because schema/catalog modules are missing.

- [ ] **Step 3: Implement types and cross-record validation**

```ts
export const AssuranceLevelSchema = z.enum(['declared', 'enforced', 'observed', 'proven'])
export const EvidenceKindSchema = z.enum(['evidence', 'synthesis', 'watch-signal'])
export const ControlTypeSchema = z.enum(['prevent', 'detect', 'contain', 'recover'])
export const TrustNodeIdSchema = z.enum([
  'model', 'agent', 'identity', 'credential', 'authorization', 'tool',
  'sandbox', 'data', 'action', 'audit', 'incident',
])
```

`RawCatalogSchema.superRefine` must enforce unique IDs, bilingual non-empty text, exact node order, resolvable IDs, evidence-source presence, direct/synthesis mapping labels, reviewed dates not later than the snapshot cutoff, and assurance evidence requirements.

- [ ] **Step 4: Add the reviewed baseline**

Use stable source IDs `nist-ai-800-5`, `nist-agent-standards`, `nist-agent-identity`, `nist-agent-identity-blog-2026-08-27`, `mcp-spec-2026-07-28`, `owasp-agentic-top10-2026`, `mitre-atlas`, and `eu-ai-act-enforcement`. Populate all eleven trust nodes, all four scenarios, the ten threat families from the spec, and controls covering identity binding, scoped/short-lived credentials, audience restriction, policy enforcement, tool allowlisting, sandbox containment, data minimization, approval boundaries, tamper-evident audit, and incident containment/revocation.

- [ ] **Step 5: Run content tests and CLI GREEN**

Run: `npm run content:check && npm run test:run -- src/content/schema.test.ts src/content/selectors.test.ts`  
Expected: PASS with a printed summary of sources, claims, nodes, threats, controls, scenarios, mappings, and snapshots.

- [ ] **Step 6: Commit**

```bash
git add content src/content scripts/validate-content.ts
git commit -m "feat: add SEC trust and evidence catalog"
```

### Task 3: Build locale-aware routing and the application shell

**Files:**
- Create: `src/app/App.tsx`, `src/app/routes.tsx`
- Create: `src/i18n/locale.ts`, `src/i18n/copy.ts`
- Create: `src/components/AppShell.tsx`, `GlobalHeader.tsx`, `LanguageSwitch.tsx`, `SourceLink.tsx`, `StatusMark.tsx`, `LocalizedNotFound.tsx`
- Test: `src/app/App.test.tsx`, `src/components/LanguageSwitch.test.tsx`

**Interfaces:**
- Consumes: parsed `catalog` and `Locale = 'en' | 'tr'`.
- Produces: `routePath(locale, section, search): string` and a language switch preserving section/search.

- [ ] **Step 1: Write route and language behavior tests**

```tsx
it('renders Turkish shell for /tr/trust-path', async () => {
  renderAt('/tr/trust-path')
  expect(await screen.findByRole('banner')).toHaveTextContent('AI Sistemleri Güvenlik Gözlemevi')
  expect(screen.getByRole('link', { name: 'Güven zinciri' })).toHaveAttribute('aria-current', 'page')
})

it('preserves route and scenario query when switching language', async () => {
  renderAt('/en/scenarios?scenario=remote-mcp')
  expect(screen.getByRole('link', { name: 'TR' })).toHaveAttribute('href', '/tr/scenarios?scenario=remote-mcp')
})
```

- [ ] **Step 2: Run shell tests RED**

Run: `npm run test:run -- src/app/App.test.tsx src/components/LanguageSwitch.test.tsx`  
Expected: FAIL because routes and components do not exist.

- [ ] **Step 3: Implement seven routes and shared shell**

Define the stable sections `brief`, `trust-path`, `threats`, `controls`, `scenarios`, `standards`, and `methodology`. Invalid locale/section combinations render `LocalizedNotFound`. Navigation text and screen-reader new-tab copy come from `copy.ts`; no English strings are embedded in Turkish features.

- [ ] **Step 4: Run shell tests GREEN**

Run: `npm run test:run -- src/app/App.test.tsx src/components/LanguageSwitch.test.tsx`  
Expected: PASS for EN/TR routing, active navigation, preserved search state, and localized 404.

- [ ] **Step 5: Commit**

```bash
git add src/app src/i18n src/components
git commit -m "feat: add bilingual SEC application shell"
```

### Task 4: Implement the Security Brief and central Trust Path

**Files:**
- Create: `src/features/brief/SecurityBriefPage.tsx`, `SignalRail.tsx`
- Create: `src/features/trust/TrustPathPage.tsx`, `TrustPath.tsx`, `TrustNodeDetail.tsx`, `MobileTrustTrace.tsx`, `trust-state.ts`
- Test: `src/features/trust/TrustPath.test.tsx`, `src/features/brief/SecurityBriefPage.test.tsx`

**Interfaces:**
- Consumes: `catalog.trustNodes`, current snapshot, `getThreatsForNode`, and `getControlsForNode`.
- Produces: URL state such as `?node=authorization`, validated against `TrustNodeIdSchema`, and keyboard-selectable node details.

- [ ] **Step 1: Write failing primary-flow tests**

```tsx
it('selects authorization and exposes boundary, threats, controls, and evidence', async () => {
  const user = userEvent.setup()
  renderAt('/en/trust-path')
  await user.click(screen.getByRole('button', { name: /authorization/i }))
  expect(location.search).toBe('?node=authorization')
  expect(screen.getByRole('heading', { name: 'Authorization' })).toBeVisible()
  expect(screen.getByText(/delegated authority/i)).toBeVisible()
  expect(screen.getByRole('region', { name: /required evidence/i })).toBeVisible()
})

it('distinguishes evidence, synthesis, and watch signals on the brief', () => {
  renderAt('/en')
  expect(screen.getByText('Evidence')).toBeVisible()
  expect(screen.getByText('Synthesis')).toBeVisible()
  expect(screen.getByText('Watch signal')).toBeVisible()
})
```

- [ ] **Step 2: Run feature tests RED**

Run: `npm run test:run -- src/features/trust src/features/brief`  
Expected: FAIL because feature components do not exist.

- [ ] **Step 3: Implement desktop path, mobile trace, and details**

Use buttons inside an ordered semantic list. Keep the diagrammatic connector layer `aria-hidden`; expose order and state through text. Arrow keys move focus between nodes, Enter/Space selects, URL state is validated through `TrustNodeIdSchema`, and the detail panel owns a stable labelled region.

- [ ] **Step 4: Run feature tests GREEN**

Run: `npm run test:run -- src/features/trust src/features/brief`  
Expected: PASS for URL state, keyboard movement, evidence labels, localized details, and source disclosure.

- [ ] **Step 5: Commit**

```bash
git add src/features/brief src/features/trust
git commit -m "feat: add SEC security brief and trust path"
```

### Task 5: Implement Threat Map and Control Matrix

**Files:**
- Create: `src/features/threats/ThreatsPage.tsx`, `ThreatToolbar.tsx`, `ThreatIndex.tsx`, `threat-state.ts`
- Create: `src/features/controls/ControlsPage.tsx`, `ControlMatrix.tsx`, `MobileControlRecords.tsx`, `control-state.ts`
- Test: `src/features/threats/ThreatsPage.test.tsx`, `src/features/controls/ControlsPage.test.tsx`

**Interfaces:**
- Consumes: threats, controls, trust nodes, assurance levels, and mappings.
- Produces: validated URL filters `node`, `family`, `controlType`, and `assurance`.

- [ ] **Step 1: Write failing filter and matrix tests**

```tsx
it('keeps identity threats when filtering by identity node', async () => {
  renderAt('/en/threats?node=identity')
  expect(screen.getByText('Identity and credential abuse')).toBeVisible()
  expect(screen.queryByText('Cascading failure and recovery')).not.toBeInTheDocument()
})

it('never renders an aggregate trust score', () => {
  renderAt('/en/controls')
  expect(screen.queryByText(/security score|trust score|\d+%/i)).not.toBeInTheDocument()
  expect(screen.getByText('Declared')).toBeVisible()
  expect(screen.getByText('Proven')).toBeVisible()
})
```

- [ ] **Step 2: Run Threat/Control tests RED**

Run: `npm run test:run -- src/features/threats src/features/controls`  
Expected: FAIL because pages and filter state are missing.

- [ ] **Step 3: Implement URL-backed filters and responsive renderers**

Desktop `ControlMatrix` uses a semantic table with headers for node, threat, control, type, assurance, evidence, and reviewed date. Mobile `MobileControlRecords` renders the same fields in semantic definition lists. Selection and filter state survive language switching.

- [ ] **Step 4: Run Threat/Control tests GREEN**

Run: `npm run test:run -- src/features/threats src/features/controls`  
Expected: PASS for filters, empty-state clearing, matrix semantics, mobile records, and no score.

- [ ] **Step 5: Commit**

```bash
git add src/features/threats src/features/controls
git commit -m "feat: add SEC threat and control surfaces"
```

### Task 6: Implement Scenarios, Standards, and Methodology

**Files:**
- Create: `src/features/scenarios/ScenariosPage.tsx`, `ScenarioPicker.tsx`, `ScenarioTrace.tsx`, `scenario-state.ts`
- Create: `src/features/standards/StandardsPage.tsx`, `StandardsCrosswalk.tsx`
- Create: `src/features/methodology/MethodologyPage.tsx`
- Test: `src/features/scenarios/ScenariosPage.test.tsx`, `src/features/standards/StandardsPage.test.tsx`

**Interfaces:**
- Consumes: four scenarios, framework mappings, sources, and claim labels.
- Produces: validated `?scenario=coding-agent|remote-mcp|enterprise-research|local-autonomous` state.

- [ ] **Step 1: Write failing scenario and mapping tests**

```tsx
it('shows the remote MCP authority chain from a shareable URL', () => {
  renderAt('/en/scenarios?scenario=remote-mcp')
  expect(screen.getByRole('heading', { name: 'Remote MCP integration' })).toBeVisible()
  expect(screen.getByText(/audience-restricted token/i)).toBeVisible()
  expect(screen.getByText(/human decision/i)).toBeVisible()
})

it('labels synthesis mappings and rejects compliance language', () => {
  renderAt('/en/standards')
  expect(screen.getAllByText('Synthesis').length).toBeGreaterThan(0)
  expect(screen.getByText(/research aid, not compliance advice/i)).toBeVisible()
  expect(screen.queryByText(/certified|compliant score/i)).not.toBeInTheDocument()
})
```

- [ ] **Step 2: Run scenario/mapping tests RED**

Run: `npm run test:run -- src/features/scenarios src/features/standards`  
Expected: FAIL because pages are missing.

- [ ] **Step 3: Implement scenario tracing and standards disclosures**

Each scenario must show actors, boundary, authority chain, credential constraints, tools/data/actions, human decisions, expected proof, threats, controls, and one verification experiment. Mapping rows show framework/version, reference ID, SEC entity, mapping type, rationale, reviewed date, and source.

- [ ] **Step 4: Add methodology content and run tests GREEN**

Run: `npm run test:run -- src/features/scenarios src/features/standards src/features/methodology`  
Expected: PASS for all four scenario IDs, invalid-ID fallback, mapping labels, source links, and bilingual methodology.

- [ ] **Step 5: Commit**

```bash
git add src/features/scenarios src/features/standards src/features/methodology
git commit -m "feat: add SEC scenarios and standards crosswalk"
```

### Task 7: Apply the accepted visual system and responsive accessibility

**Files:**
- Create: `src/styles/tokens.css`, `global.css`, `shell.css`, `trust.css`, `matrix.css`, `responsive.css`
- Modify: `src/main.tsx`, shared components, and feature components for CSS hooks only
- Test: `tests/e2e/sec.spec.ts`, `tests/e2e/accessibility.spec.ts`, `playwright.config.ts`

**Interfaces:**
- Produces: cold-white/ink/cobalt/vermilion/verified-green token system, desktop trust-path/detail layout, and mobile vertical trace.

- [ ] **Step 1: Write failing browser acceptance**

```ts
test('mobile Trust Path has no horizontal overflow and 44px targets', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/en/trust-path')
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth)).toBe(390)
  for (const button of await page.getByRole('button', { name: /model|agent|identity|credential|authorization|tool|sandbox|data|action|audit|incident/i }).all()) {
    expect((await button.boundingBox())?.height).toBeGreaterThanOrEqual(44)
  }
})

test('primary routes have no serious axe violations', async ({ page }) => {
  await page.goto('/tr/controls')
  const results = await new AxeBuilder({ page }).analyze()
  expect(results.violations.filter((item) => ['serious', 'critical'].includes(item.impact ?? ''))).toEqual([])
})
```

- [ ] **Step 2: Run browser tests RED**

Run: `npm run build && npm run preview:start` then `npm run test:e2e`  
Expected: FAIL for missing styles/layout/browser configuration.

- [ ] **Step 3: Implement visual tokens and responsive layouts**

Import IBM Plex Sans and IBM Plex Mono locally through package assets. Use semantic borders and typography instead of decorative cards. At `max-width: 760px`, hide only the diagrammatic path connectors and render the full vertical trace; never hide content fields. Add focus-visible, reduced-motion, 200% zoom, selected, disabled, and empty states.

- [ ] **Step 4: Run component and browser acceptance GREEN**

Run: `npm run check && npm run test:e2e`  
Expected: PASS at 1440×1000, 1280×720, 768×1024, and 390×844 with clean console, keyboard operation, reduced motion, 200% zoom, and no horizontal overflow.

- [ ] **Step 5: Stop and commit**

```bash
npm run preview:stop
git add src/styles src package.json package-lock.json playwright.config.ts tests/e2e
git commit -m "feat: apply SEC forensic ledger interface"
```

### Task 8: Add static-host, artifact, CI, documentation, and release contracts

**Files:**
- Create: `public/staticwebapp.config.json`
- Create: `scripts/validate-artifact.mjs`, `scripts/stamp-release.mjs`
- Create: `.github/workflows/validate.yml`, `.github/workflows/deploy-swa-sec-aserdargun-com.yml`
- Create: `tests/e2e/routes.spec.ts`
- Create: `README.md`, `LICENSE`, `LICENSE-CONTENT`
- Modify: `package.json`

**Interfaces:**
- Produces: `dist/release.json` with `{ sha, builtAt, repository }`.
- Produces: prebuilt artifact deploy using `skip_app_build: true` and `output_location: ''`.

- [ ] **Step 1: Write failing artifact and route tests**

```js
assert.deepEqual(config.navigationFallback, { rewrite: '/index.html', exclude: ['/assets/*', '/*.json'] })
assert.equal(config.routes.find((route) => route.route === '/')?.redirect, '/en')
assert.equal(config.routes.find((route) => route.route === '/')?.statusCode, 301)
for (const header of ['Content-Security-Policy', 'Permissions-Policy', 'Referrer-Policy', 'X-Content-Type-Options', 'X-Frame-Options']) {
  assert.ok(config.globalHeaders[header])
}
```

- [ ] **Step 2: Run artifact checks RED**

Run: `npm run build && npm run artifact:check`  
Expected: FAIL because the SWA configuration/release file is missing.

- [ ] **Step 3: Implement static-host and release scripts**

The CSP permits only same-origin scripts/styles/fonts/images plus HTTPS external links; it must not enable unsafe inline scripts. `stamp-release.mjs` reads `GITHUB_SHA` or `git rev-parse HEAD`, rejects a non-40-character SHA in CI, and writes the release file after build. Artifact validation confirms representative route assets, hashed JS/CSS, config inclusion, and release JSON.

- [ ] **Step 4: Add workflows and public documentation**

`validate.yml` runs Node 22 setup, `npm ci`, Playwright install, `npm run validate:codex`. Deployment repeats validation, stamps the exact SHA, validates the artifact, and uses `Azure/static-web-apps-deploy` only with `app_location: dist`, `skip_app_build: true`, and the repository secret `AZURE_STATIC_WEB_APPS_API_TOKEN_SEC`.

- [ ] **Step 5: Run full local contract GREEN**

Run: `npm run validate:codex && git diff --check`  
Expected: content, types, lint, unit/component, build, artifact, browser, lifecycle, and whitespace checks all pass; port 4174 is free.

- [ ] **Step 6: Commit**

```bash
git add public scripts .github tests/e2e/routes.spec.ts README.md LICENSE LICENSE-CONTENT package.json package-lock.json
git commit -m "ci: add SEC release and Azure artifact contract"
```

### Task 9: Complete independent local verification and review

**Files:**
- Modify only files required by evidence-backed failures.

**Interfaces:**
- Consumes: all local scripts and tests.
- Produces: clean, stopped, release-ready local `main`.

- [ ] **Step 1: Exercise exact Setup**

Run: `npm ci && npx playwright install chromium`  
Expected: Node 22-compatible locked install and available Chromium.

- [ ] **Step 2: Exercise exact Validate**

Run: `npm run validate:codex`  
Expected: every planned check passes and output reports deterministic counts.

- [ ] **Step 3: Exercise exact Run and rendered workflows**

Run: `npm run preview:start`, verify `http://127.0.0.1:4174/en`, EN/TR Trust Path, filters, scenario, standards, 404, console, responsive matrix, and source links.

- [ ] **Step 4: Exercise exact Stop and Git checks**

Run: `npm run preview:stop && lsof -nP -iTCP:4174 -sTCP:LISTEN`  
Expected: Stop succeeds and lsof prints no listener.

Run: `git diff --check && git status --short --branch && git log --oneline --decorate -8`  
Expected: clean `main` with only reviewed commits.

- [ ] **Step 5: Commit fixes if required**

```bash
git add -p
git commit -m "fix: close SEC release acceptance gaps"
```

Omit this commit when verification required no fixes.

### Task 10: Publish the verified revision to GitHub and Azure generated hostname

**Files:**
- External: GitHub repository, Actions secrets/workflows, Azure resource group/SWA.

**Interfaces:**
- Consumes: clean local `main` and exact HEAD SHA.
- Produces: public `aserdargun/sec-aserdargun-com`, passing Actions, Free SWA generated hostname at the same SHA.

- [ ] **Step 1: Recheck external identities and target absence**

Run: `gh auth status`, `gh repo view aserdargun/sec-aserdargun-com`, `az account show --subscription 'aserdargun subscription 2'`, and resource-name queries.  
Expected: active GitHub owner `aserdargun`, enabled target subscription, and no conflicting repo/resource.

- [ ] **Step 2: Create public GitHub repository and push exact main**

Run: `gh repo create aserdargun/sec-aserdargun-com --public --source=. --remote=origin --push`  
Expected: public repository with `main` tracking `origin/main` at local HEAD.

- [ ] **Step 3: Verify validation Actions and remote ancestry**

Run: `gh run list --branch main`, inspect the exact run, and compare local/remote SHA.  
Expected: validation success and zero ahead/behind divergence.

- [ ] **Step 4: Create Azure Free resources**

Run Azure CLI against subscription ID/name explicitly to create `rg-sec-aserdargun-com` in West Europe and `swa-sec-aserdargun-com` Free linked to GitHub `main`, without changing the default CLI subscription globally.  
Expected: generated hostname and deployment token returned through secure CLI output handling.

- [ ] **Step 5: Store deploy token and trigger deployment**

Store only the Azure deployment token as GitHub Actions secret `AZURE_STATIC_WEB_APPS_API_TOKEN_SEC`; never print or commit it. Trigger/re-run the deployment workflow for exact `main` SHA.

- [ ] **Step 6: Verify generated host**

Check Azure status, release JSON SHA, `/` 301, representative EN/TR deep routes, JS/CSS MIME, security headers, desktop/mobile browser workflows, console, and Git cleanliness.  
Expected: Azure generated hostname serves the exact verified SHA with no browser errors.

### Task 11: Bind and verify `sec.aserdargun.com`

**Files:**
- External: Azure custom domain and IHS DNS records.

**Interfaces:**
- Consumes: generated Azure hostname and Azure validation token.
- Produces: authoritative/public DNS, Azure Ready, TLS, and HTTPS convergence for `sec.aserdargun.com`.

- [ ] **Step 1: Request domain validation and resolve exact records**

Obtain the Azure TXT validation token without persisting it in files. Prepare exactly:

```text
TXT host:  _dnsauth.sec
TXT value: the non-redacted `validationToken` returned by Azure for `sec.aserdargun.com`, shown only at action time
CNAME host: sec
CNAME value: the exact `defaultHostname` returned by `az staticwebapp show` for `swa-sec-aserdargun-com`, shown at action time
```

- [ ] **Step 2: Obtain action-time confirmation**

Show the real host/value pairs to the user immediately before the IHS writes. Do not proceed on a generic earlier approval.

- [ ] **Step 3: Add TXT first and verify ownership**

Use IHS DNS UI, read back the record, query both authoritative IHS nameservers and a public resolver, and begin Azure validation. Preserve the correct token while propagation converges.

- [ ] **Step 4: Add CNAME second and complete binding**

Add `sec` pointing only to the generated hostname, with no scheme/path. Verify readback, authoritative/public DNS, and Azure terminal `Ready`.

- [ ] **Step 5: Verify production domain**

Check TLS SAN `DNS:sec.aserdargun.com`, HTTPS redirects/routes, release SHA, assets/MIME, security headers, EN/TR desktop/mobile workflows, clean console, and Git state.

### Task 12: Integrate and publish SEC in the root Living AI Memory system

**Files:**
- Modify in `/Users/aserdargun/Documents/ChatGPT/aserdargun-com`: `data/living-system.json`, generator/templates/styles/tests identified by repository search, generated `index.html` and `tr/index.html`, `README.md`, asset version references.
- Test: existing root data, render, navigation, site, server, and full validation suites.

**Interfaces:**
- Consumes: verified public SEC repo/domain and current root canonical data/generator.
- Produces: live bilingual application row and HNS → SEC → LCL/CLD structural topology.

- [ ] **Step 1: Recheck root repository and write RED topology tests**

Confirm clean current `main`, fetch, and stop if remote advanced unexpectedly. Add assertions that canonical applications contain live `sec`, desktop SVG contains `hns-to-sec`, `sec-to-lcl`, and `sec-to-cld`, accessible study order contains SEC as its own trust stage, and LCL/CLD remain grouped as parallel targets.

- [ ] **Step 2: Run targeted root tests RED**

Run: `npm run test:data`, render tests, navigation tests, and `npm run validate:site`.  
Expected: FAIL because SEC data/topology is absent.

- [ ] **Step 3: Update canonical data and structural generator**

Add bilingual live `sec` data with repository `https://github.com/aserdargun/sec-aserdargun-com`, address `https://sec.aserdargun.com/`, current verified date, empty `relatedMemoryIds`, `kind: observatory`, and `systemRole: core-learning`. Change descriptive copy and graph edges so SEC is the trust gate between HNS and both deployment paths. Preserve root privacy arrays and existing visual identity.

- [ ] **Step 4: Regenerate and run root validation GREEN**

Run: `npm run generate:site`, `npm run check:generated`, `npm run validate:site`, `npm run test:navigation`, and `npm test`.  
Expected: canonical/generated parity, HNS → SEC → LCL/CLD topology, grouped deployment stage, 44px targets, no retired projects, and full suite success.

- [ ] **Step 5: Run root browser and lifecycle acceptance**

Use the checkout-owned root preview on an available scoped port. Verify EN/TR application map, desktop/mobile Learning System, SEC links, 390×844 overflow, keyboard focus, console, and safe Stop.

- [ ] **Step 6: Commit, fetch, push, and verify root production**

Commit only SEC integration files, fetch before push, stop if `origin/main` advanced, push authorized `main`, verify Actions and Azure exact SHA, then verify live `aserdargun.com` desktop/mobile topology and SEC link. End with clean Git and no owned listeners.

---

## Final acceptance summary

- SEC local Setup/Run/Validate/Stop exercised exactly.
- Source-backed bilingual content and all seven routes verified.
- Desktop/mobile/keyboard/zoom/reduced-motion accessibility verified.
- Public GitHub repository and Actions verified at exact SHA.
- Azure West Europe Free generated host verified at exact SHA.
- Action-time-confirmed TXT/CNAME, authoritative/public DNS, Azure Ready, TLS SAN, HTTPS, assets, MIME, and headers verified.
- Root canonical map and structural Learning System integration released and verified.
- SEC and root Git worktrees clean; checkout-owned ports stopped.
