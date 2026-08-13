const nextConfig = {
  outputFileTracingIncludes: {
    '/*': ['./posts/**/*'],
  },
  // Had to put in this line after an error from upgrading
  // Found the info here:
  //https://github.com/vercel/next.js/issues/63318
  transpilePackages: ['next-mdx-remote'],
  // Visual snapshots run against `next dev`, so the dev-tools badge would sit
  // in every screenshot. Its bounding box is 0x0 (the badge lives in a shadow
  // root), so Playwright's mask can't cover it — it has to not render.
  // Gated on E2E, set by playwright.config.ts, so normal dev keeps the badge.
  ...(process.env.E2E === '1' ? { devIndicators: false } : {}),
}

export default nextConfig
