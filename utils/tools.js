import fs from 'fs'
import * as path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

export const getAllPosts = () => {
  const files = fs.readdirSync(path.join('posts'))

  const posts = files.map((filename) => {
    const mdxWithMeta = fs.readFileSync(
      path.join('posts', filename, 'index.mdx'),
      'utf-8'
    )
    const { data: frontMatter } = matter(mdxWithMeta)

    return {
      frontMatter,
      slug: filename,
      readingTime: readingTime(mdxWithMeta).text,
    }
  })

  return posts
}

export const getFrontMatterOnly = () => {
  const files = fs.readdirSync(path.join('posts'))

  const posts = files.map((filename) => {
    const mdxWithMeta = fs.readFileSync(
      path.join('posts', filename, 'index.mdx'),
      'utf-8'
    )
    const { data: frontMatter } = matter(mdxWithMeta)

    return {
      frontMatter,
    }
  })

  return posts
}
