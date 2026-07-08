// MDX COMPONENT COMPATIBILITY: This component already uses the correct typing pattern
// React.JSX.IntrinsicElements['a'] provides all standard anchor tag attributes
export default function WritingAnchorTag({
  children,
  ...rest
}: React.JSX.IntrinsicElements['a']): React.JSX.Element {
  return (
    <a
      target="_blank"
      rel="noreferrer noopener"
      className="text-lg lg:text-xl text-strong py-3 inline underline underline-offset-3 font-bold"
      {...rest}
    >
      {children}
    </a>
  )
}
