# Otto Followup — bhappy redesign 2026-05-05

```yaml
parent_run: 20260505-bhappy-autopilot
trigger: user feedback ("why is it so terribly bland and ugly")
status: completed
```

## Reflection

The v1 ship was technically clean (build green, types green, push successful) but visually flat. Two compounding misses:

1. **Skipped Tailwind/shadcn** to dodge an `npm install` step, optimizing for ship velocity over the user's stated stack preferences. Trade-off hierarchy violated: control & process should beat speed, never the other way.
2. **Broke the design contract I wrote myself**. The `taste-design` DESIGN.md called for inline-image typography in the hero, real depth, perpetual micro-motion, and asymmetric structure. Shipped flat cards with whitespace and called it done.

A subtler third issue surfaced during diagnosis: the CSS file wasn't even being injected. The side-effect `import "@/app/styles/app.css"` from a server component (`document.tsx`) registered the asset in Vite's graph but RedwoodSDK didn't auto-link it from the rendered HTML. The fix was a `?url` import + explicit `<link rel="stylesheet">`. So the v1 user actually saw fully unstyled HTML, not even the flat-but-styled version I tested only at build-time.

## What changed

- Installed `tailwindcss@^4` + `@tailwindcss/vite`, wired into `vite.config.mts`.
- Rewrote `src/app/styles/app.css` with `@import "tailwindcss"` + `@theme` token block + `@layer components` for semantic primitives (`.card`, `.btn`, `.chip`, `.wordmark`, etc.).
- Linked the stylesheet from `document.tsx` via `?url` import.
- Updated CSP in `headers.ts` to allow `data:` (for the SVG noise filter) and `picsum.photos` (for inline image typography placeholders).
- Added `src/app/components/TierGlyph.tsx` with four bespoke abstract SVG glyphs (compass, cycle, branch, stamp).
- Rewrote home page with: gradient mesh hero background, asymmetric headline featuring an inline sun pill and an inline "twice" pill (the taste-design signature inline-typography move), 7-avatar gradient row representing the cohort, raised side-panel with tier preview, tier-color-coded zigzag preview cards with glyphs, sticky asymmetric "Why this exists" section with a 4-stat row.
- Rewrote tier index with: SVG donut chart progress indicator, gradient progress bar, color-stripe-on-left tier cards with completion checkmarks.
- Rewrote tier detail with: gradient halo behind hero, glyph-in-tinted-box, peach-gradient exercise block with decorative dashed circle, sticky outcome card with check bullets, dashed callout for `/bmad-help`.

## Verified

- `npm run build`: clean, 30.33 kB CSS bundle, client bundles unchanged size class (~1-7 kB per island).
- Chrome DevTools screenshots at 1440, 980, and 390 viewports. All collapse cleanly.
- Console clean (only Vite HMR + React DevTools nag).
