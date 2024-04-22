export default function WritingAnchorTag({ children, ...rest }: React.JSX.IntrinsicElements['a']) {
  return (
    <a
      target='_blank'
      rel='noreferrer noopener'
      className='text-xl lg:text-2xl text-strong py-3 inline underline underline-offset-3 font-bold'
      {...rest}
    >
      {children}
    </a>
  );
}
