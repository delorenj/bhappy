export type TierStatus = "locked" | "available" | "in_progress" | "complete";

export type TierSlug = "orient" | "operate" | "extend" | "author";

export const TIER_SLUGS: TierSlug[] = ["orient", "operate", "extend", "author"];

const VALID_STATUSES: ReadonlySet<TierStatus> = new Set([
  "locked",
  "available",
  "in_progress",
  "complete",
]);

export type Progress = {
  version: 1;
  tiers: Record<TierSlug, TierStatus>;
  startedAt?: string;
  lastTouchedAt?: string;
};

const STORAGE_KEY = "bhappy.progress";

export function emptyProgress(): Progress {
  return {
    version: 1,
    tiers: { orient: "available", operate: "locked", extend: "locked", author: "locked" },
  };
}

export function loadProgress(): Progress {
  if (typeof window === "undefined") return emptyProgress();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyProgress();
    const parsed = JSON.parse(raw);
    return reconcile(coerce(parsed));
  } catch {
    return emptyProgress();
  }
}

export function saveProgress(p: Progress): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
  } catch {
    // private mode or quota: silently no-op
  }
}

export function markTierComplete(p: Progress, slug: TierSlug): Progress {
  if (p.tiers[slug] === "complete") return p;
  const next: Progress = {
    ...p,
    startedAt: p.startedAt ?? new Date().toISOString(),
    lastTouchedAt: new Date().toISOString(),
    tiers: { ...p.tiers, [slug]: "complete" },
  };
  return reconcile(next);
}

// Coerce arbitrary parsed JSON into a known-shape Progress with safe defaults.
// Drops unknown keys, falls back to "locked" for invalid statuses, replaces
// missing keys with empty defaults. Never throws.
function coerce(input: unknown): Progress {
  const empty = emptyProgress();
  if (!input || typeof input !== "object") return empty;
  const obj = input as Record<string, unknown>;
  if (obj.version !== 1) return empty;
  const tiersIn = (obj.tiers && typeof obj.tiers === "object" ? obj.tiers : {}) as Record<string, unknown>;
  const tiers: Record<TierSlug, TierStatus> = { ...empty.tiers };
  for (const slug of TIER_SLUGS) {
    const v = tiersIn[slug];
    if (typeof v === "string" && VALID_STATUSES.has(v as TierStatus)) {
      tiers[slug] = v as TierStatus;
    }
  }
  return {
    version: 1,
    tiers,
    startedAt: typeof obj.startedAt === "string" ? obj.startedAt : undefined,
    lastTouchedAt: typeof obj.lastTouchedAt === "string" ? obj.lastTouchedAt : undefined,
  };
}

// Bring a Progress object into a self-consistent state. Two invariants:
//  1. Tier 0 is at least "available".
//  2. If tier N is "complete", every tier < N is also at least "available"
//     (we never auto-mark them complete; the user has to attest).
// This handles skip-ahead: if a user (or an old save) has tier 3 complete
// while tier 2 is locked, tier 2 becomes available so the cohort can revisit.
function reconcile(p: Progress): Progress {
  const tiers = { ...p.tiers };
  // First: any tier with a completed successor must be at least "available"
  let lastCompleteIdx = -1;
  for (let i = TIER_SLUGS.length - 1; i >= 0; i--) {
    if (tiers[TIER_SLUGS[i]] === "complete") {
      lastCompleteIdx = i;
      break;
    }
  }
  for (let i = 0; i < lastCompleteIdx; i++) {
    if (tiers[TIER_SLUGS[i]] === "locked") tiers[TIER_SLUGS[i]] = "available";
  }
  // Then: standard forward unlock. Tier N becomes available when N-1 is complete.
  for (let i = 0; i < TIER_SLUGS.length; i++) {
    const slug = TIER_SLUGS[i];
    if (tiers[slug] === "complete") continue;
    const prevComplete = i === 0 || tiers[TIER_SLUGS[i - 1]] === "complete";
    if (prevComplete && tiers[slug] === "locked") tiers[slug] = "available";
  }
  return { ...p, tiers };
}

export function completedCount(p: Progress): number {
  return TIER_SLUGS.reduce((acc, s) => acc + (p.tiers[s] === "complete" ? 1 : 0), 0);
}
