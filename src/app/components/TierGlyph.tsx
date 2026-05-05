import type { TierSlug } from "@/lib/progress";

type Props = { slug: TierSlug; size?: number };

export const TierGlyph: React.FC<Props> = ({ slug, size = 56 }) => {
  switch (slug) {
    case "orient":
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden>
          <circle cx="32" cy="32" r="26" stroke="currentColor" strokeOpacity="0.18" strokeWidth="2" />
          <circle cx="32" cy="32" r="18" stroke="currentColor" strokeOpacity="0.32" strokeWidth="2" />
          <path d="M32 14 L36 32 L32 50 L28 32 Z" fill="currentColor" />
          <circle cx="32" cy="32" r="3.2" fill="var(--color-canvas)" stroke="currentColor" strokeWidth="2" />
        </svg>
      );
    case "operate":
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden>
          <circle cx="14" cy="14" r="6" fill="currentColor" />
          <circle cx="50" cy="14" r="6" fill="currentColor" fillOpacity="0.7" />
          <circle cx="50" cy="50" r="6" fill="currentColor" fillOpacity="0.45" />
          <circle cx="14" cy="50" r="6" fill="currentColor" fillOpacity="0.25" />
          <path d="M14 14 L50 14 L50 50 L14 50 Z" stroke="currentColor" strokeWidth="2" strokeOpacity="0.35" strokeDasharray="3 4" />
          <path d="M22 14 L42 14" stroke="currentColor" strokeWidth="2" />
          <path d="M50 22 L50 42" stroke="currentColor" strokeWidth="2" strokeOpacity="0.7" />
        </svg>
      );
    case "extend":
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden>
          <circle cx="32" cy="20" r="9" fill="currentColor" />
          <circle cx="18" cy="44" r="7" fill="currentColor" fillOpacity="0.55" />
          <circle cx="46" cy="44" r="7" fill="currentColor" fillOpacity="0.4" />
          <path d="M32 29 L18 37 M32 29 L46 37" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M14 51 L10 56 M22 51 L18 56 M42 51 L38 56 M50 51 L46 56" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.5" />
        </svg>
      );
    case "author":
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden>
          <rect x="10" y="14" width="44" height="36" rx="6" stroke="currentColor" strokeWidth="2" />
          <path d="M18 22 L46 22" stroke="currentColor" strokeWidth="2" strokeOpacity="0.4" />
          <path d="M18 30 L38 30" stroke="currentColor" strokeWidth="2" strokeOpacity="0.4" />
          <path d="M18 38 L42 38" stroke="currentColor" strokeWidth="2" strokeOpacity="0.4" />
          <circle cx="48" cy="44" r="8" fill="currentColor" />
          <path d="M44.5 44 L47 46.5 L51.5 41.5" stroke="var(--color-canvas)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
  }
};
