# Project memory

## Product intent & audience

- User is managing a Bolt-hosted site and intends to rename the published `.bolt.host` subdomain to `kencana-lawang`, suggesting "Kencana Lawang" may be the intended project or brand name.

## Brand personality & voice

- User communicates in Indonesian; respond in Indonesian unless the user switches languages.

## Visual design & UX direction

- Not yet inferred from this turn.

## Decisions, constraints & rationale

- Framework: Vite + React.
- Platform: Bolt hosting; subdomain rename is possible via Publish / domain edit, but old URL does not redirect to the new one.
- Desired subdomain: `kencana-lawang.bolt.host`; fallback if taken may include suffixes (e.g., `-2026`).

## Open questions & assumptions

- "Kencana Lawang" is assumed to be the intended site/brand name; confirm if it should appear in UI text or branding.
- No custom domain currently connected; user may later want a non-`.bolt.host` domain.
- Visual design direction not yet established.