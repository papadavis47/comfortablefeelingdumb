import { type Metadata } from 'next'
import '@/styles/globals.css'
import { GeistSans } from 'geist/font/sans'
import Footer from '@/components/Footer'
import NavBar from '@/components/NavBar'

export const metadata: Metadata = {
  title: 'CFD - Home',
  description: 'A programming blog.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body className="h-full">
        <div className="flex min-h-screen flex-col bg-stone-50">
          <NavBar />
          <section className="flex-1">{children}</section>
          <Footer />
        </div>
      </body>
    </html>
  )
}
