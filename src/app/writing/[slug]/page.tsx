import { MDXRemote } from 'next-mdx-remote/rsc'
import CoolLetters from '@/components/CoolLetters'
import { type MyFrontmatter } from '@/utils/helpers'
import Thanks from '@/components/Thanks'
import { loadBlogPost } from '@/utils/helpers'
import { BLOG_TITLE } from '@/utils/constants'
import COMPONENT_MAP from '@/utils/mdx-components'

// Not sure if I am doing this typescript stuff here right - but I will check later
export async function generateMetadata(
  props: {
    params: Promise<{ slug: string }>
  }
) {
  const params = await props.params;
  const {
    frontMatter,
  }: { frontMatter: { [key: string]: MyFrontmatter['description'] } } =
    await loadBlogPost(params.slug)
  return {
    title: `${frontMatter.title} | ${BLOG_TITLE}`,
    description: frontMatter.description,
  }
}

async function PostPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const { frontMatter, content, timeToRead } = await loadBlogPost(params.slug)

  return (
    <div className="px-6 pt-6 pb-10 mx-auto my-10 max-w-[900px]">
      <CoolLetters>{frontMatter.title}</CoolLetters>
      <span className="block py-4 my-6 text-xl">{frontMatter.date}</span>
      <span className="block py-4 my-2 text-xl">{timeToRead}</span>
      <MDXRemote source={content} components={COMPONENT_MAP} />
      <Thanks />
    </div>
  )
}

export default PostPage
