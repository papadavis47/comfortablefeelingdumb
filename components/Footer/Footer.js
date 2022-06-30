import Image from 'next/image'

const Footer = () => {
  return (
    <footer className="flex items-center justify-center w-full h-24 border-t-4 border-t-stone-300">
      <a
        className="flex items-center justify-center gap-2 text-lg text-stone-700"
        href="https://github.com/papadavis47"
        target="_blank"
        rel="noopener noreferrer"
      >
        &copy;John William Davis 2022
      </a>
    </footer>
  )
}

export default Footer
