import Image from 'next/image';
import WritingParagraph from '@/components/posts/WritingParagraph';
import WritingSubHeading from '@/components/posts/WritingSubHeading';

const COMPONENT_MAP = {
  Image,
  h2: WritingSubHeading,
  p: WritingParagraph,
};

export default COMPONENT_MAP;
