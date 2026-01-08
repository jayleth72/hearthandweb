import { getAllPosts, getPostBySlug, formatDate } from '@/lib/wordpress'
import { notFound } from 'next/navigation'
import BlogPostClient from './BlogPostClient'

export const revalidate = 3600 // Revalidate every hour

interface PageProps {
  params: Promise<{ slug: string }>
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  
  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: `${post.title} | Heart & Hand Blog`,
    description: post.excerpt.replace(/<[^>]*>/g, '').substring(0, 160),
  }
}

export default async function BlogPost({ params }: PageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <BlogPostClient
      title={post.title}
      content={post.content}
      author={post.author.node.name}
      date={post.date}
      category={post.categories.nodes[0]?.name || 'Uncategorized'}
      featuredImage={post.featuredImage?.node.sourceUrl}
      tags={post.tags?.nodes.map(tag => tag.name) || []}
    />
  )
}

