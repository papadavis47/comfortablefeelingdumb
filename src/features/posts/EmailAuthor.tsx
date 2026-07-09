export default function EmailAuthor(): React.JSX.Element {
  return (
    <p className="text-fg-muted text-base pt-2">
      Email author:{' '}
      <a
        href="mailto:jwdavisdeveloper@gmail.com"
        className="text-accent underline underline-offset-4 decoration-accent/40 hover:decoration-accent transition-colors"
      >
        jwdavisdeveloper@gmail.com
      </a>
    </p>
  )
}
