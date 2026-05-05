import type { TierSlug } from "@/lib/progress";

type Props = { children: React.ReactNode; activePath?: "home" | "tiers" | TierSlug };

export const Layout: React.FC<Props> = ({ children, activePath }) => {
  const isTiers = activePath === "tiers" || (activePath && activePath !== "home");
  return (
    <div className="min-h-dvh flex flex-col">
      <a href="#main" className="skip-link">Skip to content</a>
      <header className="nav">
        <div className="container-x nav__inner">
          <a
            href="/"
            className="wordmark"
            aria-label="BHappy home"
            aria-current={activePath === "home" ? "page" : undefined}
          >
            <span className="wordmark__sun" aria-hidden />
            BHappy
          </a>
          <nav className="flex items-center gap-7" aria-label="Primary">
            <a
              href="/tiers"
              className="nav__link"
              aria-current={isTiers ? "page" : undefined}
            >
              Tiers
            </a>
            <a
              href="https://docs.bmad-method.org/"
              className="nav__link"
              target="_blank"
              rel="noreferrer"
            >
              BMAD Docs
            </a>
          </nav>
        </div>
      </header>
      <main id="main" className="flex-1">{children}</main>
      <footer className="footer">
        <div className="container-x flex flex-wrap items-center justify-between gap-4">
          <span className="font-medium text-[color:var(--color-ink)]">Made with BMAD.</span>
          <span className="text-sm">Internal cohort. No warranty. Plenty of warmth.</span>
        </div>
      </footer>
    </div>
  );
};
