import Image from 'next/image'

const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-center w-full py-4 border-t-4 border-t-stone-300 text-stone-700">
      <div className="py-4">
        <p>
          <a
            className="flex items-center justify-center gap-2 text-lg "
            href="https://github.com/papadavis47"
            target="_blank"
            rel="noopener noreferrer"
          >
            &copy;John William Davis 2022
          </a>
        </p>
        <p className="mt-2">Built with Next.js, TailwindCSS, MDX and Vercel</p>
      </div>
    </footer>
  )
}

export default Footer
