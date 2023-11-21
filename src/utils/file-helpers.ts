import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

function readDirectory(localPath: string) {
  return fs.readdir(path.join(process.cwd(), localPath))
}

function readFile(localPath: string) {
  return fs.readFile(path.join(process.cwd(), localPath), 'utf8')
}

type Post = {
  slug: string
  frontMatter: { [key: string]: any }
  readingTime: string
}

export async function getAllPosts() {
  const files = await readDirectory('/posts')

  const posts: Post[] = []

  for (let fileName of files) {
    const fileContent = await readFile(`/posts/${fileName}`)
    const { data: frontMatter } = matter(fileContent)

    posts.push({
      frontMatter,
      slug: fileName.replace('.mdx', ''),
      readingTime: readingTime(fileContent).text,
    })
  }

  return posts
}

//   const { data: frontMatter } = matter(mdxWithMeta)

//     return {
//       frontMatter,
//       slug: filename,
//       readingTime: readingTime(mdxWithMeta).text,
//     }
//   })

//   return posts
// }

// export const getFrontMatterOnly = () => {
//   const files = fs.readdirSync(path.join('posts'))

//   const posts = files.map((filename) => {
//     const mdxWithMeta = fs.readFileSync(
//       path.join('posts', filename, 'index.mdx'),
//       'utf-8'
//     )
//     const { data: frontMatter } = matter(mdxWithMeta)

//     return {
//       frontMatter,
//     }
//   })

//   return posts
// }
