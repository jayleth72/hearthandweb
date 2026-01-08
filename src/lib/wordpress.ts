import { GraphQLClient } from 'graphql-request'
import type { 
  WordPressPostsResponse, 
  WordPressPostResponse, 
  WordPressCategoriesResponse,
  WordPressPost,
  WordPressEvent,
  WordPressEventsResponse,
  WordPressEventResponse
} from '@/types/wordpress'

// Initialize GraphQL client
const endpoint = process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_ENDPOINT || 'https://your-wordpress-site.com/graphql'

const client = new GraphQLClient(endpoint, {
  headers: {
    'Content-Type': 'application/json',
  },
})

// GraphQL Queries
const GET_ALL_POSTS = `
  query GetAllPosts($first: Int = 100) {
    posts(first: $first, where: { orderby: { field: DATE, order: DESC } }) {
      edges {
        node {
          id
          title
          slug
          excerpt
          date
          modified
          author {
            node {
              name
              avatar {
                url
              }
            }
          }
          featuredImage {
            node {
              sourceUrl
              altText
              mediaDetails {
                width
                height
              }
            }
          }
          categories {
            nodes {
              name
              slug
            }
          }
          tags {
            nodes {
              name
              slug
            }
          }
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`

const GET_POST_BY_SLUG = `
  query GetPostBySlug($slug: String!) {
    post: postBy(slug: $slug) {
      id
      title
      slug
      content
      excerpt
      date
      modified
      author {
        node {
          name
          avatar {
            url
          }
        }
      }
      featuredImage {
        node {
          sourceUrl
          altText
          mediaDetails {
            width
            height
          }
        }
      }
      categories {
        nodes {
          name
          slug
        }
      }
      tags {
        nodes {
          name
          slug
        }
      }
    }
  }
`

const GET_CATEGORIES = `
  query GetCategories {
    categories(first: 100, where: { hideEmpty: true }) {
      nodes {
        name
        slug
        count
      }
    }
  }
`

const GET_POSTS_BY_CATEGORY = `
  query GetPostsByCategory($categorySlug: String!, $first: Int = 100) {
    posts(
      first: $first
      where: { 
        categoryName: $categorySlug
        orderby: { field: DATE, order: DESC }
      }
    ) {
      edges {
        node {
          id
          title
          slug
          excerpt
          date
          modified
          author {
            node {
              name
              avatar {
                url
              }
            }
          }
          featuredImage {
            node {
              sourceUrl
              altText
              mediaDetails {
                width
                height
              }
            }
          }
          categories {
            nodes {
              name
              slug
            }
          }
        }
      }
    }
  }
`

// API Functions
export async function getAllPosts(): Promise<WordPressPost[]> {
  try {
    const data = await client.request<WordPressPostsResponse>(GET_ALL_POSTS, { first: 100 })
    return data.posts.edges.map(edge => edge.node)
  } catch (error) {
    console.error('Error fetching posts:', error)
    return []
  }
}

export async function getPostBySlug(slug: string): Promise<WordPressPost | null> {
  try {
    const data = await client.request<WordPressPostResponse>(GET_POST_BY_SLUG, { slug })
    return data.post
  } catch (error) {
    console.error(`Error fetching post with slug ${slug}:`, error)
    return null
  }
}

