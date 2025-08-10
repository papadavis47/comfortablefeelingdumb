import React from 'react'
import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import { notFound } from 'next/navigation'

// EXPLICIT RETURN TYPES: These help TypeScript catch errors and improve IDE support
function readDirectory(localPath: string): Promise<string[]> {
  return fs.readdir(path.join(process.cwd(), localPath))
}

function readFile(localPath: string): Promise<string> {
  return fs.readFile(path.join(process.cwd(), localPath), 'utf8')
}

export type MyFrontmatter = {
  title: string
  id: number
  date: string
  description: string
  topics: string[]
  isDraft: boolean
}

export type Post = {
  slug: string
  frontMatter: MyFrontmatter
  readingTime: string
}

// TYPE GUARD: This function validates that an unknown object matches our MyFrontmatter type
// Type guards are much safer than type assertions (as MyType) because they:
// 1. Provide runtime validation, not just compile-time assumptions
// 2. Protect against malformed data from external sources (like MDX files)
// 3. Give TypeScript proof that the object is the correct type
function isValidFrontmatter(obj: unknown): obj is MyFrontmatter {
  // Check if the object exists and is actually an object
  if (!obj || typeof obj !== 'object') {
    return false
  }
  
  const candidate = obj as Record<string, unknown>
  
  // Validate each required property exists and has the correct type
  return (
    typeof candidate.title === 'string' &&
    typeof candidate.id === 'number' &&
    typeof candidate.date === 'string' &&
    typeof candidate.description === 'string' &&
    Array.isArray(candidate.topics) &&
    candidate.topics.every((topic: unknown) => typeof topic === 'string') &&
    typeof candidate.isDraft === 'boolean'
  )
}

// EXPLICIT RETURN TYPE: Makes it clear this function returns an array of strings
export async function getSlugsOnly(): Promise<string[]> {
  const files = await readDirectory('/posts')

  const slugs = files.map((file) => file.replace('.mdx', ''))

  return slugs
}

// EXPLICIT RETURN TYPE: Makes it clear this function returns an array of strings
export async function getSubjectsOnly(): Promise<string[]> {
  const posts = await getAllPosts()
  const subjects = [
    ...new Set(posts.map((post) => post.frontMatter.topics).flat()),
  ]

  return subjects
}

// EXPLICIT RETURN TYPE: Adding return type helps with documentation and catches errors
export async function getAllPosts(): Promise<Post[]> {
  const files = await readDirectory('/posts')

  const rawPosts: Post[] = []

  for (const fileName of files) {
    const fileContent = await readFile(`/posts/${fileName}`)
    const { data: frontMatter } = matter(fileContent)

    // USING TYPE GUARD instead of type assertion: This validates the data at runtime
    // Instead of: frontMatter as MyFrontmatter (which could fail silently)
    // We use: isValidFrontmatter() which actually checks the data structure
    if (!isValidFrontmatter(frontMatter)) {
      // Log the error for debugging but continue processing other files
      console.error(`Invalid frontmatter in file: ${fileName}`, frontMatter)
      continue // Skip this file instead of crashing the entire app
    }

    rawPosts.push({
      frontMatter: frontMatter, // TypeScript now knows this is MyFrontmatter
      slug: fileName.replace('.mdx', ''),
      readingTime: readingTime(fileContent).text,
    })
  }

  // This is where I am filtering out the drafts here
  // Before, I was doing it further down the line in multiple places

  const posts = rawPosts.filter((post) => !post.frontMatter.isDraft)

  /* This is where I sort them post in **descending order**. It is simple manual id system since I do not have that many posts and I can order the posts any way I want this way */
  posts.sort((a, b) => b.frontMatter.id - a.frontMatter.id)

  return posts
}

// PROPER TYPING FOR REACT.CACHE: Define the return type explicitly for better type safety
type BlogPostData = {
  frontMatter: MyFrontmatter
  content: string
  timeToRead: string
}

export const loadBlogPost = React.cache(async function loadBlogPost(
  slug: string
): Promise<BlogPostData> {
  const slugs = await getSlugsOnly()
  if (!slugs.includes(slug)) {
    notFound()
  }
  const rawContent = await readFile(`/posts/${slug}.mdx`)
  const timeToRead = readingTime(rawContent).text

  const { data: frontMatter, content } = matter(rawContent)

  // USING TYPE GUARD: Validate frontmatter data at runtime instead of blindly trusting it
  if (!isValidFrontmatter(frontMatter)) {
    throw new Error(`Invalid frontmatter in blog post: ${slug}`)
  }

  return { frontMatter, content, timeToRead }
})
