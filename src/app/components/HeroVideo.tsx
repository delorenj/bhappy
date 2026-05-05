"use client";

import { useEffect, useRef, useState } from "react";

type Props = { src: string; poster: string };

export const HeroVideo: React.FC<Props> = ({ src, poster }) => {
  const ref = useRef<HTMLVideoElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (reducedMotion) {
      v.pause();
      v.currentTime = Math.min(v.duration || 6.5, 6.5); // hold on the CTA-pulse frame
    } else {
      // play() can reject under various browser policies; ignore
      v.play().catch(() => {});
    }
  }, [reducedMotion]);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      loop={!reducedMotion}
      playsInline
      preload={reducedMotion ? "metadata" : "auto"}
      className="block w-full h-auto"
      aria-label="BHappy curriculum animation: sun rises, four tiers cascade, start at Tier 01"
    />
  );
};
