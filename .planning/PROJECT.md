# behappy — BMAD Bootcamp

## What This Is

behappy is a public, self-serve interactive learning platform that takes
developers from "what's a PRD?" to "I just shipped a custom BMAD module" through
a scaffolded, four-tier curriculum. It's the BMAD bootcamp on the open
internet — anyone can sign up, work through the tiers at their own pace, and
self-attest to their progress.

## Core Value

A developer who has never used BMAD can sign up, complete Tier 1 (Orient), and
walk away with the BMAD loop clicking — they understand the agent–skill model,
fresh-chat discipline, and what an artifact is, because they shipped one.

## Requirements

### Validated

<!-- Shipped and confirmed valuable. -->

(None yet — ship to validate)

### Active

<!-- Current scope. Building toward these. -->

- [ ] Public landing page that pitches behappy in <4 seconds
- [ ] User can sign up and log in (passkeys primary, email fallback)
- [ ] User can browse the tier index and see the 4-tier curriculum at a glance
- [ ] Tier detail pages render MDX content for each of the 4 tiers
- [ ] Each tier has at least one exercise page with a guided walkthrough
- [ ] User can mark a tier complete (self-attestation) and see it on their profile
- [ ] User profile / dashboard shows per-tier completion state
- [ ] Tier 1 (Orient) content is fully written and shippable on launch
- [ ] Each tier surfaces a "Stuck? Run `bmad-help`" callout linking to canonical BMAD docs
- [ ] Sunshine-warm visual identity (peach/amber + deep navy, rounded shapes) applied across the app
- [ ] Production deploy on Cloudflare with a public URL

### Out of Scope

<!-- Explicit boundaries. Includes reasoning to prevent re-adding. -->

- In-app BMAD Q&A chat panel (RAG / Vectorize) — `bmad-help` ships with the framework; recreating it is duplicative and competes with the native workflow we want to reinforce
- Artifact uploads, automated grading, peer review — self-attestation is the v1 contract; anyone gaming a free bootcamp checkbox is only cheating themselves
- Cohorts, social layer, comments, leaderboards — v2 if behappy has legs
- Enterprise SSO — public consumer signup is the v1 audience
- "Learn BMAD by building behappy with BMAD" recursive bootstrapping — bootstrapping riddles are a vanity exercise; learners apply BMAD to their own work
- Multi-author / contributor PR workflow for content — solo-authored for v1, MDX structure leaves the door open
- Native mobile apps — responsive web only

## Context

- **Origin:** Internal need at TriumphABA to onboard a dev team to the BMAD method evolved into a public-facing product when the audience question was answered "public from day one."
- **BMAD landscape:** BMAD is a Diátaxis-structured methodology with agents, skills, workflows, and modules. The framework's `bmad-help` skill is itself the canonical pedagogy — behappy supplements it with scaffolded progression, not a replacement.
- **Curriculum spine:** Four tiers map to BMAD's natural skill progression — Orient (Quick Flow, agent-skill model), Operate (Analyst → PM → Architect → Dev), Extend (skills architecture, project-context, agent customization), Author (BMad Builder, custom modules, workflow authoring). The 5-week arc in BRAINDUMP.md is the reference pacing; tier-as-unit is the product structure.
- **Pedagogy stance:** Each tier follows the same shape — concept primer (MDX), guided exercise, self-attest gate. Learners apply BMAD to their own work; behappy doesn't simulate or sandbox.
- **Aesthetic stance:** "Sunshine, not McDonald's." Warm peach/amber palette grounded by deep navy, rounded shapes, friendly-not-childish. Naming ("behappy") is part of the product voice.

## Constraints

- **Tech stack:** RedwoodSDK on Cloudflare Workers — chosen by the founder; non-negotiable. Implies Vite plugin + React Server Components + server functions, routes in `src/worker.tsx`, no service soup.
- **Data layer:** Cloudflare D1 for user accounts and progress (assumed from RedwoodSDK + Workers affinity; revisit if wrong).
- **Auth:** Passkeys / WebAuthn primary with email fallback (RedwoodSDK has first-class WebAuthn support; passwords-only is rejected on principle).
- **Audience:** Public consumer from day one — no gating, no enterprise contracts, no SSO complexity.
- **Stack invisibility:** RedwoodSDK is a delivery mechanism. It must not leak into curriculum content, copy, or product surface. Learners never know what framework they're on, the same way Udemy users don't think about Angular.
- **Content authoring:** Solo-authored for v1 by the founder. MDX structure should leave a clean lane for future contributors but not solve for collaboration in v1.
- **Tier content:** Curriculum structure (4 tiers, ladder progression) is locked. Specific exercises and gates inside each tier can be refined.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Public from day one (vs. internal LMS) | Reframes product as a discoverable bootcamp, not an internal training tool; raises the bar on landing page and auth | — Pending |
| Self-attestation for completion (no grading) | Honest about what we are; keeps backend lean; aligns with the "use BMAD on your real work" pedagogy | — Pending |
| No in-app RAG / chat panel | `bmad-help` ships with the framework; recreating it is duplicative and competes with native workflow | — Pending |
| RedwoodSDK on Cloudflare for delivery | Founder choice; platform affinity, zero-egress data path, no fight-the-current architecture | — Pending |
| Passkeys primary auth | RedwoodSDK first-class WebAuthn support; passwords-only is unacceptable in 2026 | — Pending |
| Stack is invisible to learners | Curriculum is BMAD; framework choice must not leak into product surface | — Pending |
| Curriculum structure (4-tier ladder) is locked | The ladder IS the product; redesigning it would be redesigning behappy itself | — Pending |
| Drop "learn BMAD by building behappy with BMAD" | Bootstrapping riddle is a vanity exercise; learners apply BMAD to their own work | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-05-01 after initialization*
