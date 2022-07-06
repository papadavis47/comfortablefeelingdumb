function SubjectsList({ subjects }) {
  return (
    <div className="pb-4 my-4">
      {subjects?.map((item, index) => (
        <button
          type="button"
          key={index}
          className="mx-1 mt-2 inline-flex items-center rounded-full border border-transparent bg-neutral-600 px-3.5 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2"
        >
          {item}
        </button>
      ))}
    </div>
  )
}

export default SubjectsList
