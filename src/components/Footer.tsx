'use client'

import ThemeToggle from '@/components/ThemeToggle'

function Footer(): React.JSX.Element {
  return (
    <footer className="w-full py-4 font-semibold bg-footer text-darkness">
      <div className="px-6 py-4 mx-auto md:max-w-4xl">
        <p className="mt-2 md:text-lg">
          Built with{' '}
          <a
            href="https://typescriptlang.org"
            className="hover:text-subjects"
            target="_blank"
            rel="noreferrer"
          >
            TypeScript
          </a>
          ,{' '}
          <a
            href="https://nextjs.org"
            className="hover:text-subjects"
            target="_blank"
            rel="noreferrer"
          >
            Next.js 16
          </a>
          ,{' '}
          <a
            href="https://tailwindcss.com"
            className="hover:text-subjects"
            target="_blank"
            rel="noreferrer"
          >
            TailwindCSS v4
          </a>{' '}
          and{' '}
          <a
            href="https://mdxjs.com/"
            className="hover:text-subjects"
            target="_blank"
            rel="noreferrer"
          >
            MDX
          </a>
        </p>
        <div className="py-3 text-md md:pb-4 flex items-center justify-between">
          <a
            href="https://www.johnwilliamdavis.com"
            target="_blank"
            rel="noreferrer"
            className="inline-block hover:text-subjects"
          >
            <span>
              &copy; John William Davis &nbsp;
              {new Date().getFullYear()}
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
