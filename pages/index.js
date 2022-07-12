import PostList from '../components/PostList'
import LandingTitle from '../components/LandingTitle'
import SubjectsList from '../components/SubjectsList'
import Head from 'next/head.js'
import { getAllPosts } from '../utils/tools.js'

const Home = ({ posts, subjects }) => {
  return (
    <>
      <Head>
        <title>Comfortable Feeling Dumb</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col items-center py-2 mt-6">
        <main className="flex flex-col items-center justify-start flex-1 w-full px-6 md:px-20">
          <LandingTitle />
          <PostList posts={posts} />
          <SubjectsList subjects={subjects} />
        </main>
      </div>
    </>
  )
}

export const getStaticProps = async () => {
  const posts = getAllPosts()

  const allTags = posts.map((post) => post.frontMatter.tags)

  return {
    props: {
      posts,
      subjects: [...new Set(allTags.flat())],
    },
  }
}

export default Home
