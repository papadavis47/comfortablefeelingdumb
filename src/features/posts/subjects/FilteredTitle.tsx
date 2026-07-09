type Subject = string | undefined
function FilteredTitle({ subject }: { subject: Subject }) {
  return (
    <div className="mx-auto w-full self-start pl-4 sm:max-w-4xl">
      <h1 className="text-heading text-title-sm sm:text-title">
        Articles about <span className="text-accent lowercase">&ldquo;{subject}&rdquo;</span>
      </h1>
    </div>
  )
}

export default FilteredTitle
