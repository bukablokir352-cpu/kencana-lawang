# Project memory

## Product intent & audience

- User is managing a Bolt-hosted site and intends to rename the published `.bolt.host` subdomain to `kencana-lawang`, suggesting "Kencana Lawang" may be the intended project or brand name.
- The site links out to "SIKENCANA", a separate dashboard application hosted on Netlify (not the Bolt site itself).

## Brand personality & voice

- User communicates in Indonesian; respond in Indonesian unless the user switches languages.

## Visual design & UX direction

- Homepage has two prominent side-by-side buttons:
  - Red "Download Profil PDF" button.
  - Green "Buka Dashboard SIKENCANA" button — opens `https://gerakan-kencana-lawang.netlify.app` in a new tab.
- Green/red color pairing used for primary call-to-action buttons on the front page.

## Decisions, constraints & rationale

- Framework: Vite + React.
- Platform: Bolt hosting; subdomain rename is possible via Publish / domain edit, but old URL does not redirect to the new one.
- Desired subdomain: `kencana-lawang.bolt.host`; fallback if taken may include suffixes (e.g., `-2026`).
- SIKENCANA dashboard URL fixed at `https://gerakan-kencana-lawang.netlify.app`; user reconfirmed it matches the currently deployed button link, no change needed.

## Open questions & assumptions

- "Kencana Lawang" is assumed to be the intended site/brand name; confirm if it should appear in UI text or branding.
- No custom domain currently connected; user may later want a non-`.bolt.host` domain.
- SIKENCANA dashboard is external/hosted separately on Netlify; its content is outside this Bolt project's scope.
- Visual design direction beyond the two homepage buttons not yet established.