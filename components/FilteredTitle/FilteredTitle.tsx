function FilteredTitle({ subject }) {
  return (
    <div className="self-start w-full pl-4 mx-auto sm:max-w-4xl">
      <h2 className="text-2xl font-semibold text-purpleMountain sm:text-4xl">
        Articles about <span className="font-bold lowercase">"{subject}"</span>
      </h2>
    </div>
  )
}

export default FilteredTitle
