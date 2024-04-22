import Image from 'next/image';
import WritingParagraph from '@/components/posts/WritingParagraph';
import WritingSubHeading from '@/components/posts/WritingSubHeading';
import WritingAnchorTag from '@/components/posts/WritingAnchorTag';

const COMPONENT_MAP = {
  Image,
  h2: WritingSubHeading,
  p: WritingParagraph,
  a: WritingAnchorTag,
};

export default COMPONENT_MAP;
