import Link from 'next/link'
import { type MyFrontmatter } from '@/utils/helpers'

type ListItemProps = {
  frontMatter: MyFrontmatter
  readingTime: string
  slug: string
}

function PostListItem({ frontMatter, readingTime, slug }: ListItemProps) {
  return (
    <div className="-mx-3 my-4 w-[calc(100%+1.5rem)] rounded-lg bg-original p-6 shadow-lg sm:mx-0 sm:w-full">
      <div className="flex flex-col ">
        <Link href={`/writing/${slug}`}>
          <div className="group hover:cursor-pointer">
            <h1 className="cursor-pointer pt-2 text-2xl font-bold capitalize text-headings group-hover:text-secondary ">
              {frontMatter.title}
            </h1>
            <p className="mt-3 pb-2 text-lg font-semibold italic text-strong sm:text-xl">
              {frontMatter.description}
              <span> . . .</span>
            </p>
            <p className="text-md mb-4 font-semibold text-">{readingTime}</p>
          </div>
        </Link>
        <div>
          {frontMatter.topics.map((topic, index) => (
            <Link href={`/subject/${topic}`} key={index}>
              <span className="mr-2 mt-2 inline-flex cursor-pointer items-center rounded-md bg-subjects px-3 py-1 font-mono text-sm font-semibold lowercase text-original">
                {topic}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PostListItem
