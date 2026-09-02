# SEC — AI Systems Security Observatory

Date: 2026-09-02  
Status: Approved product, data, technical, visual, integration, and publication direction  
Repository target: `aserdargun/sec-aserdargun-com`  
Production target: `https://sec.aserdargun.com`  
Azure target: `aserdargun subscription 2`, West Europe, Static Web Apps Free

## 1. Product thesis

SEC is a public, bilingual, source-backed observatory for AI systems security. It is not a generic cybersecurity news site, an automated vulnerability scanner, a compliance certification product, or a vendor ranking.

Its permanent question is:

> HNS explains how to build an agent system. SEC explains why that system can be trusted and how the claim can be proved.

SEC follows delegated intent from the model and agent through identity, credentials, authorization, tools, sandbox, data, action, audit, and incident response. It makes the difference between a declared safeguard and an evidenced safeguard visible.

The product loop is:

> Map → Constrain → Enforce → Observe → Prove → Recover

The permanent trust path is:

```text
model → agent → identity → credential → authorization
      → tool → sandbox → data → action → audit → incident
```

The first release is centered on an interactive Trust Path and Scenario Workbench. Threats, controls, standards, and current research provide the evidence needed to interpret the path; they do not become disconnected documentation silos.

## 2. Position in the application system

HNS and SEC have a deliberate boundary:

| Product | Permanent question | Primary object |
|---|---|---|
| HNS — Harness Engineering Observatory | How is a reliable agent system constructed? | Harnesses, runtimes, orchestration, execution, verification, observability |
| SEC — AI Systems Security Observatory | Why should that system be trusted, and what proves the claim? | Identity, delegated authority, credentials, policy, tools, data, action, audit, incident |

SEC may cite or link to HNS concepts, but it must not duplicate HNS solution comparison, weekly harness intelligence, or harness-layer taxonomy.

The public Learning System topology becomes:

```text
AIA → GPU / LLM / USL → HNS → SEC → LCL / CLD
                                    ↓
                         evidence returns to AIA
```

SEC is a trust gate between an agent system and its local or cloud deployment decisions. It must be represented in both the canonical application map and the structural Learning System graph. A decorative card that does not change the topology is insufficient.

## 3. Audience and jobs

Primary audiences:

- AI, platform, and security engineers designing agent systems.
- Technical architects evaluating identity and delegated-authority boundaries.
- Researchers following agentic AI threats, controls, and standards.
- Technical leaders who need evidence and open questions rather than a false compliance badge.

Primary jobs:

1. Trace who or what authorized an agent action.
2. See which identity, credential, tool, data, and runtime boundaries the action crossed.
3. Distinguish declared, enforced, observed, and proven controls.
4. Map a threat to preventative, detective, containing, and recovery controls.
5. Inspect the source, review date, evidence type, and uncertainty behind a claim.
6. Compare security requirements across representative agent scenarios.
7. Understand how NIST, OWASP, MITRE ATLAS, MCP, OAuth/OIDC, and EU governance references relate without treating the crosswalk as legal certification.
8. Turn a security concern into a small, reproducible verification experiment.

## 4. Goals and non-goals

### Goals

- Publish a trustworthy bilingual baseline that can evolve through reviewed Git changes.
- Make identity, delegated authority, tool access, data access, action, audit, and recovery one connected system.
- Make control strength and evidence strength separate dimensions.
- Represent uncertainty and stale research explicitly.
- Provide an interactive, scenario-driven research tool rather than a passive article collection.
- Support dense desktop investigation and clear mobile tracing without horizontal overflow.
- Integrate the live SEC application into the canonical `aserdargun.com` map and Learning System topology.
- Publish the verified revision through public GitHub and Azure Static Web Apps Free.

### Non-goals for the first release

- No runtime scanning, penetration testing, secret scanning, exploit execution, or active probing of third-party systems.
- No account system, CMS, database, comments, analytics, tracking pixels, or form submission.
- No storage of credentials, API keys, incident records, or private system data.
- No automated claim publication or unreviewed machine-generated research.
- No universal security score, trust score, vendor score, or compliance score.
- No claim that a system is secure, compliant, certified, or legally sufficient.
- No duplicate HNS solution radar or general cybersecurity feed.
- No production API or Azure Functions in the first release.
- No Vercel configuration or deployment.

## 5. Information architecture and routes

English and Turkish share stable route slugs so language switching can preserve route and query state:

