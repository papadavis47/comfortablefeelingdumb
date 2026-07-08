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
      className="text-2xl lg:text-3xl text-strongest my-4 font-bold"
      {...props}
    >
      {children}
    </h2>
  )
}
