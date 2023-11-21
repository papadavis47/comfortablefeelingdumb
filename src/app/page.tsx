import LandingTitle from '@/components/LandingTitle'
import PostList from '@/components/PostList'
import SubjectsList from '@/components/SubjectsList'

export default function Home() {
  return (
    <div className="mt-6 flex flex-col items-center py-2">
      <main className="flex w-full flex-1 flex-col items-center justify-start px-6 md:px-20">
        <LandingTitle />
        <PostList />
        <SubjectsList />
      </main>
    </div>
  )
}
