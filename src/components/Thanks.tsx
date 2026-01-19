import Link from 'next/link'

function Thanks() {
  return (
    <div className="text-xl py-3 text-strong">
      <p className="font-semibold my-4">Thanks for reading!</p>
      <Link href="/">
        <p className="flex max-w-fit cursor-pointer items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 "
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          &nbsp; Back to Home
        </p>
      </Link>
    </div>
  )
}

export default Thanks
