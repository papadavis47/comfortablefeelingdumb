import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import readingTime from 'reading-time'
import Head from 'next/head'
// import CoolHeading from '../components/CoolHeading'
import Image from 'next/image'
import Thanks from '../../components/Thanks/Thanks.js'

const components = { Image }
const PostPage = ({
  frontMatter: { title, date, description },
  mdxSource,
  readingTime,
}) => {
  return (
    <>
      <Head>
        <title>CFD - {title}</title>
        <meta name="description" content={description}></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="px-6 pt-6 pb-10 mx-auto my-10 prose lg:prose-xl">
        <h1 className="pb-2 font-extrabold text-transparent capitalize not-prose bg-gradient-to-l from-frenchAzraq to-deepRose bg-clip-text lg:text-6xl">
          {title}
        </h1>
        <p>{date}</p>
        <p>{readingTime}</p>
        <MDXRemote {...mdxSource} components={components} />
        <Thanks />
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
