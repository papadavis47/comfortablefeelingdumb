import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'

// Mock motion/react
vi.mock('motion/react', () => ({
  motion: {
    div: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => {
      // Filter out motion-specific props that shouldn't go to DOM
      const { onHoverStart, onHoverEnd, animate, whileHover, whileTap, transition, ...rest } = props
      // Suppress unused variable warnings - these are intentionally destructured to filter
      void onHoverStart; void onHoverEnd; void animate; void whileHover; void whileTap; void transition
      return <div {...rest}>{children}</div>
    },
  },
}))

import PostListClient from '../PostListClient'

const mockPosts = [
  {
    frontMatter: {
      title: 'First Post',
      id: 1,
      date: 'January 1, 2024',
      description: 'First description',
      topics: ['typescript', 'react'],
      isDraft: false,
    },
    readingTime: '3 min read',
    slug: 'first-post',
  },
  {
    frontMatter: {
      title: 'Second Post',
      id: 2,
      date: 'January 5, 2024',
      description: 'Second description',
      topics: ['rust'],
      isDraft: false,
    },
    readingTime: '5 min read',
    slug: 'second-post',
  },
]

describe('PostListClient', () => {
  it('renders all posts with titles and reading times', () => {
    render(<PostListClient posts={mockPosts} />)

    expect(screen.getByText('First Post')).toBeInTheDocument()
    expect(screen.getByText('Second Post')).toBeInTheDocument()
    expect(screen.getByText('3 min read')).toBeInTheDocument()
    expect(screen.getByText('5 min read')).toBeInTheDocument()
  })

  it('renders topic badges', () => {
    render(<PostListClient posts={mockPosts} />)

    expect(screen.getByText('typescript')).toBeInTheDocument()
    expect(screen.getByText('react')).toBeInTheDocument()
    expect(screen.getByText('rust')).toBeInTheDocument()
  })

  it('topic badges link to /subject/[topic]', () => {
    render(<PostListClient posts={mockPosts} />)

    const tsLink = screen.getByText('typescript').closest('a')
    expect(tsLink).toHaveAttribute('href', '/subject/typescript')

    const rustLink = screen.getByText('rust').closest('a')
    expect(rustLink).toHaveAttribute('href', '/subject/rust')
  })

  it('post titles link to /writing/[slug]', () => {
    render(<PostListClient posts={mockPosts} />)

    const firstLink = screen.getByText('First Post').closest('a')
    expect(firstLink).toHaveAttribute('href', '/writing/first-post')

    const secondLink = screen.getByText('Second Post').closest('a')
    expect(secondLink).toHaveAttribute('href', '/writing/second-post')
  })
})
