import type { ReactNode } from 'react'
import type { DetailedHTMLProps, HTMLAttributes } from 'react'

// MDX COMPONENT COMPATIBILITY: MDX components need to accept all standard HTML attributes
// This ensures the component works properly when used as a replacement for <h2> tags
interface WritingSubHeadingProps extends DetailedHTMLProps<
  HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
> {
  children?: ReactNode // Make children optional to match HTML specification
}

export default function WritingSubHeading({
  children,
  ...props // Spread remaining props to the h2 element
}: WritingSubHeadingProps): React.JSX.Element {
  return (
    <h2
      className="text-h2 text-heading mt-10 mb-4"
      {...props}
    >
      {children}
    </h2>
  )
}
