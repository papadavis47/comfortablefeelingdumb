import NavBar from '../NavBar'
import Footer from '../Footer'
import Head from 'next/head'

function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen ">
      <NavBar />
      <section className="flex-1">{children}</section>
      <Footer />
    </div>
  )
}

export default Layout
