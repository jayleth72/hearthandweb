import { getWordPressPostBySlug, isWordPressConfigured } from '@/lib/wordpress'
import { getPostBySlug } from '@/lib/blog'
import BlogPostClient from '@/components/BlogPostClient'
import type { BlogPostData } from '@/types/wordpress'

export const revalidate = 3600 // Revalidate every hour

interface BlogPostProps {
  params: Promise<{
    slug: string
  }>
}

export default async function BlogPost({ params }: BlogPostProps) {
  const { slug } = await params
  
  let post: BlogPostData | null = null
  let source: 'wordpress' | 'local' = 'local'

  // Try to fetch from WordPress first
  if (isWordPressConfigured()) {
    try {
      post = await getWordPressPostBySlug(slug)
      if (post) {
        source = 'wordpress'
        console.log(`Fetched post "${slug}" from WordPress`)
      }
    } catch (error) {
      console.error('Failed to fetch from WordPress, falling back to local:', error)
    }
  }

  // Fallback to local markdown files if WordPress is not configured or failed
  if (!post) {
    const localPost = getPostBySlug(slug)
    if (localPost) {
      post = {
        id: localPost.slug,
        slug: localPost.slug,
        title: localPost.title,
        excerpt: localPost.excerpt,
        content: localPost.content,
        date: localPost.date,
        author: localPost.author,
        category: localPost.category,
        categories: [localPost.category],
        readTime: localPost.readTime
      }
      source = 'local'
      console.log(`Fetched post "${slug}" from local files`)
    }
  }

  return <BlogPostClient post={post} source={source} />
}
