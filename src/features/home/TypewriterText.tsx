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
  // Split into words (preserving spaces as separate elements for animation)
  const words = text.split(/(\s+)/)
  let charIndex = 0

  return (
    <motion.span
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      custom={{ delay, stagger: staggerDuration }}
    >
      {words.map((word, wordIndex) => {
        const isSpace = /^\s+$/.test(word)
        if (isSpace) {
          // Render spaces directly with animation
          return word.split('').map((char) => {
            const key = charIndex++
            return (
              <motion.span key={key} variants={letterVariants} style={{ whiteSpace: 'pre' }}>
                {char}
              </motion.span>
            )
          })
        }
        // Wrap each word in inline-block span so words can wrap but letters stay together
        return (
          <span key={wordIndex} style={{ display: 'inline-block' }}>
            {word.split('').map((char) => {
              const key = charIndex++
              return (
                <motion.span key={key} variants={letterVariants}>
                  {char}
                </motion.span>
              )
            })}
          </span>
        )
      })}
    </motion.span>
  )
}
