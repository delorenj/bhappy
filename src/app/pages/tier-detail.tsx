import type { RequestInfo } from "rwsdk/worker";
import { Layout } from "@/app/components/Layout";
import { MarkComplete } from "@/app/components/MarkComplete";
import { TIER_BY_SLUG, TIERS } from "@/app/content/tiers";
import type { TierSlug } from "@/lib/progress";
import { TIER_SLUGS } from "@/lib/progress";

export const TierDetail = ({ params }: RequestInfo<{ slug: string }>) => {
  const slug = params.slug as TierSlug;
  const tier = TIER_BY_SLUG[slug];

  if (!tier) {
    return (
      <Layout>
        <section className="container section">
          <span className="eyebrow">Not found</span>
          <h1 className="display display--lg" style={{ marginBlock: "0.5rem 1rem" }}>
            That tier doesn't exist (yet).
          </h1>
          <p className="lede">
            The four tiers are <code>orient</code>, <code>operate</code>,{" "}
            <code>extend</code>, <code>author</code>.
          </p>
          <a href="/tiers" className="btn btn--primary" style={{ marginTop: "1.5rem" }}>
            Back to the course map
          </a>
        </section>
      </Layout>
    );
  }

  const idx = TIER_SLUGS.indexOf(tier.slug);
  const next = TIERS[idx + 1];
  const prev = TIERS[idx - 1];

  return (
    <Layout>
      <section className="container">
        <header className="tier-detail__header">
          <div className="tier-detail__path">
            <a href="/tiers" className="muted">All tiers</a>
            <span aria-hidden>/</span>
            <span className="tier-num">TIER {tier.number}</span>
          </div>
          <h1 className="display display--xl" style={{ maxWidth: "22ch" }}>{tier.title}</h1>
          <p className="lede">{tier.summary}</p>
          <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
            <span className="chip chip--mono">{tier.duration}</span>
            <span className="chip">{tier.outcomes.length} outcomes</span>
          </div>
        </header>

        <div className="tier-detail__columns">
          <article className="tier-detail__primary">
            <section className="prose">{tier.primer()}</section>
            <section className="exercise">{tier.exercise()}</section>
            <nav
              aria-label="Tier navigation"
              style={{ display: "flex", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}
            >
              {prev ? (
                <a href={`/tiers/${prev.slug}`} className="btn btn--secondary">
                  ← Tier {prev.number}: {prev.title}
                </a>
              ) : (
                <span />
              )}
              {next ? (
                <a href={`/tiers/${next.slug}`} className="btn btn--primary">
                  Next: Tier {next.number} {next.title} →
                </a>
              ) : (
                <a href="/tiers" className="btn btn--primary">Back to all tiers</a>
              )}
            </nav>
          </article>
          <aside className="tier-detail__aside">
            <MarkComplete slug={tier.slug} />
            <div className="outline">
              <h4>What you'll walk away with</h4>
              <ul>
                {tier.outcomes.map((o) => (
                  <li key={o}>{o}</li>
                ))}
              </ul>
            </div>
            <div className="callout">
              <p className="callout__title">Stuck?</p>
              <p className="callout__text">{tier.helpHint}</p>
              <code className="callout__cmd">/bmad-help</code>
            </div>
          </aside>
        </div>
      </section>
    </Layout>
  );
};
