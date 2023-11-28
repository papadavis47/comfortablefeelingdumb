import Link from 'next/link'
import CoolLetters from '@/components/CoolLetters'

export default function NotFound() {
  return (
    <div className="px-6 md:px-20">
      <section className="mx-auto mt-8 w-full sm:max-w-4xl">
        <CoolLetters>404 - extinct 🦖</CoolLetters>
        <h2 className="py-4 text-4xl text-secondary">Or does not exist.</h2>
        <p className="py-6 text-3xl text-secondary">
          Either way, no content here . . .{' '}
        </p>
        <div className="py-6">
          <Link href="/">
            <button
              type="button"
              className="rounded-md bg-white px-3.5 py-2.5 text-lg font-semibold text-secondary shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              Go Back
            </button>
          </Link>
        </div>
      </section>
    </div>
  )
}
