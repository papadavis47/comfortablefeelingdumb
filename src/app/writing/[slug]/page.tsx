import { MDXRemote } from 'next-mdx-remote/rsc'
import Thanks from '@/components/Thanks'
import { loadBlogPost } from '@/utils/helpers'
import { BLOG_TITLE } from '@/utils/constants'
import Image from 'next/image'

export async function generateMetadata({ params }) {
  const { frontMatter } = await loadBlogPost(params.slug)
  return {
    title: `${frontMatter.title} | ${BLOG_TITLE}`,
    description: frontMatter.description,
  }
}

async function PostPage({ params }) {
  const { frontMatter, content, timeToRead } = await loadBlogPost(params.slug)
  return (
    <div className="prose mx-auto my-10 px-6 pb-10 pt-6 lg:prose-xl">
      <h1 className="not-prose bg-gradient-to-l from-jacksonsPurple to-purpleMountain bg-clip-text pb-2 text-4xl font-extrabold capitalize text-transparent lg:text-6xl">
        {frontMatter.title}
      </h1>
      <p>{frontMatter.date}</p>
      <p>{timeToRead}</p>
      <MDXRemote source={content} components={{ Image }} />
      <Thanks />
    </div>
  )
}

export default PostPage
