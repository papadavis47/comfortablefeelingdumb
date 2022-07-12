import { useState, useEffect } from 'react'
import { VscTwitter, VscGithubInverted } from 'react-icons/vsc'
import { ImHome } from 'react-icons/im'
import { SiStackoverflow } from 'react-icons/si'
import { CgDetailsMore } from 'react-icons/cg'
import { debounce } from '../../utils/debounce.js'
import Link from 'next/link'

function NavBar() {
  const [prevScrollPos, setPrevScrollPos] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  const handleScroll = debounce(() => {
    const currentScrollPos = window.scrollY

    setIsVisible(
      (prevScrollPos > currentScrollPos &&
        prevScrollPos - currentScrollPos > 50) ||
        currentScrollPos < 10
    )

    setPrevScrollPos(currentScrollPos)
  }, 100)

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [isVisible, prevScrollPos, handleScroll])

  return (
    <nav
      className={`sticky z-50 ${
        isVisible ? 'top-4' : '-top-20'
      } mx-auto mt-4 mb-10 w-full rounded-lg px-6 py-4 pt-4 shadow-lg backdrop-blur-md transition ease-linear sm:w-1/2`}
    >
      <div className="flex justify-between bg-transparent text-darkSapphire sm:mx-auto sm:max-w-7xl">
        {/* left */}
        <div>
          <Link href="/">
            <a>
              <ImHome size={30} />
            </a>
          </Link>
        </div>
        {/* middle */}
        <div className="flex items-center space-x-5">
          <a
            href="https://twitter.com/papadavis47"
            target="_blank"
            rel="noreferrer"
          >
            <VscTwitter size={30} />
          </a>
          <a
            href="https://github.com/papadavis47"
            target="_blank"
            rel="noreferrer"
          >
            <VscGithubInverted size={30} />
          </a>
          <a
            href="https://stackoverflow.com/users/9111781/jwdavis"
            target="_blank"
            rel="noreferrer"
          >
            <SiStackoverflow size={30} />
          </a>
        </div>
        {/* right */}
        <div>
          <Link href="#">
            <a>
              <CgDetailsMore size={30} />
            </a>
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
