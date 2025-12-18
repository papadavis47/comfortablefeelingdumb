import Image from 'next/image'
import CodeSnippet from '@/components/CodeSnippet'
import WritingParagraph from '@/components/writing/WritingParagraph'
import WritingSubHeading from '@/components/writing/WritingSubHeading'
import WritingAnchorTag from '@/components/writing/WritingAnchorTag'
import WritingOrderedList from '@/components/writing/WritingOrderedList'
import WritingSpacer from '@/components/writing/WritingSpacer'
import WritingAccessibleEmoji from '@/components/writing/WritingAccessibleEmoji'

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
