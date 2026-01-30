'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { FaThumbsUp, FaRegThumbsUp } from 'react-icons/fa'

interface LikeButtonProps {
  slug: string
}

function LikeButton({ slug }: LikeButtonProps) {
  const [likes, setLikes] = useState(0)
  const [hasLiked, setHasLiked] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchLikes() {
      try {
        const res = await fetch(`/api/likes/${slug}`)
        const data = await res.json()
        setLikes(data.likes)
        setHasLiked(data.hasLiked)
      } catch (error) {
        console.error('Failed to fetch likes:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchLikes()
  }, [slug])

  async function handleLike() {
    if (hasLiked || isLoading) return

    setLikes((prev) => prev + 1)
    setHasLiked(true)

    try {
      const res = await fetch(`/api/likes/${slug}`, { method: 'POST' })
      if (!res.ok) {
        setLikes((prev) => prev - 1)
        setHasLiked(false)
      }
    } catch (error) {
      console.error('Failed to like:', error)
      setLikes((prev) => prev - 1)
      setHasLiked(false)
    }
  }

  return (
    <button
      onClick={handleLike}
      disabled={hasLiked || isLoading}
      className="flex items-center gap-2 text-lg md:text-xl text-strong cursor-pointer disabled:cursor-default"
      aria-label={hasLiked ? 'Already liked' : 'Like this post'}
    >
      <AnimatePresence mode="wait">
        {hasLiked ? (
          <motion.span
            key="filled"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 500, damping: 15 }}
          >
            <FaThumbsUp className="text-strong" />
          </motion.span>
        ) : (
          <motion.span
            key="outline"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaRegThumbsUp className={isLoading ? 'opacity-50' : ''} />
          </motion.span>
        )}
      </AnimatePresence>
      <span className="tabular-nums">{isLoading ? '' : likes}</span>
    </button>
  )
}

export default LikeButton
