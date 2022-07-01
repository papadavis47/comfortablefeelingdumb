import NavBar from '../NavBar'
import Footer from '../Footer'
import Head from 'next/head'

function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>Comfortable Feeling Dumb</title>
        <link rel="icon" href="/water_wave.ico" />
      </Head>
      <NavBar />
      <section className="flex-1">{children}</section>
      <Footer />
    </div>
  )
}

export default Layout
