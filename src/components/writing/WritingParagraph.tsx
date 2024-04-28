import { ReactNode } from 'react';

export default function WritingParagraph({ children }: { children: ReactNode }) {
  return <p className='text-xl lg:text-2xl text-strong py-3'>{children}</p>;
}
