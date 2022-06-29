import Head from 'next/head'
import Footer from '../components/Footer'
import Link from 'next/link'

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>My TailwindCSS / Next.js Starter</title>
        <link rel="icon" href="/surfing.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center flex-1 w-full px-20 text-center">
        <h1 className="text-4xl font-bold text-gray-700">
          Comfortable Feeling Dumb
        </h1>
        <h2 className="text-3xl font-bold text-gray-700">A Programming Blog</h2>
        <p className="mt-4 text-sky-800">
          About becoming comfortable with the discomfort of being at the edge of
          my knowlege.
        </p>
      </main>
      <Link href="/my-mdx-page">
        <a className="block mb-6 text-xl text-red-600">My first experiment</a>
      </Link>
      <Link href="/new-test">
        <a className="block mb-6 text-xl text-red-600">New Test</a>
      </Link>
      <Footer />
    </div>
  )
}

export default Home
