import { defineConfig } from '@playwright/test'

// Own port so a dev server on the usual 3000 is never reused or collided with.
const PORT = 3100
const BASE_URL = `http://localhost:${PORT}`

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: BASE_URL,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
  ],
  webServer: {
    command: `pnpm dev --port ${PORT}`,
    url: BASE_URL,
    // Always start fresh. Reusing whatever is on the port silently serves a
    // stale build (an orphaned `next start` did exactly this) and skips the
    // env below, producing snapshot diffs with no relation to the code.
    reuseExistingServer: false,
    env: { E2E: '1' },
  },
})
