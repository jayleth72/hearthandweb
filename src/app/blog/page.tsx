import { getAllPosts, getCategories, formatDate, calculateReadTime } from '@/lib/wordpress'
import BlogClient from './BlogClient'

export const revalidate = 3600 // Revalidate every hour

export default async function Blog() {
  const posts = await getAllPosts()
  const categories = await getCategories()
  
  // Format posts for the client component
  const formattedPosts = posts.map(post => ({
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt.replace(/<[^>]*>/g, '').substring(0, 160) + '...',
    author: post.author.node.name,
    date: post.date,
    category: post.categories.nodes[0]?.name || 'Uncategorized',
    image: post.featuredImage?.node.sourceUrl || '/placeholder-gallery/placeholder-1.jpg',
    readTime: calculateReadTime(post.excerpt)
  }))
  
  const categoryList = ['All', ...categories.map(cat => cat.name)]
  
  return <BlogClient posts={formattedPosts} categories={categoryList} />
}
