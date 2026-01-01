import { ApolloClient, InMemoryCache, gql, HttpLink } from '@apollo/client'
import type {
  WordPressPostsResponse,
  WordPressPostResponse,
  BlogPostData,
  WordPressPost
} from '@/types/wordpress'

// WordPress GraphQL endpoint - should be set in environment variables
const WORDPRESS_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || process.env.WORDPRESS_API_URL || ''

// Create Apollo Client instance
const createApolloClient = () => {
  if (!WORDPRESS_API_URL) {
    console.warn('WordPress API URL not configured. Blog will not fetch data from WordPress.')
    return null
  }

  return new ApolloClient({
    link: new HttpLink({
      uri: WORDPRESS_API_URL,
      credentials: 'same-origin',
    }),
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'no-cache',
      },
      query: {
        fetchPolicy: 'no-cache',
      },
    },
  })
}

// GraphQL query to get all posts
const GET_ALL_POSTS = gql`
  query GetAllPosts($first: Int = 100) {
    posts(first: $first, where: { orderby: { field: DATE, order: DESC } }) {
      edges {
        node {
          id
          slug
          title
          excerpt
          content
          date
          author {
            node {
              name
            }
          }
          categories {
            nodes {
              name
            }
          }
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
          tags {
            nodes {
              name
            }
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`

// GraphQL query to get a single post by slug
const GET_POST_BY_SLUG = gql`
  query GetPostBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      id
      slug
      title
      excerpt
      content
      date
      author {
        node {
          name
        }
      }
      categories {
        nodes {
          name
        }
      }
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
      tags {
        nodes {
          name
        }
      }
    }
  }
`

// Helper function to calculate read time
function calculateReadTime(content: string): string {
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  const minutes = Math.ceil(words / wordsPerMinute)
  return `${minutes} min read`
}

// Helper function to clean WordPress excerpt
function cleanExcerpt(excerpt: string): string {
  return excerpt
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/\[&hellip;\]/g, '...') // Replace WordPress ellipsis
    .trim()
}

// Helper function to transform WordPress post to BlogPostData
function transformWordPressPost(post: WordPressPost): BlogPostData {
  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: cleanExcerpt(post.excerpt),
    content: post.content,
    date: post.date,
    author: post.author.node.name,
    category: post.categories.nodes[0]?.name || 'Uncategorized',
    categories: post.categories.nodes.map(cat => cat.name),
    image: post.featuredImage?.node.sourceUrl,
    imageAlt: post.featuredImage?.node.altText || post.title,
    tags: post.tags?.nodes.map(tag => tag.name) || [],
    readTime: calculateReadTime(post.content)
  }
}

// Fetch all blog posts from WordPress
export async function getAllWordPressPosts(): Promise<BlogPostData[]> {
  const client = createApolloClient()
  
  if (!client) {
    console.warn('WordPress client not configured. Returning empty posts array.')
    return []
  }

  try {
    const { data } = await client.query<WordPressPostsResponse>({
      query: GET_ALL_POSTS,
      variables: { first: 100 }
    })

    if (!data || !data.posts) {
      return []
    }

    return data.posts.edges.map(edge => transformWordPressPost(edge.node))
  } catch (error) {
    console.error('Error fetching WordPress posts:', error)
    return []
  }
}

// Fetch a single blog post by slug from WordPress
export async function getWordPressPostBySlug(slug: string): Promise<BlogPostData | null> {
  const client = createApolloClient()
  
  if (!client) {
    console.warn('WordPress client not configured. Returning null.')
    return null
  }

  try {
    const { data } = await client.query<WordPressPostResponse>({
      query: GET_POST_BY_SLUG,
      variables: { slug }
    })

    if (!data || !data.post) {
      return null
    }

    return transformWordPressPost(data.post)
  } catch (error) {
    console.error(`Error fetching WordPress post with slug "${slug}":`, error)
    return null
  }
}

// Get all unique categories from WordPress posts
export async function getWordPressCategories(): Promise<string[]> {
  const posts = await getAllWordPressPosts()
  const categoriesSet = new Set<string>()
  
  posts.forEach(post => {
    post.categories.forEach(category => categoriesSet.add(category))
  })
  
  return Array.from(categoriesSet).sort()
}

// Check if WordPress is configured
export function isWordPressConfigured(): boolean {
  return !!WORDPRESS_API_URL
}
