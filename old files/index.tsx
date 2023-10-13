import { GetStaticProps } from 'next'
import PostList from '../components_old/PostList'
import LandingTitle from '../components_old/LandingTitle'
import SubjectsList from '../components_old/SubjectsList'
import Head from 'next/head'
import { getAllPosts } from '../utils/dataFetching.js'

const Home = ({ posts, subjects }) => {
  return (
    <>
      <Head>
        <title>Comfortable Feeling Dumb</title>
        <meta
          name="description"
          content="A Blog About Web Development And Distance Running"
        ></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="mt-6 flex flex-col items-center py-2">
        <main className="flex w-full flex-1 flex-col items-center justify-start px-6 md:px-20">
          <LandingTitle />
          <PostList posts={posts} />
          <SubjectsList subjects={subjects} />
        </main>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
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
