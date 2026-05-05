"use client";

import { useEffect, useState } from "react";
import {
  loadProgress,
  markTierComplete,
  saveProgress,
  type TierSlug,
} from "@/lib/progress";

const STORAGE_EVENT = "bhappy:progress";

export const MarkComplete: React.FC<{ slug: TierSlug }> = ({ slug }) => {
  const [complete, setComplete] = useState<boolean | null>(null);

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
  };

  if (complete === null) {
    return (
      <div className="mark" aria-hidden>
        <p className="mark__title">Loading…</p>
      </div>
    );
  }

  if (complete) {
    return (
      <div className="mark" role="status">
        <p className="mark__title">Tier complete</p>
        <p className="muted" style={{ margin: 0, fontSize: "0.9375rem" }}>
          Your progress is saved in this browser. Onward.
        </p>
        <span className="mark__check">Done</span>
      </div>
    );
  }

  return (
    <div className="mark">
      <p className="mark__title">Finished the exercise?</p>
      <p className="muted" style={{ margin: 0, fontSize: "0.9375rem" }}>
        Self-attest. We're not in the credentialing business.
      </p>
      <button className="btn btn--primary" onClick={onClick}>
        Mark tier complete
      </button>
    </div>
  );
};