export async function getCategories(): Promise<Array<{ name: string; slug: string; count: number }>> {
  try {
    const data = await client.request<WordPressCategoriesResponse>(GET_CATEGORIES)
    return data.categories.nodes
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

export async function getPostsByCategory(categorySlug: string): Promise<WordPressPost[]> {
  try {
    const data = await client.request<WordPressPostsResponse>(GET_POSTS_BY_CATEGORY, { 
      categorySlug,
      first: 100 
    })
    return data.posts.edges.map(edge => edge.node)
  } catch (error) {
    console.error(`Error fetching posts for category ${categorySlug}:`, error)
    return []
  }
}

// Event GraphQL Queries
const GET_ALL_EVENTS = `
  query GetAllEvents($first: Int = 100) {
    events(first: $first, where: { orderby: { field: DATE, order: DESC } }) {
      edges {
        node {
          id
          title
          slug
          excerpt
          content
          date
          modified
          featuredImage {
            node {
              sourceUrl
              altText
              mediaDetails {
                width
                height
              }
            }
          }
          eventDetails {
            eventDate
            eventTime
            eventEndDate
            locationName
            address
            eventType
            isFeatured
            eventStatus
            attendeeCount
            maxAttendees
            registrationLink
            price
            eventImage1 {
              sourceUrl
              altText
              mediaDetails {
                width
                height
              }
            }
            eventImage2 {
              sourceUrl
              altText
              mediaDetails {
                width
                height
              }
            }
            eventImage3 {
              sourceUrl
              altText
              mediaDetails {
                width
                height
              }
            }
            eventImage4 {
              sourceUrl
              altText
              mediaDetails {
                width
                height
              }
            }
            eventImage5 {
              sourceUrl
              altText
              mediaDetails {
                width
                height
              }
            }
            eventImage6 {
              sourceUrl
              altText
              mediaDetails {
                width
                height
              }
            }
          }
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`

const GET_EVENT_BY_SLUG = `
  query GetEventBySlug($slug: String!) {
    event: eventBy(slug: $slug) {
      id
      title
      slug
      content
      excerpt
      date
      modified
      featuredImage {
        node {
          sourceUrl
          altText
          mediaDetails {
            width
            height
          }
        }
      }
      eventDetails {
        eventDate
        eventTime
        eventEndDate
        locationName
        address
        eventType
        isFeatured
        eventStatus
        attendeeCount
        maxAttendees
        registrationLink
        price
        eventImage1 {
          sourceUrl
          altText
          mediaDetails {
            width
            height
          }
        }
        eventImage2 {
          sourceUrl
          altText
          mediaDetails {
            width
            height
          }
        }
        eventImage3 {
          sourceUrl
          altText
          mediaDetails {
            width
            height
          }
        }
        eventImage4 {
          sourceUrl
          altText
          mediaDetails {
            width
            height
          }
        }
        eventImage5 {
          sourceUrl
          altText
          mediaDetails {
            width
            height
          }
        }
        eventImage6 {
          sourceUrl
          altText
          mediaDetails {
            width
            height
          }
        }
      }
    }
  }
`

// Event API Functions
export async function getAllEvents(): Promise<WordPressEvent[]> {
  try {
    const data = await client.request<WordPressEventsResponse>(GET_ALL_EVENTS, { first: 100 })
    return data.events.edges.map(edge => edge.node)
  } catch (error) {
    console.error('Error fetching events:', error)
    return []
  }
}

export async function getUpcomingEvents(): Promise<WordPressEvent[]> {
  try {
    const allEvents = await getAllEvents()
    const now = new Date()
    return allEvents.filter(event => {
      if (event.eventDetails?.eventStatus === 'past') return false
      const eventDate = new Date(event.eventDetails?.eventDate || event.date)
      return eventDate >= now && event.eventDetails?.eventStatus !== 'cancelled'
    }).sort((a, b) => {
      const dateA = new Date(a.eventDetails?.eventDate || a.date)
      const dateB = new Date(b.eventDetails?.eventDate || b.date)
      return dateA.getTime() - dateB.getTime()
    })
  } catch (error) {
    console.error('Error fetching upcoming events:', error)
    return []
  }
}

export async function getPastEvents(): Promise<WordPressEvent[]> {
  try {
    const allEvents = await getAllEvents()
    const now = new Date()
    return allEvents.filter(event => {
      if (event.eventDetails?.eventStatus === 'past') return true
      const eventDate = new Date(event.eventDetails?.eventDate || event.date)
      return eventDate < now
    }).sort((a, b) => {
      const dateA = new Date(a.eventDetails?.eventDate || a.date)
      const dateB = new Date(b.eventDetails?.eventDate || b.date)
      return dateB.getTime() - dateA.getTime()
    })
  } catch (error) {
    console.error('Error fetching past events:', error)
    return []
  }
}

// Helper to get all event images as an array
export function getEventImages(event: WordPressEvent): Array<{ sourceUrl: string; altText: string }> {
  const images: Array<{ sourceUrl: string; altText: string }> = []
  
  if (event.eventDetails?.eventImage1) {
    images.push(event.eventDetails.eventImage1)
  }
  if (event.eventDetails?.eventImage2) {
    images.push(event.eventDetails.eventImage2)
  }
  if (event.eventDetails?.eventImage3) {
    images.push(event.eventDetails.eventImage3)
  }
  if (event.eventDetails?.eventImage4) {
    images.push(event.eventDetails.eventImage4)
  }
  if (event.eventDetails?.eventImage5) {
    images.push(event.eventDetails.eventImage5)
  }
  if (event.eventDetails?.eventImage6) {
    images.push(event.eventDetails.eventImage6)
  }
  
  return images
}

export async function getEventBySlug(slug: string): Promise<WordPressEvent | null> {
  try {
    const data = await client.request<WordPressEventResponse>(GET_EVENT_BY_SLUG, { slug })
    return data.event
  } catch (error) {
    console.error(`Error fetching event with slug ${slug}:`, error)
    return null
  }
}

// Utility functions
export function calculateReadTime(content: string | undefined): string {
  if (!content) return '5 min read'
  const wordsPerMinute = 200
  const wordCount = content.split(/\s+/).length
  const minutes = Math.ceil(wordCount / wordsPerMinute)
  return `${minutes} min read`
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export function formatEventDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
