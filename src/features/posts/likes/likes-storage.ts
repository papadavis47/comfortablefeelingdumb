import { Redis } from '@upstash/redis'

interface LikesStorage {
  getLikes(slug: string): Promise<number>
  incrementLikes(slug: string): Promise<number>
}

class UpstashStorage implements LikesStorage {
  private redis: Redis

  constructor() {
    this.redis = new Redis({
      url: process.env.KV_REST_API_URL!,
      token: process.env.KV_REST_API_TOKEN!,
    })
  }

  async getLikes(slug: string): Promise<number> {
    const likes = await this.redis.get<number>(`likes:${slug}`)
    return likes ?? 0
  }

  async incrementLikes(slug: string): Promise<number> {
    return await this.redis.incr(`likes:${slug}`)
  }
}

class InMemoryStorage implements LikesStorage {
  private store: Map<string, number> = new Map()

  async getLikes(slug: string): Promise<number> {
    return this.store.get(slug) ?? 0
  }

  async incrementLikes(slug: string): Promise<number> {
    const current = this.store.get(slug) ?? 0
    const next = current + 1
    this.store.set(slug, next)
    return next
  }
}

let storage: LikesStorage | null = null

export function getLikesStorage(): LikesStorage {
  if (storage) return storage

  if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
    storage = new UpstashStorage()
  } else {
    console.warn('Upstash Redis not configured, using in-memory storage')
    storage = new InMemoryStorage()
  }

  return storage
}
