# SEC visual implementation inventory

The accepted visual references are:

- `sec-primary-desktop.png` — 1505×1045 primary Trust Path screen.
- `sec-primary-mobile.png` — 853×1844 mobile vertical trust trace.
- `sec-control-matrix-desktop.png` — 1505×1045 Control Matrix and synchronized detail ledger.

## Color and surface lock

- Canvas is cold near-white `#F8FAFD`; it is not cream, beige, or warm gray.
- Primary ink is `#101722`; secondary copy is `#4B5668`.
- Selection, navigation, focus, and authorization use `#155EEF`.
- Threats use restrained `#C4321A`.
- Green `#16834A` is reserved for proven/verified evidence.
- Rules use `#D6DEE9`; selected rows use `#EEF4FF`.
- There are no gradients, glows, tinted image overlays, or decorative shadows.

## Typography

- Interface/body: IBM Plex Sans, 400/500/600.
- Trace identifiers, protocol values, sources, and evidence records: IBM Plex Mono, 400/500.
- Desktop H1: approximately 44px/1.08; mobile H1: approximately 42px/1.08.
- Body: 16–18px/1.5; control/table chrome: 13–15px/1.35.
- Controls never use browser-default typography.

## Container model

- One quiet header with a bottom rule.
- Open research canvas; no page-sized rounded wrapper.
- Trust Path uses a connected ordered trace plus one synchronized ledger inspector.
- Control Matrix uses one semantic table plus one synchronized ledger inspector.
- Supporting content uses open rails, rows, and fine rules—not card grids.
- Corners are square to 4px except focus/control affordances up to 6px.

## Allowed primary-screen copy

- Brand: `SEC`, `AI Systems Security Observatory`.
- Navigation: `Brief`, `Trust Path`, `Threats`, `Controls`, `Scenarios`, `Standards`, `Methodology`.
- Language control: `TR / EN`.
- H1: `Trust is a chain of evidence.`
- Supporting sentence: `Trace delegated intent from model capability to auditable action.`
- Review line: `Reviewed 02 Sep 2026`.
- Trust nodes: `Model`, `Agent`, `Identity`, `Credential`, `Authorization`, `Tool`, `Sandbox`, `Data`, `Action`, `Audit`, `Incident`.
- Detail: `Boundary`, `Delegated authority`, `Threats`, `Controls`, `Required evidence`, `Assurance`.
- Assurance: `Declared`, `Enforced`, `Observed`, `Proven`.
- Evidence tabs: `Evidence`, `Synthesis`, `Watch signal`.

No eyebrow, kicker, pretitle, badge, KPI, aggregate score, marketing CTA, or invented proof statement may be added above the fold.

## Interaction inventory

- Header navigation: text links with cobalt active underline.
- Language switch: compact bordered link/control.
- Trust nodes: semantic ordered-list buttons; selected node has cobalt rule/focus and updates URL state.
- Desktop inspector: synchronized with selected node; close/next/previous controls only where useful.
- Mobile trace: 44px minimum full-width disclosure rows; the selected row expands inline.
- Evidence source link: outline external-link icon, 1.5px stroke, `currentColor`.
- Disclosure chevron: outline SVG, 1.5px stroke, square cap/rounded join.
- Assurance symbols: minus for declared/not proven, check for enforced, eye for observed, filled green check for proven.
- Matrix headers: sortable only when sorting is implemented; never show inert arrows.
- Filters: real `<select>` or button groups with URL-backed state and visible focus.

## Responsive continuation

- At widths above 960px, Trust Path/Matrix occupy roughly two thirds and the ledger inspector one third.
- At 761–960px, inspector moves below the primary region while table/trace remains usable.
- At 760px and below, the horizontal path and matrix table are replaced by full-content mobile records.
- No required information is hidden on mobile.
- At 390px and 200% zoom, document width equals viewport width and every interactive target remains at least 44px high.

## Motion

- Cobalt selection line and detail disclosure may transition in 120–160ms.
- No looping decoration or parallax.
- `prefers-reduced-motion: reduce` removes non-essential transitions.

## Intentional concept normalization

- Generated concept URLs, fake trace IDs, timestamps, and sample evidence rows are compositional references only; production content comes from the validated catalog.
- The generated desktop concept shows an extra standalone link control in the header; implementation may omit it because it has no approved product function.
- The mobile generated canvas is taller than a physical 390×844 viewport to show continuation; implementation preserves the same reading order through normal vertical scrolling.
