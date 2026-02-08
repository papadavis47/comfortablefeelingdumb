import { test, expect } from '@playwright/test'

test.describe('Home page', () => {
  test('loads with correct title', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle('Comfortable Feeling Dumb')
  })

  test('post list visible', async ({ page }) => {
    await page.goto('/')
    // First published post by id desc is "Starting Again, Again"
    await expect(page.getByText('Starting Again, Again')).toBeVisible()
  })

  test('subject badges visible', async ({ page }) => {
    await page.goto('/')
    // Topics from published posts include react, learning, design, css, etc.
    await expect(page.getByRole('link', { name: 'react' }).first()).toBeVisible()
  })

  test('navbar present', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('navigation')).toBeVisible()
  })

  test('skip-to-content link exists', async ({ page }) => {
    await page.goto('/')
    const skipLink = page.getByRole('link', { name: 'Skip to main content' })
    await expect(skipLink).toBeAttached()
  })
})