| Route | Purpose |
|---|---|
| `/:locale` | Current Security Brief, Trust Path overview, scenario entry points, and latest reviewed signals |
| `/:locale/trust-path` | Interactive model-to-incident trust path |
| `/:locale/threats` | Threat catalog mapped to trust nodes, controls, evidence, and standards |
| `/:locale/controls` | Control and assurance-evidence matrix |
| `/:locale/scenarios` | Scenario Workbench and shareable scenario state |
| `/:locale/standards` | Source-backed standards and framework crosswalk |
| `/:locale/methodology` | Evidence, synthesis, freshness, mapping, and editorial policies |

`locale` is `en` or `tr`. `/` permanently redirects to `/en`. A language switch preserves the current route and valid query state. The explicit language choice may be stored locally; it is not transmitted.

Unknown routes produce a localized 404 with links to the Security Brief and Trust Path.

## 6. First-release surfaces

### 6.1 Security Brief

The homepage opens on the research product rather than a marketing hero. The first viewport contains:

- Product identity and latest review cutoff.
- A concise synthesis headline.
- The Trust Path beginning, with the current focus node highlighted.
- One most-important development with evidence disclosure.
- Two or three watch signals.
- Direct entries into representative scenarios.
- The beginning of the control/evidence model so the real tool is visible immediately.

The brief distinguishes factual evidence, SEC synthesis, and incomplete watch signals. It is updated when meaningful changes occur; a forced weekly cadence is not required.

### 6.2 Trust Path

The Trust Path is the product's central interaction. Users move through:

1. Model
2. Agent
3. Identity
4. Credential
5. Authorization
6. Tool
7. Sandbox
8. Data
9. Action
10. Audit
11. Incident

Each node exposes:

- The boundary being crossed.
- The actor, asset, and delegated authority.
- Trust assumptions.
- Applicable threats.
- Preventative, detective, containing, and recovery controls.
- Required evidence.
- Related standards/framework references.
- Last reviewed date and source trail.

The path is not a security checklist that turns green when clicked. It is an evidence-oriented model that reveals missing or unknown proof.

### 6.3 Assurance levels

Control state uses four ordered but separate labels:

| Level | Meaning |
|---|---|
| Declared | A policy, design, or vendor statement says the safeguard exists. |
| Enforced | A technical or procedural mechanism applies the safeguard. |
| Observed | Telemetry or review shows the mechanism operating. |
| Proven | Repeatable evidence connects authorization, enforcement, action, and outcome. |

Unknown stays unknown. The UI never infers a stronger level from a weaker one, and it never collapses the levels into one numeric score.

### 6.4 Threat Map

Threats are classified across the trust path rather than presented as one flat Top 10 list. Initial families are:

- Instruction and goal integrity.
- Identity and credential abuse.
- Authorization and delegated-rights abuse.
- Tool and action misuse.
- Data, context, retrieval, and memory poisoning or disclosure.
- Runtime, sandbox, and code-execution failure.
- Agentic supply-chain compromise.
- Audit, accountability, and non-repudiation failure.
- Human-agent trust exploitation and approval failure.
- Cascading failure, containment, and recovery.

OWASP identifiers and MITRE ATLAS techniques are mappings, not replacements for the SEC taxonomy. A threat may affect several trust nodes and several controls.

### 6.5 Control Matrix

The Control Matrix aligns:

- Trust node.
- Threat.
- Control objective.
- Control type: prevent, detect, contain, recover.
- Assurance level.
- Required evidence.
- Source and review date.
- Applicable scenario.
- Framework/standard mappings.

Desktop uses an open, dense matrix with sticky contextual headers. Mobile uses compact records that preserve node, threat, control type, evidence, and assurance level without horizontal scrolling.

### 6.6 Scenario Workbench

The first release includes four source-backed representative scenarios:

1. Coding agent operating on a repository and terminal.
2. Remote MCP client/server integration using delegated authorization.
3. Enterprise research assistant accessing internal and external data.
4. Local autonomous agent using tools and a sandbox.

Users select a scenario and inspect the trust path in that context. Scenario state is shareable through validated URL parameters. The workbench shows:

- Actors and system boundary.
- Requested and delegated authority.
- Credentials and token constraints.
- Tools, data, and possible actions.
- Required human decision points.
- Expected logs and proof.
- Primary threats and control gaps.
- Verification experiment candidates.

The workbench does not ingest user infrastructure details or execute tests.

### 6.7 Standards Crosswalk

The crosswalk connects SEC concepts to current primary or authoritative references, including:

