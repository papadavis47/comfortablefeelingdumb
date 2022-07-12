import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import readingTime from 'reading-time'
import Head from 'next/head.js'
// import CoolHeading from '../components/CoolHeading'
import Image from 'next/image'
const components = { Image }
const PostPage = ({ frontMatter: { title, date }, mdxSource, readingTime }) => {
  return (
    <>
      <Head>
        <title>CFD - {title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="px-6 pt-6 pb-10 mx-auto my-10 prose lg:prose-xl">
        <h1 className="capitalize">{title}</h1>
        <p>{date}</p>
        <p>{readingTime}</p>
        <MDXRemote {...mdxSource} components={components} />
      </div>
    </>
  )
}

export const getStaticPaths = async () => {
  const files = fs.readdirSync(path.join('posts'))
  const paths = files.map((filename) => {
    return {
      params: {
        slug: filename,
      },
    }
  })

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = async ({ params: { slug } }) => {
  const mdxWithMeta = fs.readFileSync(
    path.join('posts', slug, 'index.mdx'),
    'utf-8'
  )

  const { data: frontMatter, content } = matter(mdxWithMeta)

  const mdxSource = await serialize(content)

  return {
    props: {
      frontMatter,
      slug,
      mdxSource,
      readingTime: readingTime(content).text,
    },
  }
}

export default PostPage
