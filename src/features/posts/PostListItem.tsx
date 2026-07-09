import Link from 'next/link'
import { type MyFrontmatter } from '@/features/posts/types'

type ListItemProps = {
  frontMatter: MyFrontmatter
  readingTime: string
  slug: string
}

function PostListItem({ frontMatter, readingTime, slug }: ListItemProps) {
  return (
    <article className="border-b border-border py-5 last:border-b-0">
      <Link href={`/writing/${slug}`} className="group block">
        <h2 className="text-card-title text-heading group-hover:text-accent">
          {frontMatter.title}
        </h2>
        <p className="mt-1 text-fg-muted">{frontMatter.description}</p>
      </Link>
      <p className="mt-2 text-meta font-mono text-fg-muted">
        {frontMatter.date} · {readingTime} ·{' '}
        {frontMatter.topics.map((topic) => (
          <Link
            key={topic}
            href={`/subject/${topic}`}
            className="mr-2 lowercase text-accent hover:underline"
          >
            #{topic}
          </Link>
        ))}
      </p>
    </article>
  )
}

export default PostListItem
