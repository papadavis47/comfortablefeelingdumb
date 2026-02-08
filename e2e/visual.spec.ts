import { test, expect } from '@playwright/test'

test.describe('Visual regression', () => {
  test('home page light mode', async ({ page }) => {
    await page.goto('/')
    // Ensure light mode
    await page.evaluate(() => {
      document.documentElement.classList.remove('dark')
      document.documentElement.classList.add('light')
    })
    await page.waitForTimeout(300) // let transitions settle

    await expect(page).toHaveScreenshot('home-light.png', {
      fullPage: true,
      maxDiffPixelRatio: 0.01,
    })
  })

  test('home page dark mode', async ({ page }) => {
    await page.goto('/')
    await page.evaluate(() => {
      document.documentElement.classList.remove('light')
      document.documentElement.classList.add('dark')
    })
    await page.waitForTimeout(300)

    await expect(page).toHaveScreenshot('home-dark.png', {
      fullPage: true,
      maxDiffPixelRatio: 0.01,
    })
  })

  test('post page light mode', async ({ page }) => {
    await page.goto('/writing/finding-comfort')
    await page.evaluate(() => {
      document.documentElement.classList.remove('dark')
      document.documentElement.classList.add('light')
    })
    await page.waitForTimeout(300)

    await expect(page).toHaveScreenshot('post-light.png', {
      fullPage: true,
      maxDiffPixelRatio: 0.01,
    })
  })

  test('post page dark mode', async ({ page }) => {
    await page.goto('/writing/finding-comfort')
    await page.evaluate(() => {
      document.documentElement.classList.remove('light')
      document.documentElement.classList.add('dark')
    })
    await page.waitForTimeout(300)

    await expect(page).toHaveScreenshot('post-dark.png', {
      fullPage: true,
      maxDiffPixelRatio: 0.01,
    })
  })
})
