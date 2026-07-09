import { ImageResponse } from 'next/og'
import { loadBlogPost } from '@/features/posts/posts'
import { BLOG_TITLE } from '@/lib/constants'

export const alt = 'Blog post preview'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<ImageResponse> {
  const { slug } = await params
  const { frontMatter } = await loadBlogPost(slug)

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '60px',
          background: 'linear-gradient(135deg, #f9f8f5 0%, #fde4d4 40%, #ffe4e3 75%, #f9f8f5 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative circles */}
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            right: '-100px',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'rgba(151, 81, 36, 0.16)',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-150px',
            left: '-150px',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'rgba(166, 75, 78, 0.14)',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '200px',
            right: '100px',
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            background: 'rgba(158, 122, 35, 0.12)',
            display: 'flex',
          }}
        />

        {/* Blog title and subtitle at top */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          <span
            style={{
              fontSize: '28px',
              color: '#975124',
              fontWeight: 500,
              letterSpacing: '0.05em',
            }}
          >
            {BLOG_TITLE}
          </span>
          <span
            style={{
              fontSize: '18px',
              color: '#5f636c',
            }}
          >
            A blog about software engineering ( and trail running )
          </span>
        </div>

        {/* Post title - main content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            maxWidth: '900px',
          }}
        >
          <h1
            style={{
              fontSize: frontMatter.title.length > 40 ? '56px' : '72px',
              fontWeight: 700,
              color: '#161b24',
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            {frontMatter.title}
          </h1>
          {frontMatter.description && (
            <p
              style={{
                fontSize: '26px',
                color: '#5f636c',
                lineHeight: 1.4,
                margin: 0,
                maxWidth: '800px',
              }}
            >
              {frontMatter.description.length > 120
                ? frontMatter.description.slice(0, 117) + '...'
                : frontMatter.description}
            </p>
          )}
        </div>

        {/* Date at bottom */}
        <span
          style={{
            fontSize: '20px',
            color: '#5f636c',
          }}
        >
          {frontMatter.date}
        </span>
      </div>
    ),
    {
      ...size,
    }
  )
}
