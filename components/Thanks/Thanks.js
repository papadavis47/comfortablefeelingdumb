import Link from 'next/link'

function Thanks() {
  return (
    <div>
      <p className="font-semibold">Thanks for reading!</p>
      <Link href="/">
        <p className="flex items-center cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 "
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
