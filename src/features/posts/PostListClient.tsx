import PostListItem from '@/features/posts/PostListItem'
import { type MyFrontmatter } from '@/features/posts/types'

type Post = {
  frontMatter: MyFrontmatter
  readingTime: string
  slug: string
}

type PostListClientProps = {
  posts: Post[]
}

function PostListClient({ posts }: PostListClientProps) {
  return (
    <div className="mb-6 mt-2 flex w-full flex-col pb-6 pt-4 sm:max-w-4xl sm:pt-8">
      {posts.map((post) => (
        <PostListItem {...post} key={post.frontMatter.id} />
      ))}
    </div>
  )
}

export default PostListClient
