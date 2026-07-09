import { MDXRemote } from 'next-mdx-remote/rsc'
import CoolLetters from '@/design-system/CoolLetters'
import Thanks from '@/features/posts/Thanks'
import EmailAuthor from '@/features/posts/EmailAuthor'
import { loadBlogPost } from '@/features/posts/posts'
import { BLOG_TITLE } from '@/lib/constants'
import COMPONENT_MAP from '@/features/posts/mdx/mdx-components'

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
    <div className="px-6 pt-2.5 pb-10 mx-auto my-6 max-w-[44rem]">
      <CoolLetters>{frontMatter.title}</CoolLetters>
      <span className="block mt-4 text-meta font-mono text-fg-muted">
        {frontMatter.date}
      </span>
      <span className="block mt-1 mb-8 text-meta font-mono text-fg-muted">
        {timeToRead}
      </span>
      <MDXRemote source={content} components={COMPONENT_MAP} options={{ blockJS: false }} />
      <Thanks slug={params.slug} />
      <EmailAuthor />
    </div>
  )
}

export default PostPage
