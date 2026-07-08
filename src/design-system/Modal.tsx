'use client'

import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { AnimatePresence, motion } from 'motion/react'

type ModalProps = {
  closeModal: () => void
  isOpen: boolean
}

function Modal({ closeModal, isOpen }: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog as="div" className="relative z-10" onClose={closeModal} open>
          {/* Backdrop with blur */}
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />

          <div className="fixed inset-0">
            <div className="flex items-center justify-center min-h-full p-3 sm:p-4 text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ type: 'spring', duration: 0.4, bounce: 0.15 }}
              >
                <DialogPanel className="w-full max-w-lg sm:max-w-xl md:max-w-2xl p-6 sm:p-8 md:p-10 text-center shadow-2xl rounded-2xl bg-original border border-subtle/10">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.3 }}
                  >
                    <DialogTitle
                      as="h3"
                      className="text-3xl font-semibold leading-tight text-strongest md:text-4xl"
                    >
                      About This Blog
                    </DialogTitle>
                  </motion.div>

                  <motion.div
                    className="mt-6 sm:mt-8"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25, duration: 0.3 }}
                  >
                    <p className="text-base font-medium leading-relaxed italic text-strongest sm:text-lg md:text-xl sm:text-justify">
                      These articles document my attempts to go beyond what is
                      comfortable to me as a software engineer. I try to be at
                      peace with the daily feeling of being at the edge of my
                      knowledge--where comfort ends and struggle begins. Similar
                      to my experiences in trail and distance running, I&apos;ve
                      found that this discomfort is temporary. The struggle
                      happens often and continues until the most challenging
                      parts of a run have passed, or until the problem in the
                      code is solved. The challenges and the friction are how
                      the adaptations and learning happen.
                    </p>
                  </motion.div>

                  <motion.div
                    className="mt-8 md:mt-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.3 }}
                  >
                    <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-strongest bg-subjects/20 border border-transparent rounded-md hover:bg-subjects/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-subjects focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Close
                    </button>
                  </motion.div>
                </DialogPanel>
              </motion.div>
            </div>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  )
}

export default Modal
