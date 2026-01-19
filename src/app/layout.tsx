import { type Metadata } from 'next'
import '@/styles/main.css'
import { GeistSans } from 'geist/font/sans'
import Footer from '@/components/Footer'
import NavBar from '@/components/NavBar'
import FixedThemeToggle from '@/components/FixedThemeToggle'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { BLOG_TITLE } from '@/utils/constants'

const themeScript = `
(function() {
  const stored = localStorage.getItem('theme-preference');
  const theme = stored ?? 'system';
  const resolved = theme === 'system'
    ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    : theme;
  document.documentElement.classList.add(resolved);
})();
`

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
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
    <html
      lang="en"
      className={`${GeistSans.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="h-full">
        <ThemeProvider>
          <FixedThemeToggle />
          <div className="flex flex-col min-h-screen bg-background px-1.5 md:px-0">
            <NavBar />
            <section className="flex-1">{children}</section>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
