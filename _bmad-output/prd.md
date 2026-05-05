# BHappy — Product Requirements

**Author:** Otto (autopilot, on behalf of Jarad)
**Date:** 2026-05-05
**Status:** v1 cut for ship
**Source brief:** `/BRAINDUMP.md`

## 1. Problem

BMAD is a methodology framework with strong mental ergonomics once you've internalized it, but cold-start adoption hurts. The official docs are encyclopedic Diataxis-style reference material. No scaffolded entry path exists for an engineer who can spare an hour, not a weekend, to "get it." Teams that try to roll BMAD out via Notion docs or recorded calls churn through the framework once and never come back.

## 2. Vision

A public, hosted bootcamp web app that progresses learners across four tiers in a known order, with each tier framed as a short concept primer plus a real exercise the learner runs against their own codebase. Self-attest completion. No certificates, no grading, no Q&A panel (BMAD ships its own help skill). The product is the curriculum delivery mechanism, nothing more.

## 3. Audience

- Primary: the seven engineers on Jarad's team at TriumphABA who need to get fluent in BMAD.
- Secondary: anyone who lands on the public URL from a tweet or community link.
- Non-audience: enterprise rollouts, SSO buyers, anyone wanting a credential.

## 4. Outcomes & Success Criteria

| Outcome | Signal | Bar |
| --- | --- | --- |
| Cohort completes Tier 1 | localStorage progress entries | 5 of 7 within first week |
| Cohort completes Tier 2 | localStorage progress entries | 5 of 7 within two weeks |
| App stays up | Cloudflare Worker error rate | < 1% over launch window |
| Pedagogy lands | Qualitative team feedback | "I get it now" from majority |

Success is binary at this scale. Either the team groks BMAD, or they don't. The app is the lever.

## 5. Curriculum (4 Tiers)

The four tiers map directly to BMAD's natural learning gravity well. They are ordered, not modular.

### Tier 1 — Orient
Install BMAD, learn `bmad-help`, understand the agent-skill model, ship one tiny artifact via Quick Flow. Outcome: the learner has run the loop end-to-end on a throwaway problem.

### Tier 2 — Operate
Run the Full Method track on a real (small) project: Analyst -> PM -> Architect -> Dev. Outcome: the learner has produced a PRD, an architecture document, and a merged PR tied to a story ID.

### Tier 3 — Extend
Customize BMAD to team conventions. Write a `project-context.md`, customize an agent, learn skill architecture. Outcome: a reusable team configuration that another teammate could adopt.

### Tier 4 — Author
Use the BMad Builder to ship a custom module with one or two original workflows. Outcome: an installable module pushed to a shared registry.

Each tier on the site contains:
- A 2 to 3 minute concept primer (prose, no embeds).
- A guided exercise spec (the "do this against your own codebase" instruction).
- A self-attest "Mark complete" control with localStorage persistence.
- A "Stuck? run `bmad-help` in your IDE" callout.

## 6. In Scope (v1)

- Public landing page with the pitch.
- Tier index page with progress visualization.
- Four tier detail pages with primer + exercise + mark-complete.
- Client-side progress persistence (localStorage; no server, no auth).
- A consistent visual identity per the DESIGN.md.

## 7. Out of Scope (v1)

These were considered and explicitly cut:

- Authentication of any kind. Anyone can mark anything done; we are not in the credentialing business.
- Server-side progress, cohort views, social features.
- Artifact upload or grading pipeline.
- In-app Q&A / RAG panel. BMAD ships `bmad-help` for that exact purpose.
- MDX content pipeline. Content lives in TSX components for v1; if we ever need writers other than engineers to edit it, we revisit.
- Marketing surface beyond a single landing page.

## 8. Constraints

- Stack is fixed: RedwoodSDK on Cloudflare Workers, deployed via Wrangler. The framework choice is invisible to the learner.
- Effort budget: S to M. This is a 7-person internal cohort, not a public product launch.
- No long-tail maintenance commitment. Longevity is explicitly not a goal.

## 9. Risks & Mitigations

| Risk | Mitigation |
| --- | --- |
| Self-attest is too soft, nobody finishes | Cohort is small enough that Jarad can nudge in person |
| Cloudflare Worker free tier limits | Static-shaped app, near-zero compute per request |
| Content rots when BMAD updates | Tiers link out to canonical docs; primer content stays at "spirit of" level |
| Aesthetic feels childish | Taste-design constraints (anti-Inter, no neon, no emojis) keep it premium-warm not Comic-Sans-warm |

## 10. Trigger to Ship

A pushable build of the app exists (npm run build green) with all four tier pages populated and progress tracking working. Jarad eyeballs it, deploys to Cloudflare via `npm run release`, drops the URL into the team channel.
