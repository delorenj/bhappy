import type { RequestInfo } from "rwsdk/worker";
import { Layout } from "@/app/components/Layout";
import { MarkComplete } from "@/app/components/MarkComplete";
import { TierGlyph } from "@/app/components/TierGlyph";
import { TIER_BY_SLUG, TIERS } from "@/app/content/tiers";
import type { TierSlug } from "@/lib/progress";
import { TIER_SLUGS } from "@/lib/progress";

const ACCENTS: Record<TierSlug, string> = {
  orient: "var(--color-amber)",
  operate: "var(--color-coral)",
  extend: "var(--color-rose)",
  author: "var(--color-plum)",
};

export const TierDetail = ({ params }: RequestInfo<{ slug: string }>) => {
  const slug = params.slug as TierSlug;
  const tier = TIER_BY_SLUG[slug];

  if (!tier) {
    return (
      <Layout>
        <section className="container-x py-24">
          <span className="eyebrow">Not found</span>
          <h1 className="display display--lg mt-4 mb-3">That tier doesn't exist.</h1>
          <p className="lede">
            The four are <code className="font-mono px-2 py-0.5 rounded bg-[color:var(--color-peach)]">orient</code>,{" "}
            <code className="font-mono px-2 py-0.5 rounded bg-[color:var(--color-peach)]">operate</code>,{" "}
            <code className="font-mono px-2 py-0.5 rounded bg-[color:var(--color-peach)]">extend</code>,{" "}
            <code className="font-mono px-2 py-0.5 rounded bg-[color:var(--color-peach)]">author</code>.
          </p>
          <a href="/tiers" className="btn btn--primary mt-6">Back to the course map</a>
        </section>
      </Layout>
    );
  }

  const idx = TIER_SLUGS.indexOf(tier.slug);
  const next = TIERS[idx + 1];
  const prev = TIERS[idx - 1];
  const accent = ACCENTS[tier.slug];

  return (
    <Layout>
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute -top-24 -right-24 w-[36rem] h-[36rem] rounded-full opacity-25 blur-3xl"
          style={{ background: `radial-gradient(circle at 30% 30%, ${accent} 0%, transparent 65%)` }}
        />
        <div className="container-x relative pt-16 lg:pt-24 pb-10">
          <nav className="flex items-center gap-2 text-sm text-[color:var(--color-ink-muted)] mb-8" aria-label="Breadcrumb">
            <a href="/tiers" className="hover:text-[color:var(--color-ink)]">All tiers</a>
            <span aria-hidden>/</span>
            <span className="font-mono text-xs tracking-[0.18em] uppercase" style={{ color: accent }}>
              Tier {tier.number}
            </span>
          </nav>
          <div className="grid grid-cols-1 lg:grid-cols-[auto,1fr] gap-7 lg:gap-12 items-end">
            <div
              className="w-24 h-24 rounded-3xl grid place-items-center"
              style={{
                background: `color-mix(in srgb, ${accent} 18%, transparent)`,
                color: accent,
                boxShadow: `0 12px 32px -10px color-mix(in srgb, ${accent} 50%, transparent)`,
              }}
              aria-hidden
            >
              <TierGlyph slug={tier.slug} size={64} />
            </div>
            <div className="flex flex-col gap-4 max-w-[40ch]">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="chip chip--mono" style={{ background: `color-mix(in srgb, ${accent} 18%, transparent)`, color: accent }}>
                  Tier {tier.number}
                </span>
                <span className="chip chip--mono">{tier.duration}</span>
                <span className="chip chip--outline">{tier.outcomes.length} outcomes</span>
              </div>
              <h1 className="display display--xl">{tier.title}</h1>
              <p className="lede">{tier.summary}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="container-x pb-24 lg:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr),22rem] gap-10 lg:gap-14 items-start">
          <article className="flex flex-col gap-10 min-w-0">
            <div className="prose">{tier.primer()}</div>
            <div
              className="rounded-[var(--radius-card)] p-7 lg:p-9 relative overflow-hidden"
              style={{
                background: "linear-gradient(180deg, var(--color-canvas-deep) 0%, var(--color-peach) 100%)",
              }}
            >
              <div className="absolute -top-8 right-8 opacity-20" aria-hidden>
                <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
                  <circle cx="60" cy="60" r="56" stroke="var(--color-ink)" strokeWidth="2" strokeDasharray="4 6" />
                </svg>
              </div>
              <div className="relative">{tier.exercise()}</div>
            </div>
            <nav
              className="flex justify-between gap-3 flex-wrap pt-4 border-t border-[color:var(--color-line)]"
              aria-label="Tier navigation"
            >
              {prev ? (
                <a href={`/tiers/${prev.slug}`} className="btn btn--secondary">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M19 12 H5 M11 18 L5 12 L11 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Tier {prev.number}: {prev.title}
                </a>
              ) : (
                <span />
              )}
              {next ? (
                <a href={`/tiers/${next.slug}`} className="btn btn--primary">
                  Next: Tier {next.number} {next.title}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M5 12 H19 M13 6 L19 12 L13 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              ) : (
                <a href="/tiers" className="btn btn--primary">All tiers</a>
              )}
            </nav>
          </article>
          <aside className="flex flex-col gap-5 lg:sticky lg:top-28">
            <MarkComplete slug={tier.slug} accent={accent} />
            <div className="card p-6">
              <span className="eyebrow">What you'll walk away with</span>
              <ul className="mt-4 flex flex-col gap-3">
                {tier.outcomes.map((o) => (
                  <li key={o} className="flex items-start gap-2.5 text-[0.9375rem] leading-snug">
                    <span
                      className="mt-1 w-4 h-4 rounded-full flex-shrink-0 grid place-items-center"
                      style={{ background: accent, color: "var(--color-canvas)" }}
                      aria-hidden
                    >
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 5 L4 7 L8 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span>{o}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div
              className="rounded-[var(--radius-card)] p-6 border-2 border-dashed flex flex-col gap-2"
              style={{ borderColor: `color-mix(in srgb, ${accent} 40%, transparent)` }}
            >
              <p className="font-display font-bold text-[1rem]">Stuck?</p>
              <p className="text-sm text-[color:var(--color-ink-muted)] leading-snug">{tier.helpHint}</p>
              <code
                className="font-mono text-xs px-3 py-1.5 rounded-lg self-start mt-1"
                style={{ background: "var(--color-ink)", color: "var(--color-canvas)" }}
              >
                /bmad-help
              </code>
            </div>
          </aside>
        </div>
      </section>
    </Layout>
  );
};
