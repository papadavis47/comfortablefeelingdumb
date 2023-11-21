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
            className="mx-1 mt-2 items-center rounded-full border border-transparent bg-frenchAzraq px-4 py-2.5 font-mono text-sm font-semibold lowercase leading-4 text-white shadow-sm hover:bg-frenchAzraq focus:outline-none focus:ring-2 focus:ring-frenchAzraq focus:ring-offset-2"
          >
            {topic}
          </button>
        </Link>
      ))}
    </div>
  )
}

export default SubjectsList
