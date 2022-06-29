import Image from 'next/image'

const Footer = () => {
  return (
    <footer className="flex h-24 w-full items-center justify-center border-t">
      <a
        className="flex items-center justify-center gap-2 text-blue-600"
        href="https://github.com/papadavis47"
        target="_blank"
        rel="noopener noreferrer"
      >
        Developed by John William Davis
      </a>
    </footer>
  )
}

export default Footer
