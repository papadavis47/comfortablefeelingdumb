import Image from 'next/image'
import CodeSnippet from '@/features/posts/mdx/CodeSnippet'
import WritingParagraph from '@/features/posts/mdx/WritingParagraph'
import WritingSubHeading from '@/features/posts/mdx/WritingSubHeading'
import WritingAnchorTag from '@/features/posts/mdx/WritingAnchorTag'
import WritingOrderedList from '@/features/posts/mdx/WritingOrderedList'
import WritingSpacer from '@/features/posts/mdx/WritingSpacer'
import WritingAccessibleEmoji from '@/features/posts/mdx/WritingAccessibleEmoji'

const COMPONENT_MAP = {
  Image,
  h2: WritingSubHeading,
  p: WritingParagraph,
  a: WritingAnchorTag,
  ol: WritingOrderedList,
  pre: CodeSnippet,
  Spacer: WritingSpacer,
  Emoji: WritingAccessibleEmoji,
}

export default COMPONENT_MAP
