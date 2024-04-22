import Image from 'next/image';
import WritingParagraph from '@/components/writing/WritingParagraph';
import WritingSubHeading from '@/components/writing/WritingSubHeading';
import WritingAnchorTag from '@/components/writing/WritingAnchorTag';
import WritingOrderedList from '@/components/writing/WritingOrderedList';

const COMPONENT_MAP = {
  Image,
  h2: WritingSubHeading,
  p: WritingParagraph,
  a: WritingAnchorTag,
  ol: WritingOrderedList,
};

export default COMPONENT_MAP;
