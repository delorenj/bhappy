"use client";

import { useEffect, useState } from "react";
import {
  loadProgress,
  markTierComplete,
  saveProgress,
  type TierSlug,
} from "@/lib/progress";

const STORAGE_EVENT = "bhappy:progress";

export const MarkComplete: React.FC<{ slug: TierSlug; accent: string }> = ({ slug, accent }) => {
  const [complete, setComplete] = useState<boolean | null>(null);
  const [justCompleted, setJustCompleted] = useState(false);

  useEffect(() => {
    const sync = () => setComplete(loadProgress().tiers[slug] === "complete");
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
  }, [slug]);

  const onClick = () => {
    const next = markTierComplete(loadProgress(), slug);
    saveProgress(next);
    window.dispatchEvent(new Event(STORAGE_EVENT));
    setComplete(true);
    setJustCompleted(true);
  };

  if (complete === null) {
    return (
      <div className="card p-6" aria-hidden>
        <p className="font-display font-semibold">Loading…</p>
      </div>
    );
  }

  if (complete) {
    return (
      <div
        className="card p-6 lg:p-7 flex flex-col gap-3 relative overflow-hidden"
        role="status"
        style={{ ["--accent" as string]: accent }}
      >
        <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full opacity-30 blur-2xl" style={{ background: "var(--accent)" }} aria-hidden />
        <div className="flex items-center gap-3 relative">
          <span
            className={`w-10 h-10 rounded-full grid place-items-center ${justCompleted ? "animate-[pulse_1.4s_cubic-bezier(0.4,0,0.2,1)_2]" : ""}`}
            style={{ background: "var(--accent)", color: "var(--color-canvas)" }}
            aria-hidden
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M5 10 L8.5 13.5 L15 6.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <div>
            <p className="font-display font-bold text-[1.05rem] leading-tight">Tier complete</p>
            <p className="text-sm text-[color:var(--color-ink-muted)]">Saved to this browser.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card p-6 lg:p-7 flex flex-col gap-4" style={{ ["--accent" as string]: accent }}>
      <div className="flex flex-col gap-1">
        <p className="font-display font-bold text-[1.05rem]">Finished the exercise?</p>
        <p className="text-sm text-[color:var(--color-ink-muted)]">
          Self-attest. We're not in the credentialing business.
        </p>
      </div>
      <button className="btn btn--primary" onClick={onClick}>
        Mark tier complete
        <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden>
          <path d="M5 10 L8.5 13.5 L15 6.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
};
