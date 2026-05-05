import appCssUrl from "@/app/styles/app.css?url";

export const Document: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>BHappy: A BMAD bootcamp</title>
      <meta
        name="description"
        content="A scaffolded entry path for BMAD: four tiers from your first run to a custom module, paced for engineers who'd rather build than read."
      />
      <meta name="theme-color" content="#FFF6E8" />
      <meta property="og:title" content="BHappy: A BMAD bootcamp" />
      <meta
        property="og:description"
        content="Four tiers, paced for engineers. Land on Tier 01 knowing nothing. Leave Tier 04 having shipped a custom module."
      />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="/intro-poster.jpg" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="BHappy: A BMAD bootcamp" />
      <meta
        name="twitter:description"
        content="Four tiers, paced for engineers who'd rather build than read."
      />
      <meta name="twitter:image" content="/intro-poster.jpg" />
      <link rel="icon" type="image/svg+xml" href="/favicon-light.svg" media="(prefers-color-scheme: light)" />
      <link rel="icon" type="image/svg+xml" href="/favicon-dark.svg" media="(prefers-color-scheme: dark)" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500&display=swap"
        precedence="first"
      />
      <link rel="stylesheet" href={appCssUrl} precedence="high" />
      <link rel="modulepreload" href="/src/client.tsx" />
    </head>
    <body>
      {children}
      <script>import("/src/client.tsx")</script>
    </body>
  </html>
);
