import Link from 'next/link'

function SubjectsList({ subjects }) {
  return (
    <div className="mb-6 flex w-full flex-wrap pb-12 sm:max-w-4xl">
      {subjects?.map((item, index) => (
        <Link href={`/subject/${item}`} key={index}>
          <button
            type="button"
            className="mx-1 mt-2 items-center rounded-full border border-transparent bg-neutral-600 px-3.5 py-2 text-sm font-medium lowercase leading-4 text-white shadow-sm hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2"
          >
            {item}
          </button>
        </Link>
      ))}
    </div>
  )
}

export default SubjectsList
