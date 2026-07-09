import { type Metadata } from 'next'
import '@/styles/main.css'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import Footer from '@/features/layout/Footer'
import NavBar from '@/features/layout/NavBar'
import FixedThemeToggle from '@/features/theme/FixedThemeToggle'
import { ThemeProvider } from '@/features/theme/ThemeContext'
import { TransitionProvider } from '@/features/layout/TransitionProvider'
import { BLOG_TITLE } from '@/lib/constants'

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
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="h-full">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:rounded-md focus:bg-surface focus:px-4 focus:py-2 focus:text-heading focus:shadow-lg"
        >
          Skip to main content
        </a>
        <ThemeProvider>
          <TransitionProvider>
            <FixedThemeToggle />
            <div className="flex flex-col min-h-screen bg-bg px-1.5 md:px-0">
              <NavBar />
              <main id="main-content" className="flex-1">{children}</main>
              <Footer />
            </div>
          </TransitionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
