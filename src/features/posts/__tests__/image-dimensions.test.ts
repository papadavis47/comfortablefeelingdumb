import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'

/**
 * Guards against the next/image "width or height modified, but not the other"
 * warning: every <Image> in posts/*.mdx must declare a width/height whose ratio
 * matches the source file. Tailwind Preflight's `img { height: auto }` renders
 * the real ratio, so a mismatched declaration desyncs rendered vs declared size.
 *
 * See learning/mdx-image-dimensions.md for the full explanation + how to avoid it.
 */

const ROOT = process.cwd()
const POSTS_DIR = path.join(ROOT, 'posts')
const RATIO_TOLERANCE = 0.01 // 1% — catches wrong shapes, allows integer rounding

// --- minimal intrinsic-dimension reader (png / jpeg / webp) ------------------

type Size = { width: number; height: number }

function readImageSize(buf: Buffer): Size {
  // PNG: 8-byte signature, then IHDR with width/height as uint32 BE
  if (buf.length >= 24 && buf.readUInt32BE(0) === 0x89504e47) {
    return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) }
  }
  // JPEG: scan for a Start-Of-Frame marker
  if (buf[0] === 0xff && buf[1] === 0xd8) {
    let off = 2
    while (off < buf.length) {
      if (buf[off] !== 0xff) {
        off++
        continue
      }
      const marker = buf[off + 1]
      const isSOF =
        marker >= 0xc0 &&
        marker <= 0xcf &&
        marker !== 0xc4 &&
        marker !== 0xc8 &&
        marker !== 0xcc
      if (isSOF) {
        return {
          height: buf.readUInt16BE(off + 5),
          width: buf.readUInt16BE(off + 7),
        }
      }
      off += 2 + buf.readUInt16BE(off + 2) // skip this segment
    }
  }
  // WebP: RIFF container, three sub-formats
  if (buf.length >= 30 && buf.toString('ascii', 0, 4) === 'RIFF') {
    const fmt = buf.toString('ascii', 12, 16)
    if (fmt === 'VP8 ') {
      return {
        width: buf.readUInt16LE(26) & 0x3fff,
        height: buf.readUInt16LE(28) & 0x3fff,
      }
    }
    if (fmt === 'VP8L') {
      const bits = buf.readUInt32LE(21)
      return {
        width: (bits & 0x3fff) + 1,
        height: ((bits >> 14) & 0x3fff) + 1,
      }
    }
    if (fmt === 'VP8X') {
      return {
        width: 1 + (buf[24] | (buf[25] << 8) | (buf[26] << 16)),
        height: 1 + (buf[27] | (buf[28] << 8) | (buf[29] << 16)),
      }
    }
  }
  throw new Error('Unsupported image format')
}

// --- extract every <Image> from the posts -----------------------------------

type ImageRef = {
  post: string
  src: string
  width: number
  height: number
}

function collectImages(): ImageRef[] {
  const refs: ImageRef[] = []
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith('.mdx'))

  for (const file of files) {
    const content = fs.readFileSync(path.join(POSTS_DIR, file), 'utf8')
    const blocks = content.match(/<Image\b[\s\S]*?\/>/g) ?? []

    for (const block of blocks) {
      const className = /className=['"]([^'"]+)['"]/.exec(block)?.[1] ?? ''
      // object-cover intentionally decouples display ratio from the source
      if (className.includes('object-cover')) continue

      const src = /src=['"{]+([^'"}]+)['"}]+/.exec(block)?.[1]
      const width = /width=\{(\d+)\}/.exec(block)?.[1]
      const height = /height=\{(\d+)\}/.exec(block)?.[1]
      // fill/responsive images without explicit dimensions are exempt
      if (!src || !width || !height) continue

      refs.push({
        post: file,
        src,
        width: Number(width),
        height: Number(height),
      })
    }
  }
  return refs
}

// --- the check ---------------------------------------------------------------

describe('MDX <Image> aspect ratios match their source files', () => {
  const images = collectImages()

  it('finds images to check', () => {
    expect(images.length).toBeGreaterThan(0)
  })

  it.each(images)(
    '$post — $src ($width×$height)',
    ({ src, width, height }) => {
      const file = path.join(ROOT, 'public', src)
      expect(fs.existsSync(file), `missing image file: public${src}`).toBe(true)

      const actual = readImageSize(fs.readFileSync(file))
      const declaredRatio = width / height
      const actualRatio = actual.width / actual.height
      const drift = Math.abs(declaredRatio - actualRatio) / actualRatio

      expect(
        drift,
        `Aspect ratio mismatch for public${src}:\n` +
          `  declared ${width}×${height} (ratio ${declaredRatio.toFixed(4)})\n` +
          `  source   ${actual.width}×${actual.height} (ratio ${actualRatio.toFixed(4)})\n` +
          `  drift ${(drift * 100).toFixed(2)}% > ${(RATIO_TOLERANCE * 100).toFixed(0)}%\n` +
          `  Fix: set height to round(${width} × ${actual.height}/${actual.width}) = ` +
          `${Math.round((width * actual.height) / actual.width)} (keeping width ${width}).`
      ).toBeLessThanOrEqual(RATIO_TOLERANCE)
    }
  )
})
