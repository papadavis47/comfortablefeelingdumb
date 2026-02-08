import { test, expect } from '@playwright/test'

test.describe('Navigation', () => {
  test('subject badge click shows filtered posts', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('link', { name: 'react' }).first().click()

    await expect(page).toHaveURL(/\/subject\/react/)
    // Should show posts tagged with 'react'
    await expect(page.getByRole('heading', { name: 'Finding Comfort with Discomfort' })).toBeVisible()
  })

  test('home nav link returns to /', async ({ page }) => {
    await page.goto('/writing/finding-comfort')
    await page.getByRole('link', { name: 'Home', exact: true }).click()
    await expect(page).toHaveURL('/')
  })

  test('about modal opens and closes', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: 'About this blog' }).click()

    await expect(page.getByText('About This Blog')).toBeVisible()

    await page.getByRole('button', { name: 'Close' }).click()
    await expect(page.getByText('About This Blog')).not.toBeVisible()
  })

  test('404 page has go-back link', async ({ page }) => {
    await page.goto('/nonexistent-page')
    const goBack = page.getByRole('link', { name: 'Go Back' })
    await expect(goBack).toBeVisible()

    await goBack.click()
    await expect(page).toHaveURL('/')
  })

  test('external links have target="_blank"', async ({ page }) => {
    await page.goto('/')
    const githubLink = page.getByRole('link', { name: 'GitHub repository' })
    await expect(githubLink).toHaveAttribute('target', '_blank')
  })
})
