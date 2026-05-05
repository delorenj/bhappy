# BHappy — Site Map & Vision

## 1. Site Vision

BHappy is a public BMAD bootcamp delivered as a single-page-app-feeling Cloudflare Worker. Visitors land on a warm, asymmetric pitch page; signed-in (or rather, just-clicking-through) learners progress through four tiers stored in their browser. Aesthetic is sunshine + deep navy, gallery-airy, premium-warm.

## 2. Stitch Project ID

*(Not yet generated — Otto held off on Stitch generation in this run; hand-built the initial pages from DESIGN.md. If we want to regenerate visually, run the Stitch loop against `.stitch/next-prompt.md`.)*

## 3. Audience

- 7 internal engineers (primary cohort).
- Public passersby (anyone hitting the URL).

## 4. Sitemap

| Page | Path | Status |
| --- | --- | --- |
| Landing | `/` | [x] hand-built v1 |
| Tier index | `/tiers` | [x] hand-built v1 |
| Tier detail (Orient) | `/tiers/orient` | [x] hand-built v1 |
| Tier detail (Operate) | `/tiers/operate` | [x] hand-built v1 |
| Tier detail (Extend) | `/tiers/extend` | [x] hand-built v1 |
| Tier detail (Author) | `/tiers/author` | [x] hand-built v1 |

## 5. Roadmap (v2+)

- [ ] About page (the why behind BHappy)
- [ ] Cohort directory (if we ever add identity)
- [ ] Per-exercise checklists with sub-progress
- [ ] D1-backed progress with passkey login
- [ ] OG / social preview cards per tier

## 6. Creative Freedom (ideas to try with Stitch later)

- A "BMAD glossary" page with chip-style anchor links and hover cards.
- A per-tier "spec sheet" printable view.
- An interactive agent-skill model diagram.
- A dark mode (sunset palette: deep navy canvas, amber accent, dusk peach).

## 7. Constraints

- Every generated page must consume the design system in `.stitch/DESIGN.md` Section 6 verbatim.
- No emojis, no Inter, no pure black, no centered heroes (per anti-pattern list).
- Mobile single-column collapse below 768px is non-negotiable.
- Every tier detail page includes the bmad-help callout block.
