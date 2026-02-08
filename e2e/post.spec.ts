import { test, expect } from '@playwright/test'

test.describe('Post page', () => {
  test('navigate from home to post, verify content', async ({ page }) => {
    await page.goto('/')
    await page.getByText('Finding Comfort with Discomfort').click()

    await expect(page).toHaveURL(/\/writing\/finding-comfort/)
    await expect(page.getByRole('heading', { name: 'Finding Comfort with Discomfort' })).toBeVisible()
    // Reading time should be visible
    await expect(page.getByText(/min read/)).toBeVisible()
  })

  test('"Thanks for reading" section at bottom', async ({ page }) => {
    await page.goto('/writing/finding-comfort')
    await expect(page.getByText('Thanks for reading!')).toBeVisible()
  })

  test('back-to-home link works', async ({ page }) => {
    await page.goto('/writing/finding-comfort')
    await page.getByText('Back to Home').click()
    await expect(page).toHaveURL('/')
  })

  test('404 for nonexistent post', async ({ page }) => {
    await page.goto('/writing/this-post-does-not-exist')
    await expect(page.getByText('404')).toBeVisible()
  })

  test('like button flow', async ({ page }) => {
    await page.goto('/writing/sand-beneath-my-feet')

    // Wait for like button to load (not disabled anymore)
    const likeButton = page.getByRole('button', { name: 'Like this post' })
    await expect(likeButton).toBeVisible({ timeout: 10000 })

    // Click to like
    await likeButton.click()

    // Button should become disabled with "Already liked" label
    await expect(
      page.getByRole('button', { name: 'Already liked' })
    ).toBeVisible()
  })
})
