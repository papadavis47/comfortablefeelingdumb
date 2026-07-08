export default function EmailAuthor(): React.JSX.Element {
  return (
    <p className="text-subtle text-base pt-2">
      Email author:{' '}
      <a
        href="mailto:jwdavisdeveloper@gmail.com"
        className="text-secondary underline underline-offset-4 decoration-secondary/40 hover:decoration-secondary transition-colors"
      >
        jwdavisdeveloper@gmail.com
      </a>
    </p>
  )
}
