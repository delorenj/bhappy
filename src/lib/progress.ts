export type TierStatus = "locked" | "available" | "in_progress" | "complete";

export type TierSlug = "orient" | "operate" | "extend" | "author";

export const TIER_SLUGS: TierSlug[] = ["orient", "operate", "extend", "author"];

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
    const parsed = JSON.parse(raw) as Progress;
    if (parsed?.version !== 1) return emptyProgress();
    return reconcile(parsed);
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

function reconcile(p: Progress): Progress {
  const tiers = { ...p.tiers };
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
