import Image from 'next/image'

const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-center w-full py-4 bg-neutral-50 text-neutral-700">
      <div className="px-6 py-4">
        <p className="mx-auto mt-2 md:text-lg">
          Built with <a href="https://nextjs.org">Next.js</a>,{' '}
          <a href="https://tailwindcss.com">TailwindCSS</a> and{' '}
          <a href="https://mdxjs.com/">MDX</a>
        </p>
      </div>
    </footer>
  )
}

export default Footer
