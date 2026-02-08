import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi, describe, it, expect, beforeEach } from 'vitest'

// Mock motion/react to avoid animation complexity in tests
vi.mock('motion/react', () => ({
  motion: {
    span: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
      <span {...props}>{children}</span>
    ),
  },
  AnimatePresence: ({ children }: React.PropsWithChildren) => <>{children}</>,
}))

import LikeButton from '../LikeButton'

beforeEach(() => {
  vi.restoreAllMocks()
})

describe('LikeButton', () => {
  it('shows loading state then displays count', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ likes: 5, hasLiked: false }),
    })

    render(<LikeButton slug="test-post" />)

    // Initially disabled (loading)
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()

    // After fetch resolves, shows count
    await waitFor(() => {
      expect(screen.getByText('5')).toBeInTheDocument()
    })
  })

  it('optimistically increments on click', async () => {
    const user = userEvent.setup()

    globalThis.fetch = vi.fn()
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ likes: 3, hasLiked: false }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ likes: 4, hasLiked: true }),
      })

    render(<LikeButton slug="test-post" />)

    await waitFor(() => {
      expect(screen.getByText('3')).toBeInTheDocument()
    })

    const button = screen.getByRole('button')
    await user.click(button)

    // Optimistic update
    expect(screen.getByText('4')).toBeInTheDocument()
  })

  it('disables button after liking', async () => {
    const user = userEvent.setup()

    globalThis.fetch = vi.fn()
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ likes: 0, hasLiked: false }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ likes: 1, hasLiked: true }),
      })

    render(<LikeButton slug="test-post" />)

    await waitFor(() => {
      expect(screen.getByRole('button')).not.toBeDisabled()
    })

    await user.click(screen.getByRole('button'))

    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('reverts on API failure', async () => {
    const user = userEvent.setup()

    // Control when the POST resolves so we can assert optimistic state
    let rejectPost!: () => void
    const postPromise = new Promise<{ ok: boolean }>((_, reject) => {
      rejectPost = () => reject(new Error('Network error'))
    })

    globalThis.fetch = vi.fn()
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ likes: 10, hasLiked: false }),
      })
      .mockReturnValueOnce(postPromise)

    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
    render(<LikeButton slug="test-post" />)

    await waitFor(() => {
      expect(screen.getByText('10')).toBeInTheDocument()
    })

    await user.click(screen.getByRole('button'))

    // Optimistic: shows 11 while POST is in flight
    expect(screen.getByText('11')).toBeInTheDocument()

    // Reject the POST
    rejectPost()

    // After failure: reverts to 10
    await waitFor(() => {
      expect(screen.getByText('10')).toBeInTheDocument()
    })
    spy.mockRestore()
  })

  it('has correct aria-label for liked/unliked state', async () => {
    const user = userEvent.setup()

    globalThis.fetch = vi.fn()
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ likes: 0, hasLiked: false }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ likes: 1, hasLiked: true }),
      })

    render(<LikeButton slug="test-post" />)

    await waitFor(() => {
      expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Like this post')
    })

    await user.click(screen.getByRole('button'))

    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Already liked')
  })
})
