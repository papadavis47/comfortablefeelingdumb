'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import { type MyFrontmatter } from '@/utils/helpers'

type ListItemProps = {
  frontMatter: MyFrontmatter
  readingTime: string
  slug: string
  isDimmed?: boolean
  onHoverStart?: () => void
  onHoverEnd?: () => void
}

function PostListItem({
  frontMatter,
  readingTime,
  slug,
  isDimmed = false,
  onHoverStart,
  onHoverEnd,
}: ListItemProps) {
  return (
    <motion.div
      className="-mx-3 my-4 w-[calc(100%+1.5rem)] rounded-lg bg-original p-6 shadow-lg sm:mx-0 sm:w-full"
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      animate={{
        opacity: isDimmed ? 0.75 : 1,
        scale: isDimmed ? 0.995 : 1,
      }}
      whileHover={{
        y: -2,
        scale: 1.005,
        boxShadow:
          '0 10px 15px -3px rgb(0 0 0 / 0.08), 0 4px 6px -4px rgb(0 0 0 / 0.08)',
      }}
      whileTap={{
        scale: 0.995,
      }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 25,
      }}
    >
      <div className="flex flex-col">
        <Link href={`/writing/${slug}`}>
          <div className="group hover:cursor-pointer">
            <h1 className="cursor-pointer pt-2 text-2xl font-bold capitalize text-headings group-hover:text-secondary">
              {frontMatter.title}
            </h1>
            <p className="mt-3 pb-2 text-lg font-semibold italic text-strong sm:text-xl">
              {frontMatter.description}
            </p>
            <p className="text-md mb-4 font-semibold">{readingTime}</p>
          </div>
        </Link>
        <div>
          {frontMatter.topics.map((topic, index) => (
            <Link href={`/subject/${topic}`} key={index}>
              <span className="mr-2 mt-2 inline-flex cursor-pointer items-center rounded-md bg-subjects px-3 py-1 font-mono text-sm font-semibold lowercase text-original">
                {topic}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default PostListItem
