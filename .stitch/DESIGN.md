# Design System: BHappy

## 1. Visual Theme & Atmosphere

A warm, gallery-airy interface tuned to the late-afternoon side of the day. Sunshine without saccharine. The atmosphere is a renovated artist's studio at 4pm: pale plaster walls, a single amber pendant, deep navy beams holding the space. The vibe is playful adult, never childish. Generous whitespace, asymmetric structure, soft elevation. Motion is gentle and continuous, never twitchy.

**Density:** Daily-App Balanced (5)
**Variance:** Offset Asymmetric (7)
**Motion:** Fluid CSS (5)
**Creativity:** 8

## 2. Color Palette & Roles

- **Canvas Cream** (`#FFF8F0`) — Primary background surface, warm off-white tuned away from clinical white
- **Pure Surface** (`#FFFFFF`) — Card and elevated container fill, deployed sparingly
- **Peach Tint** (`#FFEAD2`) — Soft surface tint for subtle zoning, hover states, secondary panels
- **Deep Navy Ink** (`#1A2244`) — Primary text, grounding contrast, never `#000000`
- **Muted Indigo** (`#4A5578`) — Secondary text, metadata, descriptive copy
- **Whisper Line** (`rgba(26, 34, 68, 0.08)`) — 1px structural borders, dividers
- **Amber Sun** (`#F7A03A`) — Single primary accent, used for CTAs, focus rings, active markers (saturation ~70%)
- **Rose Glow** (`#F26D5B`) — Tertiary warmth, used only for celebratory completion states
- **Sand Shadow** (`rgba(247, 160, 58, 0.18)`) — Tint shadows toward warm canvas hue, not grey neutral

**Constraints:**
- Single accent (Amber Sun). Rose Glow appears only on completion celebrations.
- No pure black anywhere.
- No purple, no neon glow, no blue gradient text.
- Shadows tinted toward warm canvas hue; never `rgba(0,0,0,0.1)`.

## 3. Typography Rules

- **Display:** `Outfit` (variable) — Track-tight at large sizes (`letter-spacing: -0.03em`), weight 600 to 800, hierarchy through weight + scale not size alone
- **Body:** `Outfit` (variable) — Weight 400, leading `1.65`, max line length 65ch on prose
- **Mono:** `JetBrains Mono` — Code blocks, exercise step numbers, inline command names

**Banned:**
- `Inter`, `Roboto`, `Helvetica` for any premium-feeling element
- All generic serif fonts (`Times`, `Georgia`, `Garamond`, `Palatino`)
- Any size larger than `5rem` for headlines on desktop (we earn impact through asymmetry, not screaming)

**Hierarchy scale (rem):** 4.5, 3, 2, 1.5, 1.25, 1, 0.875

## 4. Component Stylings

- **Buttons (primary):** Amber Sun fill, navy ink text, `border-radius: var(--radius-pill)` (full pill), generous horizontal padding (`1.75rem`), tactile `-1px` translateY on `:active`. No outer glow. No gradient.
- **Buttons (secondary):** Transparent fill, navy ink text, 1px Whisper Line border, same pill radius. Hover transitions to Peach Tint fill.
- **Cards:** `border-radius: 1.75rem`, Pure Surface fill, 1px Whisper Line border, `box-shadow: 0 12px 40px -16px var(--shadow-sand)`. Cards used for tier summary blocks; NOT used to wrap individual prose paragraphs.
- **Pills / Chips:** Used for tier number badges, status labels. Peach Tint fill, navy ink text, mono font for numbers.
- **Inputs:** Label above (weight 500), input field with 1px Whisper Line border, `border-radius: 0.75rem`. Focus state swaps border to Amber Sun, adds 2px outer ring at 30% opacity. (v1 has no forms but tokens are reserved.)
- **Loading states:** Skeleton blocks matching exact layout dimensions, no spinners.
- **Empty states:** Composed text + icon, never just "No data."
- **Progress bar:** Rounded full pill, Peach Tint track, Amber Sun fill, animated width transition with spring easing.

## 5. Layout Principles

- **No centered hero.** Landing hero uses an asymmetric split: headline + supporting paragraph on the left two-thirds, a tier-preview vignette aligned bottom-right with intentional negative space above it.
- **No 3-equal-card row.** Tier overview on landing uses a 2-column zig-zag where cards 1 and 3 align left, cards 2 and 4 align right with vertical offset.
- **Max width:** Outer container clamped to `min(72rem, 92vw)`. Generous interior padding.
- **Section rhythm:** Vertical gaps `clamp(4rem, 9vw, 7rem)` between major sections.
- **Single-column collapse:** Below 768px every multi-column layout collapses to one column. Asymmetric offsets disappear; cards stack with maintained gap.
- **Heights:** Use `min-h-[100dvh]` for full-height sections; never `h-screen`.

## 6. Motion & Interaction

- **Default easing:** Spring physics analog via `cubic-bezier(0.34, 1.56, 0.64, 1)` on hovers and entry animations. Linear easing banned.
- **Page entry:** Hero text fades in with a 12px upward translate, staggered word groups at `120ms` intervals.
- **Tier card hover:** Lift `2px`, soften shadow, slight saturation bump on the tier number badge.
- **Progress bar fill:** Width transitions over `600ms` with the spring curve.
- **Mark-complete celebration:** When a tier moves to complete, a single Rose Glow pulse animates the badge, followed by a check icon entry. No confetti. No loops.
- **Animate exclusively `transform` and `opacity`.** Never `width`, `height`, `top`, `left` (except progress fill, where width is the semantic property).

## 7. Anti-Patterns (Banned)

- No emojis anywhere in the UI surface (commit messages are out of scope).
- No `Inter` font.
- No generic serif fonts.
- No pure black (`#000000`).
- No outer-glow / neon shadows.
- No oversaturated accents (Amber Sun is capped near 70% saturation).
- No gradient text on headlines.
- No custom mouse cursors.
- No overlapping text-on-image; every element gets a clean spatial zone.
- No 3-equal-card horizontal feature rows.
- No fabricated metrics or fake "trust" numbers ("Used by 50K+ engineers" stays out unless it's true).
- No "John Doe" / "Acme" / "Lorem ipsum" placeholder names.
- No filler copy: "Scroll to explore", "Swipe down", bouncing chevrons.
- No AI copywriting clichés: "Elevate", "Seamless", "Unleash", "Next-Gen", "Game-changing".
- No broken Unsplash links — use `picsum.photos` placeholders or pure CSS shapes.
- No centered hero on this project.
- No confetti animations on completion.
