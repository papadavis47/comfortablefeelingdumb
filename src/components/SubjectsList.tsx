import Link from 'next/link'
import { getAllPosts } from '@/utils/helpers'

async function SubjectsList() {
  const posts = await getAllPosts()
  const subjects = [
    ...new Set(posts.map((post) => post.frontMatter.topics).flat()),
  ]
  return (
    <div className="mb-6 flex w-full flex-wrap pb-12 sm:max-w-4xl">
      {subjects?.map((topic, index) => (
        <Link href={`/subject/${topic}`} key={index}>
          <button
            type="button"
            className="cursor-pointer mx-1 mt-2 items-center rounded-full border border-transparent bg-subjects px-4 py-2.5 font-mono text-sm font-semibold lowercase leading-4 text-original shadow-sm focus:outline-none focus:ring-2 focus:ring-subjects focus:ring-offset-2"
          >
            {topic}
          </button>
        </Link>
      ))}
    </div>
  )
}

export default SubjectsList
