import { type Metadata } from 'next'
import '@/styles/main.css'
import { GeistSans } from 'geist/font/sans'
import Footer from '@/components/Footer'
import NavBar from '@/components/NavBar'
import { BLOG_TITLE } from '@/utils/constants'

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
  ),
  title: BLOG_TITLE,
  description: 'A blog about TypeScript, Go, Rust ( and trail running )',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body className="h-full">
        <div className="flex flex-col min-h-screen bg-background px-[6px] md:px-0">
          <NavBar />
          <section className="flex-1">{children}</section>
          <Footer />
        </div>
      </body>
    </html>
  )
}
