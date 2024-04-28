import { ReactNode } from 'react';

export default function WritingSubHeading({ children }: { children: ReactNode }) {
  return <h2 className='text-3xl lg:text-4xl text-slate-900 my-4 font-bold'>{children}</h2>;
}
