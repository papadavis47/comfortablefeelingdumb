import { ReactNode } from 'react'

function CoolLetters({ children }) {
  return (
    <h1 className="bg-gradient-to-l from-headings to-secondary bg-clip-text pb-2  text-4xl font-extrabold capitalize text-transparent lg:text-7xl">
      {children}
    </h1>
  )
}

export default CoolLetters
