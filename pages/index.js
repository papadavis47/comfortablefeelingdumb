import Head from 'next/head'
import Footer from '../components/Footer'
import Link from 'next/link'
import fs from 'fs'
import * as path from 'path'
import matter from 'gray-matter'

const Home = ({ posts }) => {
  return (
    <div className="flex flex-col items-center min-h-screen py-2 mt-10">
      <Head>
        <title>Comfortable Feeling Dumb</title>
        <link rel="icon" href="/surfing.ico" />
      </Head>

      <main className="flex flex-col items-center justify-start flex-1 w-full px-20">
        <div>
          <h1 className="text-3xl font-bold text-stone-700 md:text-4xl lg:text-5xl">
            Comfortable Feeling Dumb
          </h1>
          <h2 className="py-4 text-3xl font-bold text-center text-stone-700 lg:text-4xl">
            A Programming Blog
          </h2>
        </div>
        <div className="flex flex-col w-full pt-4 pb-10 mt-6 mb-12 sm:max-w-4xl">
          {posts.map((post) => {
            return (
              <div className="my-4 " key={post.frontMatter.id}>
                <div className="flex flex-col ">
                  <Link href={'/writing/' + post.slug}>
                    <h1 className="py-2 text-2xl font-bold capitalize cursor-pointer">
                      {post.frontMatter.title}
                    </h1>
                  </Link>
                  <p className="pb-2 text-xl">
                    "{post.frontMatter.description}"
                  </p>
                  <p className="py-2 text-lg">{post.frontMatter.date}</p>
                  <div>
                    {post.frontMatter.tags.map((tag, index) => (
                      <span
                        className="mr-2 inline-flex items-center rounded-md bg-purple-100 px-2.5 py-0.5 text-sm font-medium text-purple-800"
                        key={index}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
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
