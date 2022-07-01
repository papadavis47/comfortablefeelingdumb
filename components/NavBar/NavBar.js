import React from 'react'
import { VscTwitter, VscGithubInverted } from 'react-icons/vsc'
import { SiStackoverflow } from 'react-icons/si'
import Image from 'next/image'
import Link from 'next/link'

function NavBar() {
  return (
    <nav className="sticky w-1/2 px-6 py-4 pt-4 mx-auto mt-4 mb-10 border-b-4 shadow-lg top-2 bg-neutral-100">
      <div className="flex justify-center sm:mx-auto sm:max-w-7xl">
        <div>
          <div></div>
        </div>
        {/* right side */}
        <div className="flex items-center space-x-5 text-neutral-700">
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
      </div>
    </nav>
  )
}

export default NavBar
