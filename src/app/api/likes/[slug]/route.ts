import { type NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { getLikesStorage } from '@/lib/likes-storage'

const COOKIE_PREFIX = 'liked_'
const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const storage = getLikesStorage()
  const likes = await storage.getLikes(slug)

  const cookieStore = await cookies()
  const hasLiked = cookieStore.has(`${COOKIE_PREFIX}${slug}`)

  return NextResponse.json({ likes, hasLiked })
}

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const cookieStore = await cookies()
  const cookieName = `${COOKIE_PREFIX}${slug}`

  if (cookieStore.has(cookieName)) {
    const storage = getLikesStorage()
    const likes = await storage.getLikes(slug)
    return NextResponse.json(
      { likes, hasLiked: true, error: 'Already liked' },
      { status: 400 }
    )
  }

  const storage = getLikesStorage()
  const likes = await storage.incrementLikes(slug)

  const response = NextResponse.json({ likes, hasLiked: true })
  response.cookies.set(cookieName, 'true', {
    maxAge: ONE_YEAR_SECONDS,
    httpOnly: true,
    sameSite: 'lax',
  })

  return response
}
