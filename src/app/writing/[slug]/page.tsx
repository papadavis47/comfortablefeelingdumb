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
    <div className="px-6 pt-2.5 pb-10 mx-auto my-6 max-w-[900px]">
      <CoolLetters>{frontMatter.title}</CoolLetters>
      <span className="block md:py-4 pb-2 pt-4 md:my-6 my-2 md:text-lg text-md italic text-subtle">
        {frontMatter.date}
      </span>
      <span className="block py-4 my-2 text-md md:text-lg  text-subtle">
        {timeToRead}
      </span>
      <MDXRemote source={content} components={COMPONENT_MAP} options={{ blockJS: false }} />
      <Thanks slug={params.slug} />
      <EmailAuthor />
    </div>
  )
}

export default PostPage
