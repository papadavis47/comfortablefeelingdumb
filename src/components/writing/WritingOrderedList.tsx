import type { ReactNode } from 'react'
import type { DetailedHTMLProps, OlHTMLAttributes } from 'react'

// MDX COMPONENT COMPATIBILITY: Accept all standard ordered list HTML attributes
interface WritingOrderedListProps extends DetailedHTMLProps<OlHTMLAttributes<HTMLOListElement>, HTMLOListElement> {
  children?: ReactNode
}

export default function WritingOrderedList({ 
  children, 
  ...props 
}: WritingOrderedListProps): React.JSX.Element {
  return (
    <ol 
      className='text-xl lg:text-2xl font-semibold italic text-strongest py-4' 
      {...props}
    >
      {children}
    </ol>
  )
}
