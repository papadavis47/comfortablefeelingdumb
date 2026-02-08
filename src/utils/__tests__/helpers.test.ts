import { vi, describe, it, expect, beforeEach } from 'vitest'

// Mock fs/promises before importing helpers
vi.mock('fs/promises', () => ({
  default: {
    readdir: vi.fn(),
    readFile: vi.fn(),
  },
}))

// Mock next/navigation
vi.mock('next/navigation', () => ({
  notFound: vi.fn(() => {
    throw new Error('NEXT_NOT_FOUND')
  }),
}))

import fs from 'fs/promises'
import { getAllPosts, getSlugsOnly, getSubjectsOnly, loadBlogPost } from '../helpers'

const validPost = `---
title: Test Post
id: 1
date: 'January 1, 2024'
description: 'A test post'
topics: ['typescript', 'react']
isDraft: false
---

Some content here.`

const draftPost = `---
title: Draft Post
id: 2
date: 'January 2, 2024'
description: 'A draft'
topics: ['go']
isDraft: true
---

Draft content.`

const invalidPost = `---
title: Bad Post
---

Missing fields.`

const secondPost = `---
title: Second Post
id: 5
date: 'January 5, 2024'
description: 'Second post'
topics: ['rust', 'typescript']
isDraft: false
---

More content.`

beforeEach(() => {
  vi.clearAllMocks()
})

describe('getAllPosts', () => {
  it('returns valid posts with reading time', async () => {
    vi.mocked(fs.readdir).mockResolvedValue(['test.mdx'] as never)
    vi.mocked(fs.readFile).mockResolvedValue(validPost)

    const posts = await getAllPosts()
    expect(posts).toHaveLength(1)
    expect(posts[0].frontMatter.title).toBe('Test Post')
    expect(posts[0].slug).toBe('test')
    expect(posts[0].readingTime).toBeDefined()
  })

  it('skips posts with invalid frontmatter', async () => {
    vi.mocked(fs.readdir).mockResolvedValue(['valid.mdx', 'invalid.mdx'] as never)
    vi.mocked(fs.readFile)
      .mockResolvedValueOnce(validPost)
      .mockResolvedValueOnce(invalidPost)

    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
    const posts = await getAllPosts()

    expect(posts).toHaveLength(1)
    expect(spy).toHaveBeenCalledWith(
      expect.stringContaining('Invalid frontmatter'),
      expect.anything()
    )
    spy.mockRestore()
  })

  it('filters out drafts', async () => {
    vi.mocked(fs.readdir).mockResolvedValue(['post.mdx', 'draft.mdx'] as never)
    vi.mocked(fs.readFile)
      .mockResolvedValueOnce(validPost)
      .mockResolvedValueOnce(draftPost)

    const posts = await getAllPosts()
    expect(posts).toHaveLength(1)
    expect(posts[0].frontMatter.title).toBe('Test Post')
  })

  it('sorts by id descending', async () => {
    vi.mocked(fs.readdir).mockResolvedValue(['a.mdx', 'b.mdx'] as never)
    vi.mocked(fs.readFile)
      .mockResolvedValueOnce(validPost) // id: 1
      .mockResolvedValueOnce(secondPost) // id: 5

    const posts = await getAllPosts()
    expect(posts[0].frontMatter.id).toBe(5)
    expect(posts[1].frontMatter.id).toBe(1)
  })
})

describe('getSlugsOnly', () => {
  it('strips .mdx extension', async () => {
    vi.mocked(fs.readdir).mockResolvedValue(['hello-world.mdx', 'another.mdx'] as never)

    const slugs = await getSlugsOnly()
    expect(slugs).toEqual(['hello-world', 'another'])
  })
})

describe('getSubjectsOnly', () => {
  it('deduplicates topics across posts', async () => {
    vi.mocked(fs.readdir).mockResolvedValue(['a.mdx', 'b.mdx'] as never)
    vi.mocked(fs.readFile)
      .mockResolvedValueOnce(validPost) // topics: ['typescript', 'react']
      .mockResolvedValueOnce(secondPost) // topics: ['rust', 'typescript']

    const subjects = await getSubjectsOnly()
    expect(subjects).toContain('typescript')
    expect(subjects).toContain('react')
    expect(subjects).toContain('rust')
    // typescript appears in both but should be deduplicated
    expect(subjects.filter((s) => s === 'typescript')).toHaveLength(1)
  })
})

describe('loadBlogPost', () => {
  it('returns data for valid slug', async () => {
    vi.mocked(fs.readdir).mockResolvedValue(['my-post.mdx'] as never)
    vi.mocked(fs.readFile).mockResolvedValue(validPost)

    const data = await loadBlogPost('my-post')
    expect(data.frontMatter.title).toBe('Test Post')
    expect(data.content).toContain('Some content here.')
    expect(data.timeToRead).toBeDefined()
  })

  it('calls notFound for missing slug', async () => {
    vi.mocked(fs.readdir).mockResolvedValue(['exists.mdx'] as never)

    await expect(loadBlogPost('nonexistent')).rejects.toThrow('NEXT_NOT_FOUND')
  })
})
