import { MDXRemote } from 'next-mdx-remote/rsc'
import Thanks from '@/components/Thanks'
import { loadBlogPost } from '@/utils/helpers'
import { BLOG_TITLE } from '@/utils/constants'
import COMPONENT_MAP from '@/utils/mdx-components'

export async function generateMetadata({ params }) {
  const { frontMatter } = await loadBlogPost(params.slug)
  return {
    title: `${frontMatter.title} | ${BLOG_TITLE}`,
    description: frontMatter.description,
  }
}

async function PostPage({ params }: { params: { slug: string } }) {
  const { frontMatter, content, timeToRead } = await loadBlogPost(params.slug)

  return (
    <div className="prose prose-slate mx-auto my-10 px-6 pb-10 pt-6 lg:prose-xl prose-headings:text-3xl prose-p:text-colorStrongestText lg:prose-p:text-2xl lg:prose-li:text-2xl">
      <h1 className="not-prose bg-gradient-to-l from-headings to-secondary bg-clip-text pb-2 text-4xl font-extrabold capitalize text-transparent lg:text-7xl">
        {frontMatter.title}
      </h1>
      <span className="my-6 block py-4 text-xl">{frontMatter.date}</span>
      <span className="my-2 block py-4 text-xl">{timeToRead}</span>
      <MDXRemote source={content} components={COMPONENT_MAP} />
      <Thanks />
    </div>
  )
}

export default PostPage
