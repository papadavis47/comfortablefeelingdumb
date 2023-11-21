import { MDXRemote } from 'next-mdx-remote/rsc'
import Thanks from '@/components/Thanks'
import { loadBlogPost } from '@/utils/file-helpers'
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
      <h1 className="not-prose bg-gradient-to-l from-jacksonsPurple to-purpleMountain bg-clip-text pb-2 font-extrabold capitalize text-transparent lg:text-6xl">
        {frontMatter.title}
      </h1>
      <p>{frontMatter.date}</p>
      <p>{timeToRead}</p>
      <MDXRemote source={content} components={{ Image }} />
      <Thanks />
    </div>
  )
}

// export const getStaticPaths: GetStaticPaths = async () => {
//   const files = fs.readdirSync(path.join('posts'))
//   const paths = files.map((filename) => {
//     return {
//       params: {
//         slug: filename,
//       },
//     }
//   })

//   return {
//     paths,
//     fallback: false,
//   }
// }

// export const getStaticProps: GetStaticProps = async ({ params: { slug } }) => {
//   // Doing some type checking below! Making sure slug is string : )
//   // Learning the TypeScript kung fu!
//   let goodSlug
//   if (typeof slug === 'string') {
//     goodSlug = slug
//   }
//   const mdxWithMeta = fs.readFileSync(
//     path.join('posts', goodSlug, 'index.mdx'),
//     'utf-8'
//   )

//   const { data: frontMatter, content } = matter(mdxWithMeta)

//   const mdxSource = await serialize(content)

//   return {
//     props: {
//       frontMatter,
//       slug,
//       mdxSource,
//       readingTime: readingTime(content).text,
//     },
//   }
// }

export default PostPage
