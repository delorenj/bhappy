import { Layout } from "@/app/components/Layout";
import { TIERS } from "@/app/content/tiers";

export const Home = () => (
  <Layout>
    <section className="container hero">
      <div className="hero__copy">
        <span className="eyebrow">A BMAD bootcamp</span>
        <h1 className="display display--xl">
          Get fluent in BMAD without reading every doc twice.
        </h1>
        <p className="lede">
          Four tiers, paced for engineers who'd rather build than skim. Land on Tier 1
          knowing nothing. Leave Tier 4 having shipped a custom module to your team.
        </p>
        <div className="hero__cta-row">
          <a href="/tiers" className="btn btn--primary btn--lg">Start at Tier 01</a>
          <a
            href="https://docs.bmad-method.org/"
            className="btn btn--secondary btn--lg"
            target="_blank"
            rel="noreferrer"
          >
            BMAD official docs
          </a>
        </div>
      </div>
      <aside className="hero__panel" aria-label="Curriculum at a glance">
        <p className="hero__panel-title">What you'll do, in order</p>
        <ul className="hero__panel-list">
          <li>Install BMAD, ship a Quick Flow artifact</li>
          <li>Run the Full Method on a real (small) project</li>
          <li>Customize agents to your team's house rules</li>
          <li>Author a module, demo it to the room</li>
        </ul>
      </aside>
    </section>

    <section className="container section" aria-label="Tier overview">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "3rem", flexWrap: "wrap", gap: "1rem" }}>
        <h2 className="display display--lg" style={{ maxWidth: "20ch" }}>
          The four tiers, unstacked.
        </h2>
        <span className="muted" style={{ maxWidth: "32ch" }}>
          Each tier is a primer plus an exercise you run against your own codebase. Self-attest when done.
        </span>
      </div>
      <div className="zig">
        {TIERS.map((t) => (
          <div className="zig__cell" key={t.slug}>
            <div className="zig__label">
              <span className="tier-num">TIER {t.number}</span>
              <span className="chip chip--mono">{t.duration}</span>
            </div>
            <h3 className="zig__title">{t.title}</h3>
            <p className="zig__summary">{t.summary}</p>
            <a href={`/tiers/${t.slug}`} className="btn btn--ghost" style={{ alignSelf: "flex-start", padding: "0.4rem 0" }}>
              Open Tier {t.number} →
            </a>
          </div>
        ))}
      </div>
    </section>

    <section className="container section" aria-label="The pitch">
      <div className="card" style={{ display: "grid", gap: "1.5rem", maxWidth: "60ch" }}>
        <span className="eyebrow">Why this exists</span>
        <p style={{ margin: 0, fontSize: "1.125rem", lineHeight: 1.6 }}>
          BMAD's docs are encyclopedic by design. Encyclopedias are great when you know what
          you're looking for. They're terrible at "I have an hour, where do I start." This
          fills the gap.
        </p>
        <p style={{ margin: 0, color: "var(--color-ink-muted)" }}>
          Built for an internal cohort. Public because gatekeeping a BMAD bootcamp behind
          auth would be funny in a sad way.
        </p>
      </div>
    </section>
  </Layout>
);
