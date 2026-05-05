import { Layout } from "@/app/components/Layout";
import { TierGlyph } from "@/app/components/TierGlyph";
import { TIERS } from "@/app/content/tiers";

const tierAccents: Record<string, string> = {
  orient: "var(--color-amber)",
  operate: "var(--color-coral)",
  extend: "var(--color-rose)",
  author: "var(--color-plum)",
};

export const Home = () => (
  <Layout>
    {/* === HERO === */}
    <section className="relative overflow-hidden">
      <div aria-hidden className="absolute -top-32 -right-24 w-[42rem] h-[42rem] rounded-full bg-[radial-gradient(circle_at_30%_30%,var(--color-amber)_0%,transparent_60%)] opacity-50 blur-2xl" />
      <div aria-hidden className="absolute top-40 -left-32 w-[34rem] h-[34rem] rounded-full bg-[radial-gradient(circle_at_60%_50%,var(--color-coral)_0%,transparent_55%)] opacity-30 blur-2xl" />

      <div className="container-x relative grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-10 pt-24 lg:pt-32 pb-20 lg:pb-28 items-end">
        <div className="lg:col-span-8 flex flex-col gap-7">
          <span className="eyebrow">A BMAD bootcamp · for engineers</span>
          <h1 className="display display--xxl">
            Get fluent in
            <span className="inline-emoji-free" />
            BMAD without
            <br className="hidden md:block" />
            reading every doc
            <span className="inline-pill">twice</span>.
          </h1>
          <p className="lede max-w-[58ch]">
            Four tiers, paced for engineers who'd rather build than skim. Land on Tier 01
            knowing nothing. Leave Tier 04 having shipped a custom module to your team.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <a href="/tiers" className="btn btn--primary btn--xl">
              Start at Tier 01
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M5 12 H19 M13 6 L19 12 L13 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a href="https://docs.bmad-method.org/" className="btn btn--secondary btn--xl" target="_blank" rel="noreferrer">
              BMAD official docs
            </a>
          </div>
          <div className="flex flex-wrap items-center gap-4 pt-6 text-sm text-[color:var(--color-ink-muted)]">
            <span className="flex -space-x-2">
              {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                <span
                  key={i}
                  className="w-7 h-7 rounded-full border-2 border-[color:var(--color-canvas)]"
                  style={{
                    background: `radial-gradient(circle at 35% 30%, hsl(${(i * 31 + 18) % 360}, 65%, 78%), hsl(${(i * 31 + 18) % 360}, 70%, 55%))`,
                  }}
                  aria-hidden
                />
              ))}
            </span>
            <span>Built for a 7-person team. Free to anyone with a browser.</span>
          </div>
        </div>

        {/* Hero video — autoplay loop muted, replaces the static panel */}
        <aside className="lg:col-span-4 relative" aria-label="BHappy intro video">
          <div className="relative rounded-[var(--radius-card)] overflow-hidden shadow-[0_28px_60px_-22px_rgb(245_148_16/0.32),0_4px_12px_-4px_rgb(21_23_46/0.10)] border border-[color:var(--color-line)] bg-[color:var(--color-surface)]">
            <video
              src="/intro.mp4"
              poster="/intro-poster.jpg"
              autoPlay
              muted
              loop
              playsInline
              className="block w-full h-auto"
              aria-label="BHappy curriculum animation: sun rises, four tiers cascade, start at Tier 01"
            />
            <div
              aria-hidden
              className="absolute -top-8 -right-8 w-28 h-28 rounded-full opacity-40 blur-2xl pointer-events-none"
              style={{ background: "radial-gradient(circle at 30% 30%, var(--color-amber-soft) 0%, transparent 70%)" }}
            />
          </div>
        </aside>
      </div>
    </section>

    {/* === TIER OVERVIEW (zigzag) === */}
    <section className="container-x py-20 lg:py-28">
      <div className="flex flex-wrap items-end justify-between gap-6 mb-14">
        <div className="max-w-[28ch]">
          <span className="eyebrow">The four tiers, unstacked</span>
          <h2 className="display display--xl mt-4">
            From your first
            <br className="hidden md:block" />
            run to your own module.
          </h2>
        </div>
        <p className="text-[color:var(--color-ink-muted)] max-w-[34ch]">
          Each tier is a primer plus an exercise you run against your own codebase.
          Self-attest when done. We are not in the credentialing business.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {TIERS.map((t) => (
          <a
            key={t.slug}
            href={`/tiers/${t.slug}`}
            className="card p-7 lg:p-8 group flex flex-col gap-5"
            style={{ ["--accent" as string]: tierAccents[t.slug] }}
          >
            <div
              aria-hidden
              className="absolute top-0 left-0 right-0 h-1 rounded-t-[var(--radius-card)]"
              style={{ background: "var(--accent)" }}
            />
            <header className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <span
                  className="font-mono text-xs tracking-[0.18em] uppercase px-2.5 py-1 rounded-full"
                  style={{ color: "var(--accent)", background: "color-mix(in srgb, var(--accent) 14%, transparent)" }}
                >
                  Tier {t.number}
                </span>
                <span className="chip chip--mono">{t.duration}</span>
              </div>
              <span className="text-[color:var(--accent)] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                <TierGlyph slug={t.slug} size={48} />
              </span>
            </header>
            <h3 className="display display--lg" style={{ fontSize: "clamp(1.65rem, 2.8vw, 2.1rem)" }}>
              {t.title}
            </h3>
            <p className="text-[color:var(--color-ink-muted)] leading-relaxed">{t.summary}</p>
            <span className="mt-auto inline-flex items-center gap-1.5 font-display font-semibold text-[0.95rem]" style={{ color: "var(--accent)" }}>
              Open Tier {t.number}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M5 12 H19 M13 6 L19 12 L13 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </a>
        ))}
      </div>
    </section>

    {/* === WHY THIS EXISTS === */}
    <section className="container-x pb-24 lg:pb-32">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-5 lg:sticky lg:top-28">
          <span className="eyebrow">Why this exists</span>
          <h2 className="display display--lg mt-4">
            Encyclopedias are great
            <br />
            once you know what
            <br />
            you're looking for.
          </h2>
        </div>
        <div className="lg:col-span-7 flex flex-col gap-6">
          <p className="text-[1.125rem] leading-relaxed">
            BMAD's docs are encyclopedic by design. That is a feature for the engineer who
            already knows which workflow they need. It is a wall for the engineer who has
            an hour and wants to start building.
          </p>
          <p className="text-[1.0625rem] leading-relaxed text-[color:var(--color-ink-muted)]">
            BHappy is the scaffolded entry path that didn't exist. Four tiers, ordered, each
            small enough to fit between meetings. No certificates. No grading. No leaderboards.
            Self-attest because the only person you are trying to convince is you.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-[color:var(--color-line)]">
            {[
              { k: "Tiers", v: "4" },
              { k: "Exercises", v: "4" },
              { k: "Auth", v: "none" },
              { k: "Cost", v: "free" },
            ].map((m) => (
              <div key={m.k} className="flex flex-col gap-1">
                <span className="font-display font-bold text-[1.6rem] tracking-tight leading-none">{m.v}</span>
                <span className="eyebrow">{m.k}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  </Layout>
);
