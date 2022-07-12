import Link from 'next/link'

function PostListItem({ frontMatter, readingTime, slug }) {
  return (
    <div className="p-6 my-4 bg-white border-l-8 rounded-lg shadow-lg border-softBlue">
      <div className="flex flex-col ">
        <Link href={`/writing/${slug}`}>
          <h1 className="pt-2 text-2xl font-bold capitalize cursor-pointer text-frenchAzraq">
            {frontMatter.title}
          </h1>
        </Link>
        <p className="py-2 font-semibold text-md text-stone-500">
          {frontMatter.date}
        </p>
        <p className="pb-2 text-lg italic font-semibold text-neutral-600 sm:text-xl">
          {frontMatter.description}
          <span> . . .</span>
        </p>
        <p className="mb-4 font-semibold text-md text-neutral-500">
          {readingTime}
        </p>
        <div>
          {frontMatter.tags.map((tag, index) => (
            <Link href={`/subject/${tag}`} key={index}>
              <span className="inline-flex items-center px-3 py-1 mt-2 mr-2 font-mono text-sm font-semibold text-white lowercase rounded-md cursor-pointer bg-frenchAzraq">
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
