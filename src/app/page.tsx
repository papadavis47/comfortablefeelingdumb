import LandingTitle from '@/components/LandingTitle'
import PostList from '@/components/PostList'
import SubjectsList from '@/components/SubjectsList'

export default function Home() {
  return (
    <div className="flex flex-col items-center py-2 mt-6">
      <main className="flex flex-col items-center justify-start flex-1 w-full px-6 md:px-20">
        <LandingTitle />
        <PostList />
        <SubjectsList />
      </main>
    </div>
  )
}
