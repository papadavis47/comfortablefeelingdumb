import Head from 'next/head'
import Link from 'next/link'
import fs from 'fs'
import * as path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

const Home = ({ posts }) => {
  return (
    <div className="flex flex-col items-center py-2 mt-6">
      <main className="flex flex-col items-center justify-start flex-1 w-full px-6 md:px-20">
        <div className="text-neutral-800">
          <h1 className="text-5xl italic font-bold">
            "Comfortable Feeling Dumb"
          </h1>
          <h2 className="py-4 text-xl font-bold sm:text-center lg:text-2xl">
            A Blog About Web Development
          </h2>
        </div>
        <div className="flex flex-col w-full pt-4 pb-10 mt-2 mb-12 sm:max-w-4xl sm:pt-8">
          {posts.map((post) => {
            return (
              <div className="my-4 " key={post.frontMatter.id}>
                <div className="flex flex-col ">
                  <Link href={'/writing/' + post.slug}>
                    <h1 className="py-2 text-2xl font-bold capitalize cursor-pointer text-neutral-700">
                      {post.frontMatter.title}
                    </h1>
                  </Link>
                  <p className="py-2 text-md text-stone-600">
                    {post.frontMatter.date}
                  </p>
                  <p className="pb-2 text-xl italic font-bold text-neutral-700">
                    {post.frontMatter.description}
                  </p>
                  <p className="mb-4 text-md text-neutral-600">
                    {post.readingTime}
                  </p>
                  <div>
                    {post.frontMatter.tags.map((tag, index) => (
                      <span
                        className="mr-2 inline-flex items-center rounded-md bg-neutral-100 px-2.5 py-0.5 text-sm font-medium text-neutral-800"
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
      readingTime: readingTime(mdxWithMeta).text,
    }
  })

  return {
    props: {
      posts,
    },
  }
}

export default Home
