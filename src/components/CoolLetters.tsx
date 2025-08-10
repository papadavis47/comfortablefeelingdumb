import type { ReactNode } from 'react'

// PROPER PROPS INTERFACE: Define what children can be passed to this component
interface CoolLettersProps {
  children: ReactNode // This allows strings, JSX elements, arrays, etc.
}

// EXPLICIT TYPING: Both parameters and return type are now clearly defined
function CoolLetters({ children }: CoolLettersProps): React.JSX.Element {
  return (
    <h1 className="bg-gradient-to-l from-headings to-secondary bg-clip-text pb-2  text-4xl font-extrabold capitalize text-transparent lg:text-7xl">
      {children}
    </h1>
  )
}

export default CoolLetters
