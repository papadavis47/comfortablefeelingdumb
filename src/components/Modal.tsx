import React, { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'

function Modal({ closeModal, isOpen }) {
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center"></div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="h-auto max-w-5xl transform rounded-xl bg-colorOriginal p-6 px-10 text-center align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="mt-6 text-2xl font-semibold leading-6 text-gray-900 md:text-3xl"
                  >
                    About This Blog
                  </Dialog.Title>
                  <div className="mt-6 scroll-auto">
                    <p className="text-left text-sm italic text-gray-900 sm:text-justify md:px-10 md:text-lg">
                      These articles document my attempts to go beyond what is
                      comfortable to me as a software engineer. I try to be at
                      peace with the daily feelings of being at the edge of my
                      knowledge - where comfort ends and struggle begins.
                      Similar to my experiences in distance running, I have
                      found that this discomfort is temporary. The struggle
                      happens often and continues until the most challenging
                      parts of a run have passed or until the problem in the
                      code is solved. The challenge and the friction is how the
                      adaptations and the learning happen.
                    </p>
                  </div>

                  <div className="mt-6 md:mt-12">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Close
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default Modal