- NIST Trustworthy and Responsible AI 800-5.
- NIST AI Agent Standards Initiative.
- NIST/NCCoE software and AI agent identity and authorization work.
- OWASP Top 10 for Agentic Applications 2026.
- OWASP GenAI LLM Top 10 where directly relevant.
- MITRE ATLAS.
- Model Context Protocol authorization specification.
- OAuth 2.x, OIDC, token audience binding, sender-constrained tokens, and relevant identity standards where supported by authoritative references.
- EU AI Act sources for governance and enforcement context.

Each mapping records whether it is direct evidence or SEC synthesis. The crosswalk states clearly that it is a research aid, not compliance advice or certification.

## 7. Visual design specification

### Visual idea

The accepted direction is **forensic ledger × authorization trace**:

- Cold white research canvas rather than a dark hacker interface.
- Near-black ink for primary typography.
- Cobalt for identity, authorization, selection, and navigable flow.
- Restrained vermilion for threats, broken boundaries, and destructive potential.
- Green only for evidence that is actually verified.
- Fine rules, decision traces, signed-event marks, and compact ledger structures.
- Square to slightly rounded geometry.
- IBM Plex Sans for interface and body text; IBM Plex Mono for identities, scopes, claims, traces, and protocol values.

Accepted visual references:

- [`docs/design/sec-primary-desktop.png`](../../design/sec-primary-desktop.png)
- [`docs/design/sec-primary-mobile.png`](../../design/sec-primary-mobile.png)
- [`docs/design/sec-control-matrix-desktop.png`](../../design/sec-control-matrix-desktop.png)
- [`docs/design/implementation-inventory.md`](../../design/implementation-inventory.md)

### Starting tokens

| Token | Intended value |
|---|---|
| Canvas | `#F8FAFD` |
| Primary text | approximately `#101722` |
| Secondary text | approximately `#4B5668` |
| Authorization/interaction | approximately `#155EEF` |
| Threat | approximately `#C4321A` |
| Verified evidence | approximately `#16834A` |
| Rule | approximately `#D6DEE9` |
| Selected surface | approximately `#EEF4FF` |
| Warning surface | approximately `#FFF4ED` |
| Radius | 2–8px only where controls need it |
| Spacing | 4, 8, 12, 16, 24, 32, 48, 64px |

Token adjustments are permitted only to improve measured accessibility or the intended hierarchy.

### Composition

Desktop Trust Path uses a horizontally legible path overview with a synchronized detail ledger. The primary workflow must remain usable at 1280px without requiring page-level horizontal scrolling.

Mobile replaces the overview with a vertical trace. Each node is a full-width disclosure with a 44×44px minimum target. Threat, control, and evidence information remains available in the same reading order; the mobile design is not a reduced decorative diagram.

### Explicit exclusions

- No neon terminal, matrix rain, hooded-person imagery, skulls, padlocks as a generic visual language, or fear-driven copy.
- No marketing hero, KPI cards, bento grid, glassmorphism, glow, or decorative dashboard gauges.
- No single color-only status communication.
- No generic shield score or percentage-based trust meter.
- No mobile workflow whose primary interaction depends on horizontal scrolling.

## 8. Content and data contract

Human-editable content lives under `content/`. Bilingual strings live in the same logical record. Zod schemas validate content before tests and build.

### Core entities

#### Source

- Stable ID, title, publisher, URL.
- Publication date and checked date.
- Source kind and access state.
- Supersession relationship where applicable.
- Bilingual context summary.

#### Claim

- Stable ID and bilingual text.
- Kind: `evidence`, `synthesis`, or `watch-signal`.
- Source IDs and subject IDs.
- Review date and confidence explanation.
- Optional supersession relationship.

#### Trust node

- Stable ID and ordered position.
- Bilingual purpose and boundary definition.
- Actors, assets, assumptions, and expected evidence.
- Threat, control, scenario, and source references.

#### Threat

- Stable ID and bilingual definition.
- Threat family and affected trust nodes.
- Preconditions, mechanism, consequence, and observable signals.
- Control and framework mappings.
- Evidence and review date.

#### Control

- Stable ID and bilingual objective.
- Control type: prevent, detect, contain, recover.
- Applicable trust nodes and threats.
- Implementation considerations and trade-offs.
- Required evidence and assurance-level guidance.
- Source and framework mappings.

#### Scenario

