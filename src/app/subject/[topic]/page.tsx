import PostList from '@/components/PostList'
import { notFound } from 'next/navigation'
import FilteredTitle from '@/components/FilteredTitle'
import { getSubjectsOnly } from '@/utils/helpers'

const SubjectPage = async (props: { params: Promise<{ topic: string }> }) => {
  const params = await props.params;
  const subjects = await getSubjectsOnly()
  if (!subjects.includes(params.topic)) {
    notFound()
  }
  const subject = params.topic
  return (
    <div className="mt-6 flex flex-col items-center py-2">
      <FilteredTitle subject={subject} />
      <main className="flex w-full flex-1 flex-col items-center justify-start px-6 md:px-20">
        <PostList subject={subject} />
      </main>
    </div>
  )
}

export default SubjectPage
