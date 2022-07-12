import Link from 'next/link'

function Thanks() {
  return (
    <div>
      <p>Thanks for reading!</p>
      <div className="flex items-center">
        <Link href="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 cursor-pointer"
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
        </Link>
        <p className="ml-4">Back to Home</p>
      </div>
    </div>
  )
}

export default Thanks