- Stable ID and bilingual narrative.
- Actors, system boundary, authority chain, tools, data, and actions.
- Required human decisions.
- Threat, control, and evidence references.
- Verification experiment candidate.

#### Framework mapping

- Framework, version/date, reference identifier, and source.
- SEC entity IDs.
- Mapping type: direct, partial, or synthesis.
- Bilingual rationale and review date.

#### Research snapshot

- Cutoff date and headline.
- Most-important evidence and current watch signals.
- Material mapping or threat changes.
- Correction notes.

## 9. Evidence, freshness, and editorial policy

Visible claims use three labels:

- **Evidence / Kanıt:** directly supported by cited sources.
- **Synthesis / Sentez:** an SEC interpretation derived from named evidence.
- **Watch signal / Takip sinyali:** an incomplete or emerging development that requires monitoring.

Primary and authoritative sources are preferred for specifications, standards, threat frameworks, and regulatory status. Vendor claims may document a vendor's stated capability but cannot silently become independent proof that the capability is effective.

Every record has an explicit review date. Stale records remain visible with a review-required state. Temporarily inaccessible sources are marked unavailable; dependent claims lose freshness without deleting history.

Corrections are appended visibly. A source or specification version change creates a supersession relationship rather than silently erasing the earlier state.

## 10. Baseline source policy

The first production baseline must live-check and record current authoritative sources. The approved starting set includes:

- NIST AI 800-5: <https://www.nist.gov/publications/summary-analysis-responses-request-information-regarding-security-considerations-ai>
- NIST AI Agent Standards Initiative: <https://www.nist.gov/artificial-intelligence/ai-agent-standards-initiative>
- NIST/NCCoE Agent Identity and Authorization: <https://www.nccoe.nist.gov/projects/software-and-ai-agent-identity-and-authorization>
- NIST identity analysis, 2026-08-27: <https://www.nist.gov/blogs/cybersecurity-insights/back-future-why-agentic-ai-needs-strong-identity-foundation>
- MCP 2026-07-28 release/specification: <https://blog.modelcontextprotocol.io/posts/2026-07-28/>
- OWASP Top 10 for Agentic Applications 2026: <https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/>
- MITRE ATLAS: <https://atlas.mitre.org/>
- EU AI Act Service Desk enforcement timeline: <https://ai-act-service-desk.ec.europa.eu/en/ai-act/faq/when-does-enforcement-start>

The design document and prior shared conversation are not themselves production evidence. Content enters the application only after current live verification.

## 11. Component architecture and state

The React application is composed from focused modules:

- `AppShell`, `GlobalHeader`, `PrimaryNavigation`, `LanguageSwitch`.
- `SecurityBrief`, `ResearchCutoff`, `SignalRail`.
- `TrustPath`, `TrustNode`, `TrustNodeDetail`, `MobileTrustTrace`.
- `AssuranceLevel`, `EvidenceKind`, `FreshnessState`.
- `ThreatToolbar`, `ThreatIndex`, `ThreatDetail`.
- `ControlToolbar`, `ControlMatrix`, `MobileControlRecord`.
- `ScenarioPicker`, `ScenarioBoundary`, `ScenarioTrace`, `ExperimentCandidate`.
- `StandardsCrosswalk`, `FrameworkMappingDisclosure`.
- `SourceLink`, `SourceList`, `ClaimDisclosure`.
- `MethodologySection`, `LocalizedNotFound`.

Static content is bundled. The application does not need a global loading spinner.

Shareable filters and scenario selection use validated URL state. Language switching retains the current route and valid state. Invalid parameters are ignored safely, surfaced as a localized explanation when useful, and never crash the page.

## 12. Technical architecture

- React, Vite, TypeScript, and React Router.
- Node.js 22 and locked npm dependencies.
- Static structured content compiled into the application bundle.
- Zod schemas for fail-closed validation.
- Vitest and Testing Library for model, utility, and component behavior.
- Playwright and axe for bilingual desktop/mobile interaction and accessibility.
- Azure Static Web Apps configuration for fallback, redirects, MIME, and security headers.
- No runtime API, database, authentication, secret, or environment-specific research dependency.

The build pipeline is:

```text
content → schema/reference/source-policy validation
        → locale projection → tests → Vite build
        → artifact validation → release stamp → Azure upload
```

## 13. Local Codex contract

The repository includes `.codex/environments/environment.toml` with ordered Setup, Run, Validate, and Stop actions.

