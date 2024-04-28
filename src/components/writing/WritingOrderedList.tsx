import { ReactNode } from 'react';

export default function WritingOrderedList({ children }: { children: ReactNode }) {
  return (
    <ol className='text-xl lg:text-2xl font-semibold italic text-strongest py-4'>{children}</ol>
  );
}
