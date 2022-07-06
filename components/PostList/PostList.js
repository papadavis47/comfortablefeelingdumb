import PostListItem from '../PostListItem'

function PostList({ posts }) {
  return (
    <div className="flex flex-col w-full pt-4 pb-10 mt-2 mb-12 sm:max-w-4xl sm:pt-8">
      {posts.map((post) => {
        return <PostListItem {...post} key={post.frontMatter.id} />
      })}
    </div>
  )
}

export default PostList
