import type { ReactNode } from 'react'
import type { DetailedHTMLProps, HTMLAttributes } from 'react'

// MDX COMPONENT COMPATIBILITY: Accept all standard paragraph HTML attributes
interface WritingParagraphProps extends DetailedHTMLProps<
  HTMLAttributes<HTMLParagraphElement>,
  HTMLParagraphElement
> {
  children?: ReactNode
}

export default function WritingParagraph({
  children,
  ...props
}: WritingParagraphProps): React.JSX.Element {
  return (
    <p className="text-lg lg:text-xl text-strong py-3" {...props}>
      {children}
    </p>
  )
}
