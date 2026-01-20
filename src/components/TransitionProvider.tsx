'use client'

import { TransitionRouter } from 'next-transition-router'
import { animate } from 'motion/mini'

export function TransitionProvider({
  children,
}: {
  children: React.ReactNode
}): React.JSX.Element {
  return (
    <TransitionRouter
      auto={true}
      leave={(next) => {
        animate(
          'section.flex-1',
          { opacity: [1, 0], scale: [1, 0.98] },
          { duration: 0.3, ease: 'easeOut' }
        ).then(next)
      }}
      enter={(next) => {
        animate(
          'section.flex-1',
          { opacity: [0, 1], scale: [1.02, 1] },
          { duration: 0.3, ease: 'easeOut' }
        ).then(next)
      }}
    >
      {children}
    </TransitionRouter>
  )
}
