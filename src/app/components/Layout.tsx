export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="shell">
    <header className="nav">
      <div className="container nav__inner">
        <a href="/" className="wordmark" aria-label="BHappy home">
          <span className="wordmark__dot" aria-hidden />
          BHappy
        </a>
        <nav className="nav__links" aria-label="Primary">
          <a href="/tiers" className="nav__link">Tiers</a>
          <a href="https://docs.bmad-method.org/" className="nav__link" target="_blank" rel="noreferrer">
            BMAD Docs
          </a>
        </nav>
      </div>
    </header>
    <main>{children}</main>
    <footer className="footer">
      <div className="container footer__inner">
        <span>Made with BMAD.</span>
        <span className="muted">Internal cohort, no warranty, plenty of warmth.</span>
      </div>
    </footer>
  </div>
);
