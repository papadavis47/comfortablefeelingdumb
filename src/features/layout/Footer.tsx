'use client'

import ThemeToggle from '@/features/theme/ThemeToggle'

function Footer(): React.JSX.Element {
  return (
    <footer className="w-full py-4 bg-surface border-t border-border text-fg-muted">
      <div className="px-6 py-4 mx-auto md:max-w-4xl">
        <p className="mt-2 text-sm">
          Built with{' '}
          <a
            href="https://typescriptlang.org"
            className="hover:text-accent"
            target="_blank"
            rel="noreferrer noopener"
          >
            TypeScript
          </a>
          ,{' '}
          <a
            href="https://nextjs.org"
            className="hover:text-accent"
            target="_blank"
            rel="noreferrer noopener"
          >
            Next.js 16
          </a>
          ,{' '}
          <a
            href="https://tailwindcss.com"
            className="hover:text-accent"
            target="_blank"
            rel="noreferrer noopener"
          >
            TailwindCSS v4
          </a>{' '}
          and{' '}
          <a
            href="https://mdxjs.com/"
            className="hover:text-accent"
            target="_blank"
            rel="noreferrer noopener"
          >
            MDX
          </a>
        </p>
        <div className="py-3 md:pb-4 flex items-center justify-between text-sm">
          <a
            href="https://www.johnwilliamdavis.com"
            target="_blank"
            rel="noreferrer noopener"
            className="inline-block hover:text-accent"
          >
            <span>
              &copy;&nbsp;
              {new Date().getFullYear()}&nbsp; John William Davis.{' '}
            </span>
          </a>
          <div className="sm:hidden">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
