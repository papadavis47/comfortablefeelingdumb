import Link from 'next/link'

function PostListItem({ frontMatter, readingTime, slug }) {
  return (
    <div className="my-4">
      <div className="flex flex-col ">
        <Link href={`/writing/${slug}`}>
          <h1 className="pt-2 text-2xl font-bold capitalize cursor-pointer text-neutral-700">
            {frontMatter.title}
          </h1>
        </Link>
        <p className="py-2 font-semibold text-md text-stone-500">
          {frontMatter.date}
        </p>
        <p className="pb-2 text-xl italic font-semibold text-neutral-700">
          {frontMatter.description}
        </p>
        <p className="mb-4 font-semibold text-md text-neutral-500">
          {readingTime}
        </p>
        <div>
          {frontMatter.tags.map((tag, index) => (
            <Link href={`/subject/${tag}`} key={index}>
              <span className="mr-2 inline-flex cursor-pointer items-center rounded-md bg-neutral-100 px-2.5 py-0.5 text-sm font-medium lowercase text-neutral-800">
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
