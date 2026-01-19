import PostListItem from '@/components/PostListItem'
import { getAllPosts } from '@/utils/helpers'

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

  return (
    <div className="-mx-3 mb-6 mt-2 flex w-full flex-col pb-6 pt-4 sm:mx-0 sm:max-w-4xl sm:pt-8">
      {posts.map((post) => {
        return <PostListItem {...post} key={post.frontMatter.id} />
      })}
    </div>
  )
}

export default PostList
