import PostListItem from '@/components/PostListItem'
import { getAllPosts } from '@/utils/helpers'

// IMPROVED TYPE DEFINITION: Instead of allowing null/undefined, be more specific
// This makes the code more predictable and safer
type PostListProps = {
  // OPTIONAL BUT SPECIFIC: subject is either a string or not provided at all
  // This is cleaner than string | null | undefined which allows confusing states
  subject?: string
}

// EXPLICIT RETURN TYPE: Makes it clear this component returns JSX
async function PostList({ subject }: PostListProps): Promise<React.JSX.Element> {
  let posts = await getAllPosts()
  
  // TYPE NARROWING: TypeScript now knows that if subject exists, it's definitely a string
  // No need to worry about null or undefined cases
  if (subject) {
    posts = posts.filter((post) => post.frontMatter.topics.includes(subject))
  }
  
  return (
    <div className="-ml-4 mb-6 mt-2 flex w-full flex-col pb-6 pt-4 sm:ml-0 sm:max-w-4xl sm:pt-8">
      {posts.map((post) => {
        return <PostListItem {...post} key={post.frontMatter.id} />
      })}
    </div>
  )
}

export default PostList
