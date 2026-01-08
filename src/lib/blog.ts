import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'content/blog')

export interface BlogPost {
  slug: string
  title: string
  date: string
  author: string
  excerpt: string
  category: string
  content: string
  readTime: string
}

export function getAllPosts(): BlogPost[] {
  // Create directory if it doesn't exist
  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true })
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)

      return {
        slug,
        content,
        title: data.title || '',
        date: data.date || '',
        author: data.author || '',
        excerpt: data.excerpt || '',
        category: data.category || '',
        readTime: data.readTime || '5 min read'
      } as BlogPost
    })

  return allPostsData.sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1))
}

export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      slug,
      content,
      title: data.title || '',
      date: data.date || '',
      author: data.author || '',
      excerpt: data.excerpt || '',
      category: data.category || '',
      readTime: data.readTime || '5 min read'
    } as BlogPost
  } catch {
    return null
  }
}

export function getCategories(): string[] {
  const posts = getAllPosts()
  const categories = posts.map(post => post.category)
  return Array.from(new Set(categories)).filter(Boolean)
}
