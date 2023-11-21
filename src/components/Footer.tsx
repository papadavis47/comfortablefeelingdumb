const Footer = () => {
  return (
    <footer className="w-full bg-slate-200 py-4 font-semibold text-darkSapphire">
      <div className="mx-auto px-6 py-4 md:max-w-4xl">
        <p className="mt-2 md:text-lg">
          Built with{' '}
          <a
            href="https://typescriptlang.org"
            className="hover:text-frenchAzraq"
            target="_blank"
            rel="noreferrer"
          >
            TypeScript
          </a>
          ,{' '}
          <a
            href="https://nextjs.org"
            className="hover:text-frenchAzraq"
            target="_blank"
            rel="noreferrer"
          >
            Next.js
          </a>
          ,{' '}
          <a
            href="https://tailwindcss.com"
            className="hover:text-frenchAzraq"
            target="_blank"
            rel="noreferrer"
          >
            TailwindCSS
          </a>{' '}
          and{' '}
          <a
            href="https://mdxjs.com/"
            className="hover:text-frenchAzraq"
            target="_blank"
            rel="noreferrer"
          >
            MDX
          </a>
        </p>
        <p className="text-md py-3 md:pb-4">
          <a
            href="https://www.johnwilliamdavis.com"
            target="_blank"
            rel="noreferrer"
            className="inline-block hover:text-frenchAzraq"
          >
            <span>
              &copy; John William Davis &nbsp;
              {new Date().getFullYear()}
            </span>
          </a>
        </p>
      </div>
    </footer>
  )
}

export default Footer
