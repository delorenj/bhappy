# BHappy — Epics & Stories

**Author:** Otto (autopilot)
**Date:** 2026-05-05
**Companion:** `_bmad-output/prd.md`, `_bmad-output/architecture.md`

Three epics. Stories are sized for an autopilot single-session ship. Status reflects what Otto's run produces.

## Epic 1 — Foundation

### Story 1.1 — Tailwind v4 + theme tokens
Install `tailwindcss` and `@tailwindcss/vite`, mount the plugin in `vite.config.mts`, create `src/app/styles/app.css` with the `@theme` block from `architecture.md` Section 6, import it from `document.tsx`.
**Acceptance:** dev server renders any page with the warm canvas background and Outfit display font loading.

### Story 1.2 — Layout shell
Build `Layout.tsx` (server component) with a top nav (BHappy wordmark, /tiers link), a `<main>` slot, and a minimal footer.
**Acceptance:** every page wraps in `Layout`, nav is sticky, mobile-collapses cleanly below 768px.

### Story 1.3 — Landing page
Replace `pages/home.tsx` with a hero (asymmetric, no centered axis), a "What you'll learn" 4-tier overview row (zig-zag, not equal columns), and a single primary CTA pointing to `/tiers`.
**Acceptance:** hero copy reflects the BMAD bootcamp pitch from the BRAINDUMP, primary CTA navigates to `/tiers`.

## Epic 2 — Curriculum

### Story 2.1 — Tier content data file
Create `app/content/tiers.ts` exporting an ordered array of four tier objects: `{ slug, number, title, summary, primer, exercise, helpHint }`. Primer is multi-paragraph prose. Exercise is a structured spec (preconditions, steps, success check).
**Acceptance:** importing the file in any component returns four typed entries; slug values are `orient`, `operate`, `extend`, `author`.

### Story 2.2 — Tier index page
`pages/tiers.tsx` reads the content array, renders each tier as a `TierCard`. Each card shows: tier number, title, one-line summary, completion state (from progress provider), and a CTA to the detail page.
**Acceptance:** four cards visible in tier order. Locked tiers visually de-emphasized but still clickable (we don't gate; we hint).

### Story 2.3 — Tier detail page
`pages/tier-detail.tsx` resolves `:slug` against the content array, renders primer prose, the exercise spec block, the bmad-help callout, and the `MarkComplete` client island.
**Acceptance:** all four slugs render correctly. Unknown slug returns a 404 (or routes to /tiers).

### Story 2.4 — Tier 1 (Orient) primer + exercise
Write 2 to 3 minutes of primer prose covering BMAD install, `bmad-help`, agent-skill model. Write a Quick Flow exercise: scope a small CLI tool, run Quick Flow against it, end with a tech-spec artifact.

### Story 2.5 — Tier 2 (Operate) primer + exercise
Primer covers Analyst -> PM -> Architect -> Dev workflow, fresh-chat discipline, artifact lineage. Exercise: take a real small problem through the full workflow, ending with a merged story.

### Story 2.6 — Tier 3 (Extend) primer + exercise
Primer covers project-context, agent customization, skills architecture. Exercise: write a project-context file encoding team conventions and customize one agent.

### Story 2.7 — Tier 4 (Author) primer + exercise
Primer covers BMad Builder, module structure, workflow authoring, distribution. Exercise: ship a custom module with one workflow.

## Epic 3 — Progress

### Story 3.1 — Progress library
`lib/progress.ts` exports `loadProgress`, `saveProgress`, `markTierComplete`, `getTierStatus`. Pure functions, version-tagged stored object.
**Acceptance:** unit-style sanity check: round-trip a progress object through save -> load.

### Story 3.2 — Progress provider (client island)
`ProgressProvider.tsx` is a `"use client"` component. Hydrates from localStorage, exposes a context with `progress` and `markComplete(slug)`.
**Acceptance:** wrapping a tree in the provider gives children access to current progress without prop drilling.

### Story 3.3 — Mark Complete button
`MarkComplete.tsx` client island reads context, shows "Mark complete" if not complete, shows a friendly "Done!" state if complete. Idempotent.
**Acceptance:** clicking persists to localStorage; refreshing the page preserves the completed state.

### Story 3.4 — Progress widget on tier index
A small bar at the top of `/tiers` shows "X of 4 tiers complete" with a fill-bar. Reads from progress context.
**Acceptance:** completing a tier and navigating back to /tiers updates the bar without a manual refresh.

## Out-of-band — Design system

These aren't story-shaped; they're prerequisite artifacts already produced by Otto:

- `.stitch/DESIGN.md` — visual contract used to keep TSX components on-vibe.
- `.stitch/SITE.md` — page sitemap + roadmap for Stitch loop iterations if Jarad later wants to regenerate any page visually.
- `.stitch/next-prompt.md` — first baton, populated for the Stitch build loop.

## Cut from v1 (do not implement)

- Auth (signup, login, passkeys).
- Server-side progress / D1 schema.
- MDX content pipeline.
- Q&A / RAG chat panel.
- Cohort or social layer.
- Per-exercise sub-progress tracking. Tier-level only.
