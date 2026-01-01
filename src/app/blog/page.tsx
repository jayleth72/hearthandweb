import { getAllWordPressPosts, getWordPressCategories, isWordPressConfigured } from '@/lib/wordpress'
import { getAllPosts, getCategories } from '@/lib/blog'
import BlogPageClient from '@/components/BlogPageClient'
import type { BlogPostData } from '@/types/wordpress'

export const revalidate = 3600 // Revalidate every hour

export default async function Blog() {
  // Try to fetch from WordPress first, fallback to local markdown files
  let blogPosts: BlogPostData[] = []
  let categories: string[] = []
  let source: 'wordpress' | 'local' = 'local'

  if (isWordPressConfigured()) {
    try {
      blogPosts = await getAllWordPressPosts()
      categories = await getWordPressCategories()
      source = 'wordpress'
      console.log(`Fetched ${blogPosts.length} posts from WordPress`)
    } catch (error) {
      console.error('Failed to fetch from WordPress, falling back to local:', error)
    }
  }

  // Fallback to local markdown files if WordPress is not configured or failed
  if (blogPosts.length === 0) {
    const localPosts = getAllPosts()
    blogPosts = localPosts.map(post => ({
      id: post.slug,
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      date: post.date,
      author: post.author,
      category: post.category,
      categories: [post.category],
      readTime: post.readTime
    }))
    categories = getCategories()
    source = 'local'
    console.log(`Fetched ${blogPosts.length} posts from local files`)
  }
  return <BlogPageClient posts={blogPosts} categories={categories} source={source} />
}
