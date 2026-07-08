export type MyFrontmatter = {
  title: string
  id: number
  date: string
  description: string
  topics: string[]
  isDraft: boolean
}

export type Post = {
  slug: string
  frontMatter: MyFrontmatter
  readingTime: string
}
