import PostListItem from '@/components/PostListItem'
import { getAllPosts } from '@/utils/file-helpers'

async function PostList() {
  const posts = await getAllPosts()
  return (
    <div className="-ml-4 mb-6 mt-2 flex w-full flex-col pb-6 pt-4 sm:ml-0 sm:max-w-4xl sm:pt-8">
      {posts.map((post) => {
        return <PostListItem {...post} key={post.frontMatter.id} />
      })}
    </div>
  )
}

export default PostList
