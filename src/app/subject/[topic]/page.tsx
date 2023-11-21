import PostList from '@/components/PostList'
import FilteredTitle from '@/components/FilteredTitle'

const SubjectPage = ({ params }: { params: { topic: string } }) => {
  const subject = params.topic
  return (
    <div className="mt-6 flex flex-col items-center py-2">
      <FilteredTitle subject={subject} />
      <main className="flex w-full flex-1 flex-col items-center justify-start px-6 md:px-20">
        <PostList subject={subject} />
      </main>
    </div>
  )
}

// export const getStaticPaths: GetStaticPaths = async () => {
//   const posts = getFrontMatterOnly().map((post) => post.frontMatter.tags)
//   const paths = [...new Set(posts.flat())].map((tag) => {
//     return {
//       params: { tag },
//     }
//   })

//   return {
//     paths,
//     fallback: false,
//   }
// }

export default SubjectPage
