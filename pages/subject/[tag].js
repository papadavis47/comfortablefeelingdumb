import fs from 'fs'
import * as path from 'path'
import matter from 'gray-matter'
import PostList from '../../components/PostList'
import readingTime from 'reading-time'

const SubjectPage = ({ filteredPosts }) => {
  return (
    <>
      <div className="flex flex-col items-center py-2 mt-6">
        <main className="flex flex-col items-center justify-start flex-1 w-full px-6 md:px-20">
          <PostList posts={filteredPosts} />
        </main>
      </div>
    </>
  )
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join('posts'))

  const posts = files.map((filename) => {
    const mdxWithMeta = fs.readFileSync(
      path.join('posts', filename, 'index.mdx'),
      'utf-8'
    )

    const { data: frontMatter } = matter(mdxWithMeta)

    return {
      frontMatter,
    }
  })

  const allTags = posts.map((post) => post.frontMatter.tags)
  const paths = [...new Set(allTags.flat())].map((tag) => {
    return {
      params: { tag },
    }
  })

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const files = fs.readdirSync(path.join('posts'))

  const filteredPosts = files
    .map((filename) => {
      const mdxWithMeta = fs.readFileSync(
        path.join('posts', filename, 'index.mdx'),
        'utf-8'
      )

      const { data: frontMatter } = matter(mdxWithMeta)

      return {
        frontMatter,
        slug: filename,
        readingTime: readingTime(mdxWithMeta).text,
      }
    })
    .filter((post) => post.frontMatter.tags.includes(params.tag))

  return {
    props: {
      filteredPosts,
    },
  }
}

export default SubjectPage
