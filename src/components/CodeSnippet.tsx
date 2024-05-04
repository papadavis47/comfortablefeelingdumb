import React from 'react'

import { Code } from 'bright'

export default function CodeSnippet(props) {
  return <Code className=" py-4" theme="nord" {...props} lineNumbers />
}
