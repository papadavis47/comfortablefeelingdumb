import NavBar from '../NavBar'
import Footer from '../Footer'
import Head from 'next/head'
import { useState } from 'react'
import Modal from '../Modal'

function Layout({ children }) {
  let [isOpen, setIsOpen] = useState(false)
  let [show, setShow] = useState(false)

  function toggleModal() {
    isOpen ? setIsOpen(false) : setIsOpen(true)
  }

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }
  return (
    <div className="flex flex-col min-h-screen bg-stone-50">
      {isOpen ? <Modal isOpen={isOpen} closeModal={closeModal} /> : null}
      <NavBar toggleModal={toggleModal} setIsOpen={setIsOpen} />
      <section className="flex-1">{children}</section>
      <Footer />
    </div>
  )
}

export default Layout
