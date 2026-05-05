// Quick assertion harness for src/lib/progress.ts.
// Run: bun run scripts/test-progress.mjs (or node with TS loader)

import { loadProgress, markTierComplete, completedCount, emptyProgress, TIER_SLUGS } from "../src/lib/progress.ts";

function deepEq(a, b) { return JSON.stringify(a) === JSON.stringify(b); }

let failed = 0;
function check(name, cond, detail = "") {
  if (cond) {
    console.log(`  ok    ${name}`);
  } else {
    console.log(`  FAIL  ${name}${detail ? " - " + detail : ""}`);
    failed++;
  }
}

// === Stub localStorage so loadProgress works under bun/node ===
let stored = null;
globalThis.window = {
  localStorage: {
    getItem: () => stored,
    setItem: (_k, v) => (stored = v),
    removeItem: () => (stored = null),
  },
};

console.log("emptyProgress invariants");
const e = emptyProgress();
check("orient is available", e.tiers.orient === "available");
check("operate is locked", e.tiers.operate === "locked");
check("completedCount(empty) === 0", completedCount(e) === 0);

console.log("\nmarkTierComplete + reconcile (linear)");
const linear = markTierComplete(e, "orient");
check("marking orient → operate becomes available", linear.tiers.operate === "available");
check("extend stays locked", linear.tiers.extend === "locked");
const linear2 = markTierComplete(linear, "operate");
check("after operate complete, extend available", linear2.tiers.extend === "available");

console.log("\nskip-ahead recovery (the iter4-001 bug)");
stored = JSON.stringify({
  version: 1,
  tiers: { orient: "locked", operate: "locked", extend: "complete", author: "locked" },
});
const recovered = loadProgress();
check("extend stays complete", recovered.tiers.extend === "complete");
check("orient unlocked to available (not locked)", recovered.tiers.orient === "available");
check("operate unlocked to available (not locked)", recovered.tiers.operate === "available");
check("author unlocked because extend complete", recovered.tiers.author === "available");

console.log("\ncoerce: corrupt JSON");
stored = "{not json";
check("returns empty progress", deepEq(loadProgress(), emptyProgress()));

console.log("\ncoerce: future version");
stored = JSON.stringify({ version: 99, tiers: { orient: "complete" } });
check("ignores future-version blob", deepEq(loadProgress(), emptyProgress()));

console.log("\ncoerce: missing tiers key");
stored = JSON.stringify({ version: 1 });
const noTiers = loadProgress();
check("falls back to empty tiers shape", noTiers.tiers.orient === "available" && noTiers.tiers.operate === "locked");

console.log("\ncoerce: invalid status string");
stored = JSON.stringify({ version: 1, tiers: { orient: "lol", operate: "complete", extend: "locked", author: "locked" } });
const invalidStatus = loadProgress();
check("invalid status replaced with default", invalidStatus.tiers.orient === "available");
check("valid neighbor preserved", invalidStatus.tiers.operate === "complete");

console.log(`\n${failed === 0 ? "ALL PASS" : `${failed} FAILED`}`);
process.exit(failed === 0 ? 0 : 1);
