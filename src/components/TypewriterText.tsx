'use client'

import { motion } from 'motion/react'
import type { Variants } from 'motion/react'

type TypewriterTextProps = {
  text: string
  delay?: number
  staggerDuration?: number
  className?: string
}

const containerVariants: Variants = {
  hidden: {},
  visible: (custom: { delay: number; stagger: number }) => ({
    transition: {
      delayChildren: custom.delay,
      staggerChildren: custom.stagger,
    },
  }),
}

const letterVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.1 } },
}

export function TypewriterText({
  text,
  delay = 0,
  staggerDuration = 0.03,
  className,
}: TypewriterTextProps): React.JSX.Element {
  return (
    <motion.span
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      custom={{ delay, stagger: staggerDuration }}
    >
      {text.split('').map((char, index) => (
        <motion.span key={index} variants={letterVariants} style={char === ' ' ? { whiteSpace: 'pre' } : undefined}>
          {char}
        </motion.span>
      ))}
    </motion.span>
  )
}
