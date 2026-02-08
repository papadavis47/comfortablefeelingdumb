import { describe, it, expect, beforeEach, vi } from 'vitest'

describe('likes-storage', () => {
  beforeEach(() => {
    vi.resetModules()
    vi.unstubAllEnvs()
  })

  describe('InMemoryStorage (no env vars)', () => {
    it('starts at 0 likes', async () => {
      const { getLikesStorage } = await import('../likes-storage')
      const spy = vi.spyOn(console, 'warn').mockImplementation(() => {})
      const storage = getLikesStorage()

      const likes = await storage.getLikes('test-slug')
      expect(likes).toBe(0)
      spy.mockRestore()
    })

    it('increments likes', async () => {
      const { getLikesStorage } = await import('../likes-storage')
      const spy = vi.spyOn(console, 'warn').mockImplementation(() => {})
      const storage = getLikesStorage()

      const result = await storage.incrementLikes('test-slug')
      expect(result).toBe(1)

      const result2 = await storage.incrementLikes('test-slug')
      expect(result2).toBe(2)
      spy.mockRestore()
    })

    it('tracks slugs independently', async () => {
      const { getLikesStorage } = await import('../likes-storage')
      const spy = vi.spyOn(console, 'warn').mockImplementation(() => {})
      const storage = getLikesStorage()

      await storage.incrementLikes('slug-a')
      await storage.incrementLikes('slug-a')
      await storage.incrementLikes('slug-b')

      expect(await storage.getLikes('slug-a')).toBe(2)
      expect(await storage.getLikes('slug-b')).toBe(1)
      spy.mockRestore()
    })

    it('returns same singleton instance', async () => {
      const { getLikesStorage } = await import('../likes-storage')
      const spy = vi.spyOn(console, 'warn').mockImplementation(() => {})

      const a = getLikesStorage()
      const b = getLikesStorage()
      expect(a).toBe(b)
      spy.mockRestore()
    })
  })

  describe('UpstashStorage selection', () => {
    it('uses Upstash when env vars present', async () => {
      vi.stubEnv('KV_REST_API_URL', 'https://fake.upstash.io')
      vi.stubEnv('KV_REST_API_TOKEN', 'fake-token')

      const spy = vi.spyOn(console, 'warn')
      const { getLikesStorage } = await import('../likes-storage')
      getLikesStorage()

      // Upstash path doesn't emit console.warn (InMemory does)
      expect(spy).not.toHaveBeenCalled()
      spy.mockRestore()
    })
  })
})
