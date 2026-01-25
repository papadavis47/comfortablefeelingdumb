import { MDXRemote } from 'next-mdx-remote/rsc'
import CoolLetters from '@/components/CoolLetters'
import Thanks from '@/components/Thanks'
import { loadBlogPost } from '@/utils/helpers'
import { BLOG_TITLE } from '@/utils/constants'
import COMPONENT_MAP from '@/utils/mdx-components'

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>
}): Promise<{ title: string; description: string }> {
  const params = await props.params

  const { frontMatter } = await loadBlogPost(params.slug)

  return {
    title: `${frontMatter.title} | ${BLOG_TITLE}`,
    description: frontMatter.description,
  }
}

async function PostPage(props: {
  params: Promise<{ slug: string }>
}): Promise<React.JSX.Element> {
  const params = await props.params
  const { frontMatter, content, timeToRead } = await loadBlogPost(params.slug)

  return (
    <div className="px-6 pt-6 pb-10 mx-auto my-10 max-w-[900px]">
      <CoolLetters>{frontMatter.title}</CoolLetters>
      <span className="block md:py-4 pb-2 pt-4 md:my-6 my-2 md:text-xl text-lg italic text-subtle">
        {frontMatter.date}
      </span>
      <span className="block py-4 my-2 text-lg text-subtle">{timeToRead}</span>
      <MDXRemote source={content} components={COMPONENT_MAP} />
      <Thanks slug={params.slug} />
    </div>
  )
}

export default PostPage