- Setup uses the lockfile and installs the local Playwright Chromium dependency.
- Run binds only to `127.0.0.1:4174`, with strict port ownership and no automatic fallback.
- Validate runs content checks, typecheck, lint, component tests, production build, artifact checks, browser acceptance, and `git diff --check`.
- Stop is idempotent and refuses to stop any listener not owned by this checkout.

The complete exact actions are exercised locally. The development server is stopped before handoff unless the user asks to keep it running.

## 14. Accessibility and responsive behavior

- WCAG 2.2 AA contrast and keyboard behavior are acceptance requirements.
- Semantic landmarks, headings, lists, tables, and disclosures are preserved.
- Color is never the sole signal for threat, control type, assurance, or evidence.
- All interactive targets are at least 44×44px on mobile.
- Focus-visible treatment remains clear on selected and threat surfaces.
- Desktop matrices retain accessible header and row relationships.
- Mobile primary workflows have no horizontal overflow at 390px.
- 200% zoom preserves content and controls.
- Motion is restrained and reduced or removed under `prefers-reduced-motion`.
- Trust-path meaning is available as structured text; it does not depend on reading an SVG visually.

## 15. Privacy and security

- No authentication, analytics, trackers, comments, or submissions.
- No user infrastructure data leaves the browser.
- No credential, token, or secret input fields.
- External links use safe opener/referrer behavior.
- No untrusted HTML is rendered without sanitization.
- The static host uses a restrictive Content Security Policy, Referrer-Policy, Permissions-Policy, X-Content-Type-Options, and clickjacking protection compatible with the application.
- Source URLs and content data are validated fail-closed during build.

## 16. Failure and empty states

- Missing translation: content validation fails.
- Missing or invalid source reference: content validation fails.
- Evidence claim without a source: content validation fails.
- Invalid trust-path order or dangling threat/control relationship: content validation fails.
- Unsupported framework version: mapping is marked superseded or review-required.
- Temporarily unavailable source: the source remains visible and dependent freshness changes.
- Empty filter result: explain the result and provide a clear-filters action.
- Invalid scenario URL state: retain valid values, identify ignored values, and never crash.
- Unknown assurance evidence: show unknown, never infer a negative or positive score.
- Unknown route: localized 404 with recovery links.

## 17. Repository and GitHub delivery

The repository is public:

- Owner/name: `aserdargun/sec-aserdargun-com`.
- Default branch: `main`.
- Code license: MIT.
- Original research/design content license: CC BY 4.0.
- Validation workflow is separate from deployment workflow.
- Branch protection is not required for the first release.

The deployment workflow validates the exact revision, builds the static artifact, runs browser acceptance against that artifact, stamps `dist/release.json`, and uploads only the prebuilt `dist/` directory with `skip_app_build: true`.

## 18. Azure and custom-domain delivery

Azure target:

- Subscription: `aserdargun subscription 2`.
- Region: West Europe.
- Resource group: `rg-sec-aserdargun-com`.
- Static Web App: `swa-sec-aserdargun-com`.
- Plan: Free.
- Production branch: `main`.
- Custom domain: `sec.aserdargun.com`.

The release order is:

1. Complete local verification and commit.
2. Create the public GitHub repository and push `main`.
3. Verify validation CI on the exact SHA.
4. Create the Azure resource group and Free Static Web App.
5. Configure the repository deployment secret and workflow.
6. Verify the exact SHA on the generated Azure hostname.
7. Request the Azure custom-domain validation token.
8. Present the exact zone-relative `_dnsauth.sec` TXT host/value and obtain action-time confirmation.
9. Add and verify TXT ownership through IHS.
10. Add `sec` CNAME pointing only to the generated Azure hostname.
11. Complete Azure domain binding and wait for `Ready`.
12. Verify authoritative and public DNS, TLS SAN, HTTPS, routes, assets, MIME, security headers, and browser behavior.

Correct TXT/CNAME records are preserved while Azure or DNS propagation is in progress. Propagation is not a reason to regenerate the token or create duplicate records.

## 19. Root-site integration

The live application is added to `/Users/aserdargun/Documents/ChatGPT/aserdargun-com` only after SEC production readiness is proven.

Required changes:

