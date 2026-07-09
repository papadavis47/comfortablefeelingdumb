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
        <Dialog as="div" className="relative z-[60]" onClose={closeModal} open>
          {/* Backdrop with blur */}
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4 py-8 sm:p-6 text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ type: 'spring', duration: 0.4, bounce: 0.15 }}
              >
                <DialogPanel className="w-full max-w-lg sm:max-w-xl md:max-w-2xl p-6 sm:p-8 md:p-10 text-center shadow-2xl rounded-2xl bg-surface border border-border">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.3 }}
                  >
                    <DialogTitle
                      as="h3"
                      className="text-title-sm text-heading"
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
                    <p className="text-body text-fg text-left">
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
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-accent bg-accent-bg border border-transparent rounded-md hover:bg-accent/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
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
