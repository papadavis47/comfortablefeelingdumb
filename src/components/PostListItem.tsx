import Link from 'next/link'

function PostListItem({ frontMatter, readingTime, slug }) {
  return (
    <div className="my-4 rounded-lg bg-white p-6 shadow-lg">
      <div className="flex flex-col ">
        <Link href={`/writing/${slug}`}>
          <div className="group hover:cursor-pointer">
            <h1 className="cursor-pointer pt-2 text-2xl font-bold capitalize text-jacksonsPurple group-hover:text-purpleMountain ">
              {frontMatter.title}
            </h1>
            <p className="mt-3 pb-2 text-lg font-semibold italic text-neutral-600 sm:text-xl">
              {frontMatter.description}
              <span> . . .</span>
            </p>
            <p className="text-md mb-4 font-semibold text-neutral-500">
              {readingTime}
            </p>
          </div>
        </Link>
        <div>
          {frontMatter.tags.map((tag, index) => (
            <Link href={`/subject/${tag}`} key={index}>
              <span className="mr-2 mt-2 inline-flex cursor-pointer items-center rounded-md bg-frenchAzraq px-3 py-1 font-mono text-sm font-semibold lowercase text-white">
                {tag}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PostListItem
