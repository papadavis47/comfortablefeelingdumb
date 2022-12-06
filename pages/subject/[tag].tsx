import { GetStaticProps, GetStaticPaths } from 'next'
import PostList from '../../components/PostList'
import { getAllPosts } from '../../utils/dataFetching.js'
import { getFrontMatterOnly } from '../../utils/dataFetching.js'
import FilteredTitle from '../../components/FilteredTitle'

const SubjectPage = ({ filteredPosts, subject }) => {
  return (
    <>
      <div className="mt-6 flex flex-col items-center py-2">
        <FilteredTitle subject={subject} />
        <main className="flex w-full flex-1 flex-col items-center justify-start px-6 md:px-20">
          <PostList posts={filteredPosts} />
        </main>
      </div>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
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

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const subject = params.tag
  const filteredPosts = getAllPosts().filter((post) =>
    post.frontMatter.tags.includes(subject)
  )

  return {
    props: {
      filteredPosts,
      subject,
    },
  }
}

export default SubjectPage
