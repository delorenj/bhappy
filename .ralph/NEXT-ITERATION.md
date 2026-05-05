# Next Ralph Iteration — bhappy

This is the prompt to feed `/loop` (or any new chat) to advance the ralph-wiggum-v2 loop on bhappy.

## Invocation

```
/loop
Run the next ralph-wiggum-v2 iteration on bhappy.

1. Read /home/delorenj/code/bhappy/.ralph/state.json and categories.json.
2. Pick the 2 lowest-scoring subcategories that have not been reviewed in the last 3 iterations.
3. For each, pick a review style from the ralph skill that matches the subcategory's failure mode (e.g., RENDER_OPTIMIZER for hover_states, EDGE_CASE_HUNTER for tier_unlock_logic, FIRST_TIME_USER for tier_descriptions).
4. Spin up the dev server: `cd /home/delorenj/code/bhappy && nohup npm run dev > /tmp/bhappy-dev.log 2>&1 &`
5. Use agent-browser AND/OR chrome-devtools to find concrete issues. No hypothetical bugs — only things you can demonstrate.
6. Fix each finding. For CSS-only fixes, no test-first required. For logic fixes (tier-unlock reconciliation, localStorage serialization), write a failing assertion first (a node script in scratch/ is fine — does not need a full test framework).
7. Re-verify with the same harness that found the bug.
8. Update state.json discoveryLog and categories.json scores.
9. If 0 critical/major findings AND every subcategory touched scored ≥85, set cleanReview: true and increment consecutiveCleanIterations. Otherwise reset to 0.
10. Commit each fix as its own atomic git commit referencing iter-N-NNN.
11. Push to origin/main when iteration done.
12. Stop the dev server: `pkill -f "vite dev"`.

Stop the loop when consecutiveCleanIterations >= 5 AND every category score >= 90. Otherwise queue the next iteration with the same prompt.
```

## Hard rules

- No hypothetical bugs. If you cannot reproduce it in agent-browser or chrome-devtools or via a script, do not write a fix.
- One commit per finding. Atomic, revertable.
- Touch only the files relevant to the finding (scope discipline).
- If a finding requires a deeper refactor than the iteration budget allows, log it as `deferred` with a reason and move on.

## Iteration 1 highlights (already shipped)

- iter1-001 (major): zigzag offset on home tier cards conflicted with .card:hover transform → flicker. Removed the offset, softened the hover ease, added GPU compositing layer. Fix in commit TBD.
- iter1-002 (minor, deferred): unknown tier slug returns HTTP 200 instead of 404. Acceptable for the 7-person cohort.
- Audited every internal route via fetch — all 200. All tier-to-tier prev/next nav resolves correctly.

## Suggested focus for iteration 2

Lowest-scoring subcategories not yet touched:
1. `accessibility.keyboard_navigation` (50) — Tab through every interactive control, verify focus order is sensible, focus-visible ring present everywhere.
2. `accessibility.color_contrast` (50) — Run WCAG contrast check on muted text against canvas-cream background. Body and lede are at #5A6188 / #FFF6E8 which is borderline.
3. `state_persistence.tier_unlock_logic` (60) — Manually walk the progression: complete tier 1, verify tier 2 transitions from "locked" to "available". Edge case: complete tier 3 without 1 and 2 (via direct localStorage edit) — does the reconcile() honor or override?

Suggested review styles: `EDGE_CASE_HUNTER`, `FIRST_TIME_USER`, `KEYBOARD_NAVIGATOR` (custom).

## Convergence target

`consecutiveCleanIterations >= 5` AND `every category.score >= 90` AND `npm run build` clean AND `npx hyperframes inspect` (on hyperframes/intro) clean.

When met, write `BHAPPY_UI_POLISHED` to `.ralph/CONVERGED.md` with a final summary.
