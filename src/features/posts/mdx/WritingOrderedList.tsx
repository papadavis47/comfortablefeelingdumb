import type { ReactNode } from 'react'
import type { DetailedHTMLProps, OlHTMLAttributes } from 'react'

// MDX COMPONENT COMPATIBILITY: Accept all standard ordered list HTML attributes
interface WritingOrderedListProps extends DetailedHTMLProps<
  OlHTMLAttributes<HTMLOListElement>,
  HTMLOListElement
> {
  children?: ReactNode
}

export default function WritingOrderedList({
  children,
  ...props
}: WritingOrderedListProps): React.JSX.Element {
  return (
    <ol
      className="text-body text-fg py-3 list-decimal pl-6 marker:text-fg-muted"
      {...props}
    >
      {children}
    </ol>
  )
}