- Add the live bilingual `sec` record to `data/living-system.json`.
- Keep public-memory arrays and `relatedMemoryIds` unchanged unless separately authorized.
- Update the Learning System topology from HNS directly informing deployment to `HNS → SEC → LCL / CLD`.
- Add the Trust stage to desktop SVG, mobile accessible alternative, study order, descriptive copy, and both locales.
- Preserve LCL and CLD as parallel deployment choices in one logical stage.
- Preserve minimum 44px mobile targets and the approved industrial/ASCII root-site identity.
- Regenerate deterministic EN/TR output and update validator expectations together.
- Run root-site generation, generated-output checks, site validation, navigation tests, full tests, browser QA, and safe stop.
- Commit, push, deploy, and verify the root-site exact SHA so the public map and topology match the newly live SEC app.

## 20. Verification and acceptance

### Automated SEC acceptance

- All structured content passes schemas and reference checks.
- Every bilingual production record is complete.
- Trust-path order is complete and unique.
- Threat/control/scenario/framework references resolve.
- Evidence/synthesis/watch-signal policy is enforced.
- Production build and artifact checks pass.
- Core Trust Path, threat filtering, control filtering, scenario selection, URL state, language switching, source disclosure, and 404 behavior pass.
- Accessibility scans report no serious or critical violations in primary routes.

### Rendered SEC browser acceptance

- Desktop: 1440×1000 and 1280×720.
- Tablet: 768×1024.
- Mobile: 390×844.
- Additional checks: keyboard-only, 200% zoom, and reduced motion.
- No horizontal overflow, clipped primary content, inert control, console error, or placeholder content.
- Primary Trust Path and scenario workflows work in English and Turkish.
- External source links and internal deep routes behave correctly.

### Publication acceptance

- Local, GitHub `main`, GitHub Actions, Azure release stamp, and production content identify the same SHA.
- Azure Static Web App and custom domain reach terminal `Ready` state.
- IHS readback, both authoritative nameservers, and a public resolver agree.
- TLS certificate SAN includes `DNS:sec.aserdargun.com`.
- `/` redirects permanently to `/en`; representative EN/TR routes return 200.
- JavaScript and CSS return correct MIME types.
- Security headers are present and compatible with the application.
- Production desktop and mobile interactions pass with a clean console.
- SEC and root repositories finish clean and synchronized with their remotes.
- Checkout-owned local ports are stopped.

### Root-site acceptance

- `sec` appears in the canonical application map in both languages.
- The structural topology is HNS → SEC → LCL/CLD, not a decorative addition.
- LCL/CLD remain parallel deployment choices.
- Generated output matches canonical data.
- Desktop and mobile Learning System rendering remains accessible and overflow-free.
- Root production links resolve to the verified SEC custom domain.

## 21. Delivery stages

### Stage 1 — product implementation and local acceptance

- Scaffold and implement SEC.
- Add validated bilingual baseline content.
- Implement local Setup/Run/Validate/Stop.
- Complete automated and rendered local acceptance.

### Stage 2 — GitHub and Azure generated-host publication

- Commit verified implementation to local `main`.
- Create public GitHub repository and push.
- Verify CI and exact remote SHA.
- Create and deploy West Europe Free Azure Static Web App.
- Verify generated-host production behavior.

### Stage 3 — custom domain

- Obtain exact Azure validation data.
- Present exact TXT/CNAME records and obtain action-time confirmation.
- Publish through IHS using TXT first and CNAME second.
- Verify DNS, Azure, TLS, HTTPS, assets, headers, and browser behavior.

### Stage 4 — root-system integration

- Add live SEC to canonical data and Learning System topology.
- Regenerate, test, commit, push, deploy, and verify `aserdargun.com`.

Vercel is excluded from every stage.

## 22. Approved decisions

- Product identity: SEC — AI Systems Security Observatory.
- Permanent distinction: HNS builds the agent system; SEC proves its trust boundary.
- Product loop: Map → Constrain → Enforce → Observe → Prove → Recover.
- Core model: model → agent → identity → credential → authorization → tool → sandbox → data → action → audit → incident.
- Core interaction: Trust Path plus Scenario Workbench.
- Assurance model: Declared, Enforced, Observed, Proven; no aggregate score.
- Threat and standards modules support the Trust Path rather than defining a news dashboard or compliance product.
- Bilingual Turkish/English, static-first, Git-managed architecture.
- Evidence, synthesis, and watch signals remain distinct.
- Visual identity: forensic ledger × authorization trace.
- Public GitHub, Azure Static Web Apps Free, and `sec.aserdargun.com` are in scope.
- SEC is integrated into the root canonical application map and Learning System topology after production readiness.
- DNS uses an action-time-confirmed TXT-first/CNAME-second process.
- No backend, account, analytics, active scanning, compliance guarantee, or Vercel.
