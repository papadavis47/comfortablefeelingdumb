import Link from 'next/link'

function PostListItem({ frontMatter, readingTime, slug }) {
  return (
    <div className="p-6 my-4 bg-white rounded-lg shadow-lg">
      <div className="flex flex-col ">
        <Link href={`/writing/${slug}`}>
          <div className="group hover:cursor-pointer">
            <h1 className="pt-2 text-2xl font-bold capitalize cursor-pointer text-jacksonsPurple group-hover:text-purpleMountain ">
              {frontMatter.title}
            </h1>
            <p className="pb-2 mt-3 text-lg italic font-semibold text-neutral-600 sm:text-xl">
              {frontMatter.description}
              <span> . . .</span>
            </p>
            <p className="mb-4 font-semibold text-md text-neutral-500">
              {readingTime}
            </p>
          </div>
        </Link>
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
