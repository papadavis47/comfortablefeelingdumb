type Subject = string | undefined;
function FilteredTitle({ subject }: { subject: Subject }) {
  return (
    <div className='mx-auto w-full self-start pl-4 sm:max-w-4xl'>
      <h2 className='text-secondary text-2xl font-semibold sm:text-4xl'>
        Articles about <span className='font-bold lowercase'>"{subject}"</span>
      </h2>
    </div>
  );
}

export default FilteredTitle;
