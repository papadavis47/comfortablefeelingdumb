import Image from 'next/image'

const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-center w-full py-4 font-semibold bg-slate-200 text-darkSapphire">
      <div className="px-6 py-4">
        <p className="mx-auto mt-2 md:text-lg">
          Built with{' '}
          <a
            href="https://typescriptlang.org"
            className="hover:text-frenchAzraq"
          >
            TypeScript
          </a>
          ,{' '}
          <a href="https://nextjs.org" className="hover:text-frenchAzraq">
            Next.js
          </a>
          ,{' '}
          <a href="https://tailwindcss.com" className="hover:text-frenchAzraq">
            TailwindCSS
          </a>{' '}
          and{' '}
          <a href="https://mdxjs.com/" className="hover:text-frenchAzraq">
            MDX
          </a>
        </p>
      </div>
    </footer>
  )
}

export default Footer
