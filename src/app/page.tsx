import { Metadata } from 'next'
import LandingTitle from '@/components/LandingTitle'

export const metadata: Metadata = {
  title: 'Comfortable Feeling Dumb',
}

export default function Home() {
  return (
    <div className="mt-6 flex flex-col items-center py-2">
      <main className="flex w-full flex-1 flex-col items-center justify-start px-6 md:px-20">
        <LandingTitle />
      </main>
    </div>
  )
}
