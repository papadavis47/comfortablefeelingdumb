import Link from 'next/link'
import CoolLetters from '@/design-system/CoolLetters'

export default function NotFound() {
  return (
    <div className="px-6 md:px-20">
      <section className="w-full mx-auto mt-8 sm:max-w-4xl">
        <CoolLetters>404 - extinct 🦖</CoolLetters>
        <h2 className="py-4 text-h2 text-heading">
          Or this URL never existed
        </h2>
        <p className="py-6 text-body text-fg-muted">
          Either way, no content here . . .{' '}
        </p>
        <div className="py-6">
          <Link
            href="/"
            className="inline-block rounded-md bg-surface px-3.5 py-2.5 font-medium text-accent shadow-sm ring-1 ring-inset ring-border hover:bg-bg"
          >
            Go Back
          </Link>
        </div>
      </section>
    </div>
  )
}
