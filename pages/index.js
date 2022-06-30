import Head from 'next/head'
import Footer from '../components/Footer'
import Link from 'next/link'
import fs from 'fs'
import * as path from 'path'
import matter from 'gray-matter'
import { cwd } from 'process'

const Home = ({ posts }) => {
  return (
    <div className="flex flex-col items-center min-h-screen py-2 mt-10">
      <Head>
        <title>My TailwindCSS / Next.js Starter</title>
        <link rel="icon" href="/surfing.ico" />
      </Head>

      <main className="flex flex-col items-center justify-start flex-1 w-full px-20 text-center">
        <h1 className="text-4xl font-bold text-gray-700">
          Comfortable Feeling Dumb
        </h1>
        <h2 className="text-3xl font-bold text-gray-700">A Programming Blog</h2>
        <p className="mt-4 text-sky-800">
          About becoming comfortable with the discomfort of being at the edge of
          my knowlege.
        </p>
        <div>
          {posts.map((post) => {
            return (
              <Link href={'/writing/' + post.slug} key={post.frontMatter.id}>
                <a className="block">
                  <div>
                    <h1>{post.frontMatter.title}</h1>
                    <p>{post.frontMatter.description}</p>
                    <p>{post.frontMatter.date}</p>
                    <div>
                      {post.frontMatter.tags.map((tag) => (
                        <small className="mx-2">{tag}</small>
                      ))}
                    </div>
                  </div>
                </a>
              </Link>
            )
          })}
        </div>
      </main>
      <Footer />
    </div>
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
    }
  })

  return {
    props: {
      posts,
    },
  }
}

export default Home
