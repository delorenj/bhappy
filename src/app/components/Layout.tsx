export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="min-h-dvh flex flex-col">
    <header className="nav">
      <div className="container-x nav__inner">
        <a href="/" className="wordmark" aria-label="BHappy home">
          <span className="wordmark__sun" aria-hidden />
          BHappy
        </a>
        <nav className="flex items-center gap-7" aria-label="Primary">
          <a href="/tiers" className="nav__link">Tiers</a>
          <a href="https://docs.bmad-method.org/" className="nav__link" target="_blank" rel="noreferrer">
            BMAD Docs
          </a>
        </nav>
      </div>
    </header>
    <main className="flex-1">{children}</main>
    <footer className="footer">
      <div className="container-x flex flex-wrap items-center justify-between gap-4">
        <span className="font-medium text-[color:var(--color-ink)]">Made with BMAD.</span>
        <span className="text-sm">Internal cohort. No warranty. Plenty of warmth.</span>
      </div>
    </footer>
  </div>
);
