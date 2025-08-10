import React from 'react'

import { Code } from 'bright'

// MDX COMPONENT COMPATIBILITY: Accept all standard pre element attributes
// This ensures compatibility when used as a replacement for <pre> tags in MDX
type CodeSnippetProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLPreElement>, HTMLPreElement>

// EXPLICIT RETURN TYPE: Makes the component's purpose clear
export default function CodeSnippet(props: CodeSnippetProps): React.JSX.Element {
  return <Code className=" py-4" theme="nord" {...props} lineNumbers />
}
