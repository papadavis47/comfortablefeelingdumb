import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
// import CoolHeading from '../components/CoolHeading'
import Image from 'next/image'
const components = { Image }
const PostPage = ({ frontMatter: { title, date }, mdxSource }) => {
  return (
    <div className="m-10 prose lg:prose-xl">
      <h1>{title}</h1>
      <p>{date}</p>
      <MDXRemote {...mdxSource} components={components} />
    </div>
  )
}

export const getStaticPaths = async () => {
  const files = fs.readdirSync(path.join('posts'))
  const paths = files.map((filename) => {
    return {
      params: {
        slug: filename.replace('.mdx', ''),
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
    path.join('posts', slug + '.mdx'),
    'utf-8'
  )

  const { data: frontMatter, content } = matter(mdxWithMeta)

  const mdxSource = await serialize(content)

  return {
    props: {
      frontMatter,
      slug,
      mdxSource,
    },
  }
}

export default PostPage
