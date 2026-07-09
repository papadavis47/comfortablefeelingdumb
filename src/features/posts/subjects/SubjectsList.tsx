import Link from 'next/link'
import { getAllPosts } from '@/features/posts/posts'

async function SubjectsList() {
  const posts = await getAllPosts()
  const subjects = [
    ...new Set(posts.map((post) => post.frontMatter.topics).flat()),
  ]
  return (
    <div className="mb-6 flex w-full flex-wrap pb-12 sm:max-w-4xl">
      {subjects?.map((topic, index) => (
        <Link
          href={`/subject/${topic}`}
          key={index}
          className="inline-flex cursor-pointer mx-1 mt-2 items-center rounded-full bg-accent-bg px-4 py-2.5 font-mono text-meta lowercase leading-4 text-accent focus:ring-2 focus:ring-accent focus:ring-offset-2"
        >
          {topic}
        </Link>
      ))}
    </div>
  )
}

export default SubjectsList
