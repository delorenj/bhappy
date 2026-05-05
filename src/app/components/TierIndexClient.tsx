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
  available: "Open",
  in_progress: "In progress",
  complete: "Complete",
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
      <section
        className="progress"
        aria-label="Cohort progress"
        style={{ marginBottom: "3rem" }}
      >
        <div className="progress__row">
          <span className="eyebrow">Your progress</span>
          <span className="progress__count">
            {hydrated ? `${done} / ${TIER_SLUGS.length}` : `– / ${TIER_SLUGS.length}`}
          </span>
        </div>
        <div className="progress__track" aria-hidden>
          <div className="progress__fill" style={{ width: `${hydrated ? pct : 0}%` }} />
        </div>
      </section>

      <section className="tier-list" aria-label="Tiers">
        {tiers.map((t) => {
          const status: TierStatus = hydrated ? progress.tiers[t.slug] : "locked";
          return (
            <a
              key={t.slug}
              href={`/tiers/${t.slug}`}
              className={`tier-item${status === "complete" ? " tier-item--complete" : ""}`}
              aria-label={`Tier ${t.number}: ${t.title}`}
            >
              <span className="tier-item__num">{t.number}</span>
              <span className="tier-item__body">
                <span className="tier-item__title">{t.title}</span>
                <span className="tier-item__summary">{t.summary}</span>
              </span>
              <span className="tier-item__status">
                <span className="chip chip--mono">{t.duration}</span>
                <span aria-hidden>·</span>
                <span>{hydrated ? STATUS_LABEL[status] : "—"}</span>
              </span>
            </a>
          );
        })}
      </section>
    </>
  );
};
