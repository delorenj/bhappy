import { Layout } from "@/app/components/Layout";
import { TierIndexClient } from "@/app/components/TierIndexClient";
import { TIERS } from "@/app/content/tiers";

const tierMeta = TIERS.map(({ slug, number, title, summary, duration }) => ({
  slug,
  number,
  title,
  summary,
  duration,
}));

export const TierIndex = () => (
  <Layout>
    <section className="container" style={{ paddingBlock: "clamp(3rem, 7vw, 5rem) 0" }}>
      <span className="eyebrow">The course map</span>
      <h1 className="display display--xl" style={{ maxWidth: "20ch", marginBlock: "1rem 1.25rem" }}>
        Four tiers. Run them in order.
      </h1>
      <p className="lede" style={{ marginBottom: "3rem" }}>
        Progress is saved locally in your browser. No accounts, no certificates, no
        leaderboard — this is for your benefit, not ours.
      </p>
    </section>
    <section className="container section" style={{ paddingBlock: "0 6rem" }}>
      <TierIndexClient tiers={tierMeta} />
    </section>
  </Layout>
);
