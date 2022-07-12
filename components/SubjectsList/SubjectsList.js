import Link from 'next/link'

function SubjectsList({ subjects }) {
  return (
    <div className="flex flex-wrap w-full pb-12 mb-6 sm:max-w-4xl">
      {subjects?.map((item, index) => (
        <Link href={`/subject/${item}`} key={index}>
          <button
            type="button"
            className="mx-1 mt-2 items-center rounded-full border border-transparent bg-darkSapphire px-4 py-2.5 font-mono text-sm font-semibold lowercase leading-4 text-white shadow-sm hover:bg-frenchAzraq focus:outline-none focus:ring-2 focus:ring-darkSapphire focus:ring-offset-2"
          >
            {item}
          </button>
        </Link>
      ))}
    </div>
  )
}

export default SubjectsList
