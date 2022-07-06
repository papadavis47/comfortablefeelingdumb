import Image from 'next/image'

const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-center w-full py-4 shadow-lg bg-neutral-50 text-neutral-700">
      <div className="py-4">
        <p>
          <a
            className="flex items-center justify-center gap-2 text-lg"
            href="https://github.com/papadavis47"
            target="_blank"
            rel="noopener noreferrer"
          >
            &copy;2022
          </a>
        </p>
        <p className="mt-2">
          Built with <a href="https://nextjs.org">Next.js</a>,{' '}
          <a href="https://tailwindcss.com">TailwindCSS</a>,{' '}
          <a href="https://mdxjs.com/">MDX</a> and{' '}
          <a href="https://vercel.com">Vercel</a>
        </p>
      </div>
    </footer>
  )
}

export default Footer
