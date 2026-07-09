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
      className="text-accent font-medium underline underline-offset-4 decoration-accent/40 hover:decoration-accent"
      {...rest}
    >
      {children}
    </a>
  )
}
