import { ImageResponse } from 'next/og'
import { BLOG_TITLE } from '@/utils/constants'

export const alt = BLOG_TITLE
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default function Image(): ImageResponse {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px',
          background: 'linear-gradient(135deg, #faf9f7 0%, #e8e4f0 25%, #d4e4f7 50%, #e0d4f0 75%, #f7e4e8 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative circles */}
        <div
          style={{
            position: 'absolute',
            top: '-120px',
            right: '-120px',
            width: '450px',
            height: '450px',
            borderRadius: '50%',
            background: 'rgba(147, 112, 219, 0.2)',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-180px',
            left: '-180px',
            width: '550px',
            height: '550px',
            borderRadius: '50%',
            background: 'rgba(100, 149, 237, 0.15)',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '150px',
            left: '100px',
            width: '180px',
            height: '180px',
            borderRadius: '50%',
            background: 'rgba(219, 112, 147, 0.2)',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '120px',
            right: '150px',
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            background: 'rgba(147, 112, 219, 0.15)',
            display: 'flex',
          }}
        />

        {/* Blog title */}
        <h1
          style={{
            fontSize: '84px',
            fontWeight: 800,
            color: '#3d3d5c',
            textAlign: 'center',
            lineHeight: 1.1,
            margin: 0,
            letterSpacing: '-0.02em',
          }}
        >
          {BLOG_TITLE}
        </h1>

        {/* Tagline */}
        <p
          style={{
            fontSize: '28px',
            color: '#6b5b7a',
            marginTop: '32px',
            textAlign: 'center',
          }}
        >
          A blog about software engineering ( and trail running )
        </p>
      </div>
    ),
    {
      ...size,
    }
  )
}
