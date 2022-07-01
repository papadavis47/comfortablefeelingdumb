import React from 'react'
import { VscTwitter, VscGithubInverted } from 'react-icons/vsc'
import { SiStackoverflow } from 'react-icons/si'
import Image from 'next/image'
import Link from 'next/link'

function NavBar() {
  return (
    <nav className="px-6 py-4 mb-10 border-b-4 shadow-lg bg-indigo-50">
      <div className="flex justify-center sm:mx-auto sm:max-w-7xl">
        <div>
          <div></div>
        </div>
        {/* right side */}
        <div className="flex items-center space-x-5 text-yellow-900">
          <VscTwitter size={30} />
          <VscGithubInverted size={30} />
          <SiStackoverflow size={30} />
        </div>
      </div>
    </nav>
  )
}

export default NavBar
