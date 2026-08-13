import { test, expect, type Page } from '@playwright/test'

type Theme = 'light' | 'dark'

// Seed the preference *before* any page script runs. Toggling the class after
// navigation loses a race with hydration: ThemeProvider's mount effect calls
// applyTheme() with the stored/system value and reverts it. That is why the
// light and dark baselines were previously byte-identical — dark was never
// actually captured.
async function gotoInTheme(page: Page, url: string, theme: Theme): Promise<void> {
  await page.emulateMedia({ colorScheme: theme })
  await page.addInitScript((t) => {
    window.localStorage.setItem('theme-preference', t)
  }, theme)

  await page.goto(url)

  await expect(page.locator('html')).toHaveClass(new RegExp(`(^|\\s)${theme}(\\s|$)`))
  await page.evaluate(() => document.fonts.ready)

  // The landing title fades letters in on a ~1.2s stagger, far past the 300ms
  // this used to wait. No explicit settle is needed: toHaveScreenshot reshoots
  // until two consecutive frames are identical. (Waiting on
  // document.getAnimations() does not work here — motion drives these from
  // rAF, so the Web Animations list is empty.)
}

const SHOT = {
  fullPage: true,
  maxDiffPixelRatio: 0.01,
  animations: 'disabled',
} as const

test.describe('Visual regression', () => {
  for (const theme of ['light', 'dark'] as const) {
    test(`home page ${theme} mode`, async ({ page }) => {
      await gotoInTheme(page, '/', theme)
      await expect(page).toHaveScreenshot(`home-${theme}.png`, SHOT)
    })

    test(`post page ${theme} mode`, async ({ page }) => {
      await gotoInTheme(page, '/writing/finding-comfort', theme)
      await expect(page).toHaveScreenshot(`post-${theme}.png`, {
        ...SHOT,
        // Like count is fetched from Redis, so it varies by run and by whether
        // KV credentials are present at all.
        mask: [page.getByRole('button', { name: 'Like this post' })],
      })
    })
  }
})
