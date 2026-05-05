# BHappy — Architecture

**Author:** Otto (autopilot)
**Date:** 2026-05-05
**Status:** v1
**Companion:** `_bmad-output/prd.md`

## 1. Stack Summary

| Layer | Choice | Rationale |
| --- | --- | --- |
| Framework | RedwoodSDK 1.2.x (Vite 7 + React 19 RSC) | Already chosen by Jarad; zero-magic happy-path semantics |
| Runtime | Cloudflare Workers (Wrangler) | Already wired in `wrangler.jsonc`; cheap, global, fast cold start |
| Styling | Tailwind CSS v4 + `@tailwindcss/vite` | First-class theme tokens via `@theme`, zero-config v4 ergonomics |
| Persistence (v1) | `localStorage` only | No auth, no server state, no DB. Aligns with no-grading product decision. |
| Persistence (deferred) | Cloudflare D1 | If we ever add auth, D1 binding is one wrangler.jsonc edit away |
| Routing | RedwoodSDK `defineApp` + `route` in `src/worker.tsx` | Idiomatic for the framework |
| Content | TSX components co-located with route components | MDX adds dep weight; v1 doesn't need a content pipeline |
| Deploy | `npm run release` (`wrangler deploy`) | Single command from Jarad's machine |

## 2. System Diagram

```
                 ┌─────────────────────────────────┐
                 │        Cloudflare Worker        │
                 │      (rwsdk + RSC payload)      │
                 │                                 │
   Browser ──▶  │  src/worker.tsx                  │
   (HTTPS)      │   ├── /                Home      │
                 │   ├── /tiers          TierIndex  │
                 │   └── /tiers/:slug    TierDetail │
                 │                                 │
                 │  src/client.tsx (RSC client)    │
                 └─────────────────────────────────┘
                          │
                          ▼
                 ┌─────────────────────────────────┐
                 │    Browser localStorage         │
                 │    bhappy.progress = {          │
                 │      tier-1: "complete",        │
                 │      tier-2: "in_progress" ...  │
                 │    }                            │
                 └─────────────────────────────────┘
```

There is no backend persistence in v1. Every learner's progress lives in their browser. This is a deliberate trade against longevity and rigor in favor of ship velocity for a 7-person cohort.

## 3. Module Layout

```
src/
├── worker.tsx                        # routes
├── client.tsx                        # RSC client init (existing)
├── app/
│   ├── document.tsx                  # HTML shell, app.css import
│   ├── headers.ts                    # security/cache headers (existing)
│   ├── styles/
│   │   └── app.css                   # Tailwind v4 entry + @theme tokens
│   ├── components/
│   │   ├── Layout.tsx                # nav + footer wrapper (server)
│   │   ├── TierCard.tsx              # tier summary card (server)
│   │   ├── ProgressBar.tsx           # overall progress (client)
│   │   ├── ProgressProvider.tsx      # localStorage hydration (client)
│   │   └── MarkComplete.tsx          # per-tier completion button (client)
│   ├── content/
│   │   └── tiers.ts                  # tier metadata: slug, title, summary, primer, exercise
│   └── pages/
│       ├── home.tsx                  # landing
│       ├── tiers.tsx                 # tier index
│       └── tier-detail.tsx           # generic tier detail (data-driven)
└── lib/
    └── progress.ts                   # localStorage helpers
```

## 4. Data Model

Single client-side object stored under key `bhappy.progress`:

```ts
type TierStatus = "locked" | "available" | "in_progress" | "complete";

type Progress = {
  version: 1;
  tiers: {
    "tier-1": TierStatus;
    "tier-2": TierStatus;
    "tier-3": TierStatus;
    "tier-4": TierStatus;
  };
  startedAt?: string;
  lastTouchedAt?: string;
};
```

Tier 1 starts `available`. Each subsequent tier transitions from `locked` to `available` when the prior tier hits `complete`. Marking a tier `complete` is idempotent and irreversible (no "un-complete" button — keep it cheerful).

## 5. Routing Contract

| Path | Handler | Render | Notes |
| --- | --- | --- | --- |
| `/` | `Home` | server | Landing pitch, 4-tier preview |
| `/tiers` | `TierIndex` | server with client progress widget | Index card for each tier |
| `/tiers/:slug` | `TierDetail` | server | Primer + exercise + MarkComplete client island |
| `404` (unmatched) | rwsdk default | server | Acceptable for v1 |

Slug values: `orient`, `operate`, `extend`, `author`. The data file `app/content/tiers.ts` is the single source of truth for the slug list and ordering.

## 6. Styling Strategy

`app/styles/app.css` imports Tailwind v4 and registers theme tokens via `@theme`:

```css
@import "tailwindcss";

@theme {
  --color-canvas: #FFF8F0;       /* warm off-white */
  --color-surface: #FFFFFF;
  --color-ink: #1A2244;          /* deep navy ground */
  --color-ink-muted: #4A5578;
  --color-amber: #F7A03A;        /* primary accent */
  --color-peach: #FFD8B5;        /* soft surface tint */
  --color-rose: #F26D5B;         /* secondary warmth */
  --color-line: rgba(26, 34, 68, 0.08);

  --font-display: "Outfit", "Cabinet Grotesk", system-ui, sans-serif;
  --font-body: "Outfit", system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, monospace;

  --radius-card: 1.75rem;
  --radius-pill: 9999px;
}
```

Component classes are composed inline in TSX. No CSS-in-JS.

## 7. Failure Modes & Recovery

| Failure | Behavior |
| --- | --- |
| `localStorage` unavailable (private mode) | App still renders; progress is ephemeral, no error toast |
| JS disabled | Pages render server-side; mark-complete button is non-functional but visible |
| Worker error | Cloudflare default error page; observability already enabled in `wrangler.jsonc` |
| Cold start on Workers | Negligible (RSC bundle is small, no DB) |

## 8. Deploy Path

1. `npm install` (devDeps if not yet on disk).
2. `npm run check` — types + generated config.
3. `npm run build` — Vite production build.
4. `npm run release` — `wrangler deploy` to the configured account.

Wrangler picks up the `name` from `wrangler.jsonc` (currently `bhappy`). Deployment URL becomes `bhappy.<account>.workers.dev` until a custom domain is added.

## 9. Trade-offs Worth Naming

- Hard-coded TSX content vs. MDX: chose TSX. Loses authoring ergonomics for non-engineers; gains zero deps and full type safety on tier data.
- localStorage vs. D1: chose localStorage. Loses cross-device progress; gains zero infra.
- No auth vs. passkeys: chose no auth. Loses identity for any future cohort feature; gains entire weeks of dev time we don't have.
- Hand-styled Tailwind vs. shadcn/ui: chose hand-styled. Loses component velocity; gains a smaller dep graph and the design taste constraints stay coherent.

If any of these trade-offs bites in week 2, swapping them in is contained: D1 binding + auth would replace `lib/progress.ts` and a few client components without touching the curriculum content or layout.
