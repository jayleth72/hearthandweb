import { GraphQLClient } from 'graphql-request'
import type { 
  WordPressPostsResponse, 
  WordPressPostResponse, 
  WordPressCategoriesResponse,
  WordPressPost,
  WordPressEvent,
  WordPressEventsResponse,
  WordPressEventResponse,
  WordPressChecklist,
  WordPressChecklistsResponse,
  WordPressChecklistResponse,
  CreateChecklistInput,
  UpdateChecklistInput,
  ChecklistItem
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

// ============================================
// CHECKLIST QUERIES AND MUTATIONS
// ============================================

const GET_ALL_CHECKLISTS = `
  query GetAllChecklists($first: Int = 100) {
    checklists(first: $first, where: { orderby: { field: MODIFIED, order: DESC } }) {
      edges {
        node {
          id
          databaseId
          title
          date
          modified
          checklistDetails {
            eventDate
            eventTimeStart
            eventTimeEnd
            eventAddress
            eventMapsLink
            checklistItems {
              text
              completed
              category
            }
            lastModified
          }
        }
      }
    }
  }
`

const GET_CHECKLIST_BY_ID = `
  query GetChecklistById($id: ID!) {
    checklist(id: $id, idType: DATABASE_ID) {
      id
      databaseId
      title
      date
      modified
      checklistDetails {
        eventDate
        eventTimeStart
        eventTimeEnd
        eventAddress
        eventMapsLink
        checklistItems {
          text
          completed
          category
        }
        lastModified
      }
    }
  }
`

const CREATE_CHECKLIST = `
  mutation CreateChecklist($title: String!, $eventDate: String, $items: String) {
    createChecklist(input: {
      title: $title
      status: PUBLISH
    }) {
      checklist {
        id
        databaseId
        title
      }
    }
  }
`

const UPDATE_CHECKLIST = `
  mutation UpdateChecklist($id: ID!, $title: String, $eventDate: String, $items: String) {
    updateChecklist(input: {
      id: $id
      title: $title
    }) {
      checklist {
        id
        databaseId
        title
        modified
      }
    }
  }
`

const DELETE_CHECKLIST = `
  mutation DeleteChecklist($id: ID!) {
    deleteChecklist(input: {
      id: $id
    }) {
      deletedId
    }
  }
`

// Get all checklists
export async function getAllChecklists(): Promise<WordPressChecklist[]> {
  try {
    const data = await client.request<WordPressChecklistsResponse>(GET_ALL_CHECKLISTS, { first: 100 })
    return data.checklists.edges.map(edge => edge.node)
  } catch (error) {
    console.error('Error fetching checklists:', error)
    return []
  }
}

// Get checklist by ID
export async function getChecklistById(id: number): Promise<WordPressChecklist | null> {
  try {
    const data = await client.request<WordPressChecklistResponse>(GET_CHECKLIST_BY_ID, { id })
    return data.checklist
  } catch (error) {
    console.error('Error fetching checklist:', error)
    return null
  }
}

// Create new checklist
export async function createChecklist(input: CreateChecklistInput): Promise<number | null> {
  try {
    console.log('Creating checklist with input:', input);
    
    const wpUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL || ''
    
    if (!wpUrl) {
      throw new Error('NEXT_PUBLIC_WORDPRESS_URL is not configured');
    }
    
    // Use our custom REST API endpoint to create the checklist
    const createUrl = `${wpUrl}/wp-json/hearthand/v1/checklist/create`;
    console.log('Creating checklist at:', createUrl);
    
    const payload = {
      title: input.title,
      event_date: input.eventDate || '',
      event_time_start: input.eventTimeStart || '',
      event_time_end: input.eventTimeEnd || '',
      event_address: input.eventAddress || '',
      event_maps_link: input.eventMapsLink || '',
      checklist_items: input.items || []
    };
    
    console.log('Sending payload:', JSON.stringify(payload, null, 2));
    
    const createResponse = await fetch(createUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });
    
    console.log('Create response status:', createResponse.status);
    
    if (!createResponse.ok) {
      const errorText = await createResponse.text();
      console.error('Failed to create checklist:', createResponse.status, errorText);
      throw new Error(`Failed to create checklist: ${createResponse.status} - ${errorText}`);
    }
    
    const createResult = await createResponse.json();
    const checklistId = createResult.post_id;
    console.log('Created checklist with ID:', checklistId, 'Response:', createResult);
    
    return checklistId
  } catch (error) {
    console.error('Error creating checklist:', error)
    return null
  }
}

