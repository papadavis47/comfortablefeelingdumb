import { vi, describe, it, expect, beforeEach } from 'vitest'
import { NextRequest } from 'next/server'

// Mock next/headers cookies
const mockCookieStore = {
  has: vi.fn(),
}

vi.mock('next/headers', () => ({
  cookies: vi.fn(() => Promise.resolve(mockCookieStore)),
}))

// Mock likes-storage
const mockStorage = {
  getLikes: vi.fn(),
  incrementLikes: vi.fn(),
}

vi.mock('@/lib/likes-storage', () => ({
  getLikesStorage: () => mockStorage,
}))

import { GET, POST } from '../route'

function makeRequest(method: string): NextRequest {
  return new NextRequest(`http://localhost:3000/api/likes/test-post`, { method })
}

const params = Promise.resolve({ slug: 'test-post' })

beforeEach(() => {
  vi.clearAllMocks()
})

describe('GET /api/likes/[slug]', () => {
  it('returns likes count and hasLiked from cookie', async () => {
    mockStorage.getLikes.mockResolvedValue(5)
    mockCookieStore.has.mockReturnValue(false)

    const res = await GET(makeRequest('GET'), { params })
    const data = await res.json()

    expect(data.likes).toBe(5)
    expect(data.hasLiked).toBe(false)
  })

  it('returns hasLiked true when cookie exists', async () => {
    mockStorage.getLikes.mockResolvedValue(3)
    mockCookieStore.has.mockReturnValue(true)

    const res = await GET(makeRequest('GET'), { params })
    const data = await res.json()

    expect(data.hasLiked).toBe(true)
  })
})

describe('POST /api/likes/[slug]', () => {
  it('increments likes and returns 200', async () => {
    mockCookieStore.has.mockReturnValue(false)
    mockStorage.incrementLikes.mockResolvedValue(6)

    const res = await POST(makeRequest('POST'), { params })
    const data = await res.json()

    expect(res.status).toBe(200)
    expect(data.likes).toBe(6)
    expect(data.hasLiked).toBe(true)
    expect(mockStorage.incrementLikes).toHaveBeenCalledWith('test-post')
  })

  it('returns 400 when cookie already exists', async () => {
    mockCookieStore.has.mockReturnValue(true)
    mockStorage.getLikes.mockResolvedValue(10)

    const res = await POST(makeRequest('POST'), { params })
    const data = await res.json()

    expect(res.status).toBe(400)
    expect(data.error).toBe('Already liked')
    expect(data.hasLiked).toBe(true)
    expect(mockStorage.incrementLikes).not.toHaveBeenCalled()
  })
})
