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
    <section className="container-x pt-20 lg:pt-28 pb-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
        <div className="lg:col-span-8 flex flex-col gap-5">
          <span className="eyebrow">The course map</span>
          <h1 className="display display--xl">
            Four tiers.
            <br />
            Run them in order.
          </h1>
          <p className="lede">
            Progress is saved in this browser. No accounts, no certificates, no
            leaderboard. Move on when you feel like you've moved on.
          </p>
        </div>
        <div className="lg:col-span-4 flex lg:justify-end">
          <a href="/" className="btn btn--ghost">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M19 12 H5 M11 18 L5 12 L11 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Home
          </a>
        </div>
      </div>
    </section>
    <section className="container-x pb-24 lg:pb-32">
      <TierIndexClient tiers={tierMeta} />
    </section>
  </Layout>
);