// Update existing checklist
export async function updateChecklist(input: UpdateChecklistInput): Promise<boolean> {
  try {
    console.log('Updating checklist with input:', input);
    
    const wpUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL || ''
    
    if (!wpUrl) {
      throw new Error('NEXT_PUBLIC_WORDPRESS_URL is not configured');
    }
    
    // Use REST API to update the post title if needed
    if (input.title) {
      const updateUrl = `${wpUrl}/wp-json/wp/v2/checklist/${input.id}`;
      console.log('Updating checklist title at:', updateUrl);
      
      const updateResponse = await fetch(updateUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: input.title
        })
      });
      
      if (!updateResponse.ok) {
        const errorText = await updateResponse.text();
        console.error('Failed to update checklist title:', updateResponse.status, errorText);
        // Continue even if title update fails
      }
    }
    
    // Update ACF fields
    await updateChecklistACF(input.id, input.eventDate, input.eventTimeStart, input.eventTimeEnd, input.eventAddress, input.eventMapsLink, input.items)
    
    return true
  } catch (error) {
    console.error('Error updating checklist:', error)
    return false
  }
}

// Delete checklist
export async function deleteChecklist(id: number): Promise<boolean> {
  try {
    console.log('Deleting checklist with ID:', id);
    
    const wpUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL || ''
    
    if (!wpUrl) {
      throw new Error('NEXT_PUBLIC_WORDPRESS_URL is not configured');
    }
    
    // Use our custom REST API endpoint to delete the checklist
    const deleteUrl = `${wpUrl}/wp-json/hearthand/v1/checklist/${id}/delete`;
    console.log('Deleting checklist at:', deleteUrl);
    
    const deleteResponse = await fetch(deleteUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    console.log('Delete response status:', deleteResponse.status);
    
    if (!deleteResponse.ok) {
      const errorText = await deleteResponse.text();
      console.error('Failed to delete checklist:', deleteResponse.status, errorText);
      throw new Error(`Failed to delete checklist: ${deleteResponse.status} - ${errorText}`);
    }
    
    const deleteResult = await deleteResponse.json();
    console.log('Successfully deleted checklist:', deleteResult);
    
    return true
  } catch (error) {
    console.error('Error deleting checklist:', error)
    return false
  }
}

// Helper function to update ACF fields via custom REST API endpoint
async function updateChecklistACF(id: number, eventDate?: string, eventTimeStart?: string, eventTimeEnd?: string, eventAddress?: string, eventMapsLink?: string, items?: ChecklistItem[]): Promise<void> {
  try {
    const wpUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL || ''
    
    if (!wpUrl) {
      throw new Error('NEXT_PUBLIC_WORDPRESS_URL is not configured');
    }
    
    const url = `${wpUrl}/wp-json/hearthand/v1/checklist/${id}`;
    console.log('Updating ACF fields for checklist:', id);
    console.log('WordPress URL:', url);
    console.log('Event date:', eventDate);
    console.log('Event time start:', eventTimeStart);
    console.log('Event time end:', eventTimeEnd);
    console.log('Event address:', eventAddress);
    console.log('Event maps link:', eventMapsLink);
    console.log('Items count:', items?.length || 0);
    
    const payload = {
      event_date: eventDate || '',
      event_time_start: eventTimeStart || '',
      event_time_end: eventTimeEnd || '',
      event_address: eventAddress || '',
      event_maps_link: eventMapsLink || '',
      checklist_items: items || []
    };
    
    console.log('Sending payload:', JSON.stringify(payload, null, 2));
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });
    
    console.log('Response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('ACF update failed:', response.status, errorText);
      throw new Error(`Failed to update ACF fields: ${response.status} - ${errorText}`);
    }
    
    const result = await response.json();
    console.log('ACF update response:', result);
  } catch (error) {
    console.error('Error updating ACF fields:', error);
    throw error;
  }
}
