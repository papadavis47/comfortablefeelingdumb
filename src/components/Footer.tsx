const Footer = () => {
  return (
    <footer className="flex w-full flex-col items-center justify-center bg-slate-200 py-4 font-semibold text-darkSapphire">
      <div className="px-6 py-4">
        <p className="mx-auto mt-2 md:text-lg">
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
      </div>
      <p className="mx-8 text-sm ">
        <a
          href="https://www.johnwilliamdavis.com"
          target="_blank"
          rel="noreferrer"
          className="hover:text-frenchAzraq"
        >
          <span>
            &copy; John William Davis &nbsp;
            {new Date().getFullYear()}
          </span>
        </a>
      </p>
    </footer>
  )
}

export default Footer
