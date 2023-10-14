import { Metadata } from 'next'
import type { AppProps } from 'next/app'
import '../../styles/globals.css'
import { Inter } from 'next/font/google'
import Footer from '@/components/Footer'
import NavBar from '@/components/NavBar'

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Home',
  description: 'Welcome to Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
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
