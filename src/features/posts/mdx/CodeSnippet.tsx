import React from 'react'

import { Code } from 'bright'

// MDX COMPONENT COMPATIBILITY: Accept all standard pre element attributes
// This ensures compatibility when used as a replacement for <pre> tags in MDX
type CodeSnippetProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLPreElement>, HTMLPreElement>

// PAIRED THEMES: follows the site's .dark class on <html> (see ThemeContext)
const CODE_THEME = {
  light: 'github-light',
  dark: 'github-dark-dimmed',
  lightSelector: 'html:not(.dark)',
} as const

// EXPLICIT RETURN TYPE: Makes the component's purpose clear
export default function CodeSnippet(props: CodeSnippetProps): React.JSX.Element {
  return <Code className=" py-4" theme={CODE_THEME} {...props} lineNumbers />
}
