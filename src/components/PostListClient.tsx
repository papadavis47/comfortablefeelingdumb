'use client'

import { useState } from 'react'
import PostListItem from '@/components/PostListItem'
import { type MyFrontmatter } from '@/utils/helpers'

type Post = {
  frontMatter: MyFrontmatter
  readingTime: string
  slug: string
}

type PostListClientProps = {
  posts: Post[]
}

function PostListClient({ posts }: PostListClientProps) {
  const [activeId, setActiveId] = useState<number | null>(null)

  return (
    <div className="mb-6 mt-2 flex w-full flex-col pb-6 pt-4 sm:max-w-4xl sm:pt-8">
      {posts.map((post) => {
        const isActive = activeId === post.frontMatter.id
        const isDimmed = activeId !== null && !isActive

        return (
          <PostListItem
            {...post}
            key={post.frontMatter.id}
            isDimmed={isDimmed}
            onHoverStart={() => setActiveId(post.frontMatter.id)}
            onHoverEnd={() => setActiveId(null)}
          />
        )
      })}
    </div>
  )
}

export default PostListClient
