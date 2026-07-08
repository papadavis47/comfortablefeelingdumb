import PostListClient from '@/features/posts/PostListClient'
import { getAllPosts } from '@/features/posts/posts'

type PostListProps = {
  subject?: string
}

async function PostList({
  subject,
}: PostListProps): Promise<React.JSX.Element> {
  let posts = await getAllPosts()

  if (subject) {
    posts = posts.filter((post) => post.frontMatter.topics.includes(subject))
  }

  return <PostListClient posts={posts} />
}

export default PostList
