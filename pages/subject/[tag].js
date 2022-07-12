import PostList from '../../components/PostList'
import { getAllPosts } from '../../utils/dataFetching.js'
import { getFrontMatterOnly } from '../../utils/dataFetching.js'

const SubjectPage = ({ filteredPosts }) => {
  return (
    <>
      <div className="flex flex-col items-center py-2 mt-6">
        <main className="flex flex-col items-center justify-start flex-1 w-full px-6 md:px-20">
          <PostList posts={filteredPosts} />
        </main>
      </div>
    </>
  )
}

export async function getStaticPaths() {
  const posts = getFrontMatterOnly().map((post) => post.frontMatter.tags)
  const paths = [...new Set(posts.flat())].map((tag) => {
    return {
      params: { tag },
    }
  })

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const filteredPosts = getAllPosts().filter((post) =>
    post.frontMatter.tags.includes(params.tag)
  )

  return {
    props: {
      filteredPosts,
    },
  }
}

export default SubjectPage
