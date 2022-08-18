import NavBar from '../NavBar'
import Footer from '../Footer'
import Head from 'next/head'
import { useState } from 'react'
import Modal from '../Modal'

function Layout({ children }) {
  let [isOpen, setIsOpen] = useState(true)
  let [modalShown, setModalShown] = useState(false)

  function toggleModal() {
    setModalShown(!modalShown)
  }

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }
  return (
    <div className="flex flex-col min-h-screen bg-stone-50">
      {modalShown && (
        <Modal
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          closeModal={closeModal}
          openModal={openModal}
        />
      )}
      <NavBar
        toggleModal={toggleModal}
        modalShown={modalShown}
        setModalShown={setModalShown}
      />
      <section className="flex-1">{children}</section>
      <Footer />
    </div>
  )
}

export default Layout
