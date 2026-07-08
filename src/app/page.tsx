import LandingTitle from '@/features/home/LandingTitle'
import PostList from '@/features/posts/PostList'
import SubjectsList from '@/features/posts/subjects/SubjectsList'

export default function Home() {
  return (
    <div className="flex flex-col items-center py-2 mt-6">
      <div className="flex flex-col items-center justify-start flex-1 w-full px-6 md:px-20">
        <LandingTitle />
        <PostList />
        <SubjectsList />
      </div>
    </div>
  )
}
