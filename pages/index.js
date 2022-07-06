import fs from 'fs'
import * as path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import PostList from '../components/PostList'
import LandingTitle from '../components/LandingTitle'
import Head from 'next/head.js'

const Home = ({ posts, subjects }) => {
  return (
    <>
      <Head>
        <title>Comfortable Feeling Dumb</title>
        <link rel="icon" href="/water_wave.ico" />
      </Head>
      <div className="flex flex-col items-center py-2 mt-6">
        <main className="flex flex-col items-center justify-start flex-1 w-full px-6 md:px-20">
          <LandingTitle />
          <PostList posts={posts} />
        </main>
      </div>
      <div>
        {subjects?.map((item, index) => (
          <p key={index}>{item}</p>
        ))}
      </div>
    </>
  )
}

export const getStaticProps = async () => {
  const files = fs.readdirSync(path.join('posts'))

  const posts = files.map((filename) => {
    const mdxWithMeta = fs.readFileSync(path.join('posts', filename), 'utf-8')
    const { data: frontMatter } = matter(mdxWithMeta)

    return {
      frontMatter,
      slug: filename.split('.')[0],
      readingTime: readingTime(mdxWithMeta).text,
    }
  })

  const allTags = posts.map((post) => post.frontMatter.tags)

  return {
    props: {
      posts,
      subjects: [...new Set(allTags.flat())],
    },
  }
}

export default Home
