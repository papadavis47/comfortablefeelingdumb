import type { ReactNode } from 'react'

// PROPER PROPS INTERFACE: Define what children can be passed to this component
interface CoolLettersProps {
  children: ReactNode // This allows strings, JSX elements, arrays, etc.
}

// EXPLICIT TYPING: Both parameters and return type are now clearly defined
function CoolLetters({ children }: CoolLettersProps): React.JSX.Element {
  return (
    <h1 className="bg-linear-to-l from-accent to-accent-2 bg-clip-text pb-2 text-title-sm sm:text-title text-transparent">
      {children}
    </h1>
  )
}

export default CoolLetters
