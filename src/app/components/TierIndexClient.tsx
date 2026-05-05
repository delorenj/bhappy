"use client";

import { useEffect, useState } from "react";
import {
  TIER_SLUGS,
  completedCount,
  emptyProgress,
  loadProgress,
  type Progress,
  type TierSlug,
  type TierStatus,
} from "@/lib/progress";
import { TierGlyph } from "./TierGlyph";

const STORAGE_EVENT = "bhappy:progress";

type TierMeta = {
  slug: TierSlug;
  number: string;
  title: string;
  summary: string;
  duration: string;
};

const STATUS_LABEL: Record<TierStatus, string> = {
  locked: "Up next",
  available: "Ready",
  in_progress: "In progress",
  complete: "Complete",
};

const ACCENTS: Record<TierSlug, string> = {
  orient: "var(--color-amber)",
  operate: "var(--color-coral)",
  extend: "var(--color-rose)",
  author: "var(--color-plum)",
};

export const TierIndexClient: React.FC<{ tiers: TierMeta[] }> = ({ tiers }) => {
  const [progress, setProgress] = useState<Progress>(emptyProgress());
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const sync = () => {
      setProgress(loadProgress());
      setHydrated(true);
    };
    sync();
    const onStorage = (e: StorageEvent) => {
      if (e.key === "bhappy.progress") sync();
    };
    const onCustom = () => sync();
    window.addEventListener("storage", onStorage);
    window.addEventListener(STORAGE_EVENT, onCustom);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(STORAGE_EVENT, onCustom);
    };
  }, []);

  const done = completedCount(progress);
  const pct = (done / TIER_SLUGS.length) * 100;

  return (
    <>
      {/* progress card */}
      <div className="card p-6 lg:p-7 mb-10 flex flex-col sm:flex-row sm:items-center gap-5 lg:gap-7">
        <div className="flex items-center gap-5 flex-1">
          <div className="relative">
            <svg width="64" height="64" viewBox="0 0 64 64" aria-hidden>
              <circle cx="32" cy="32" r="26" stroke="var(--color-line-strong)" strokeWidth="6" fill="none" />
              <circle
                cx="32"
                cy="32"
                r="26"
                stroke="url(#sun)"
                strokeWidth="6"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${(pct / 100) * 163.36} 163.36`}
                transform="rotate(-90 32 32)"
                style={{ transition: "stroke-dasharray 600ms var(--ease-spring)" }}
              />
              <defs>
                <linearGradient id="sun" x1="0" y1="0" x2="64" y2="64">
                  <stop offset="0%" stopColor="#FFB04E" />
                  <stop offset="100%" stopColor="#D87208" />
                </linearGradient>
              </defs>
            </svg>
            <span className="absolute inset-0 grid place-items-center font-display font-bold text-[1rem] tracking-tight">
              {hydrated ? `${done}/${TIER_SLUGS.length}` : "·/·"}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="eyebrow">Your progress</span>
            <p className="font-display font-semibold text-[1.1rem]">
              {!hydrated
                ? "Loading…"
                : done === 0
                ? "Just landed. Tier 01 is open."
                : done === TIER_SLUGS.length
                ? "All four tiers done. Author away."
                : `${done} done, ${TIER_SLUGS.length - done} to go.`}
            </p>
          </div>
        </div>
        <div className="flex-1 max-w-md">
          <div className="h-2.5 rounded-full bg-[color:var(--color-peach)] overflow-hidden">
            <div
              className="h-full rounded-full transition-[width] duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
              style={{
                width: hydrated ? `${pct}%` : "0%",
                background: "linear-gradient(90deg, #FFB04E 0%, var(--color-amber) 60%, var(--color-amber-deep) 100%)",
              }}
            />
          </div>
        </div>
      </div>

      {/* tier list */}
      <div className="flex flex-col gap-5">
        {tiers.map((t) => {
          const status: TierStatus = hydrated ? progress.tiers[t.slug] : "locked";
          const accent = ACCENTS[t.slug];
          const isComplete = status === "complete";
          return (
            <a
              key={t.slug}
              href={`/tiers/${t.slug}`}
              className="card group relative overflow-hidden p-6 lg:p-7 grid grid-cols-[auto,1fr,auto] gap-5 items-center"
              style={{ ["--accent" as string]: accent }}
              aria-label={`Tier ${t.number}: ${t.title}`}
            >
              <span
                aria-hidden
                className="absolute left-0 top-0 bottom-0 w-1 rounded-l-[var(--radius-card)]"
                style={{ background: "var(--accent)" }}
              />
              <span
                className="relative w-14 h-14 rounded-2xl grid place-items-center transition-transform duration-300 group-hover:rotate-[-4deg]"
                style={{ background: "color-mix(in srgb, var(--accent) 18%, transparent)", color: "var(--accent)" }}
              >
                <TierGlyph slug={t.slug} size={36} />
                {isComplete && (
                  <span
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full grid place-items-center"
                    style={{ background: "var(--color-ink)", color: "var(--color-canvas)" }}
                    aria-hidden
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2.5 6 L5 8.5 L9.5 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                )}
              </span>
              <div className="flex flex-col gap-1.5 min-w-0">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="font-mono text-[0.72rem] tracking-[0.18em] uppercase" style={{ color: "var(--accent)" }}>
                    Tier {t.number}
                  </span>
                  <span className="chip chip--mono">{t.duration}</span>
                </div>
                <h3 className="font-display font-bold text-[1.35rem] tracking-tight leading-tight">{t.title}</h3>
                <p className="text-[color:var(--color-ink-muted)] leading-snug">{t.summary}</p>
              </div>
              <div className="hidden sm:flex flex-col items-end gap-1.5">
                <span
                  className="text-xs font-medium px-2.5 py-1 rounded-full"
                  style={{
                    background: isComplete
                      ? "var(--color-ink)"
                      : "color-mix(in srgb, var(--accent) 14%, transparent)",
                    color: isComplete ? "var(--color-canvas)" : "var(--accent)",
                  }}
                >
                  {hydrated ? STATUS_LABEL[status] : "—"}
                </span>
                <span className="text-[color:var(--color-ink-muted)] text-sm flex items-center gap-1 transition-transform duration-300 group-hover:translate-x-1">
                  Open
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M5 12 H19 M13 6 L19 12 L13 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
            </a>
          );
        })}
      </div>
    </>
  );
};
