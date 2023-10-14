import NavBar from '../../src/components/NavBar'
import Footer from '../../src/components/Footer'
import Head from 'next/head'
import { useState } from 'react'
import Modal from '../Modal'

function Layout({ children }) {
  let [isOpen, setIsOpen] = useState(false)

  function toggleModal() {
    setIsOpen(!isOpen)
  }

  function closeModal() {
    setIsOpen(false)
  }
  return (
    <div className="flex min-h-screen flex-col bg-stone-50">
      {isOpen ? <Modal isOpen={isOpen} closeModal={closeModal} /> : null}

      <NavBar toggleModal={toggleModal} isOpen={isOpen} />
      <section className="flex-1">{children}</section>
      <Footer />
    </div>
  )
}

export default Layout
