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
  cache: 'no-store',
  next: { revalidate: 0 }
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
            endDate
            locationName
            address
            eventType
            isFeatured
            maxAttendees
            registrationLink
            price
            eventImage1 {
              node {
                id
                sourceUrl
                altText
                databaseId
              }
            }
            eventImage2 {
              node {
                id
                sourceUrl
                altText
                databaseId
              }
            }
            eventImage3 {
              node {
                id
                sourceUrl
                altText
                databaseId
              }
            }
            eventImage4 {
              node {
                id
                sourceUrl
                altText
                databaseId
              }
            }
            eventImage5 {
              node {
                id
                sourceUrl
                altText
                databaseId
              }
            }
            eventImage6 {
              node {
                id
                sourceUrl
                altText
                databaseId
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
        endDate
        locationName
        address
        eventType
        isFeatured
        maxAttendees
        registrationLink
        price
        eventImage1 {
          node {
            id
            sourceUrl
            altText
            databaseId
          }
        }
        eventImage2 {
          node {
            id
            sourceUrl
            altText
            databaseId
          }
        }
        eventImage3 {
          node {
            id
            sourceUrl
            altText
            databaseId
          }
        }
        eventImage4 {
          node {
            id
            sourceUrl
            altText
            databaseId
          }
        }
        eventImage5 {
          node {
            id
            sourceUrl
            altText
            databaseId
          }
        }
        eventImage6 {
          node {
            id
            sourceUrl
            altText
            databaseId
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
    now.setHours(0, 0, 0, 0) // Start of today
    return allEvents.filter(event => {
      const eventDate = new Date(event.eventDetails?.eventDate || event.date)
      return eventDate >= now
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
    now.setHours(0, 0, 0, 0) // Start of today
    return allEvents.filter(event => {
      // Check eventStatus if available, otherwise use date
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
  
  // Helper to extract image from potentially nested structure
  const extractImage = (imageField: any) => {
    if (!imageField) return null
    const imageNode = imageField.node || imageField
    if (imageNode && imageNode.sourceUrl) {
      return {
        sourceUrl: imageNode.sourceUrl,
        altText: imageNode.altText || ''
      }
    }
    return null
  }
  
  const image1 = extractImage(event.eventDetails?.eventImage1)
  if (image1) images.push(image1)
  
  const image2 = extractImage(event.eventDetails?.eventImage2)
  if (image2) images.push(image2)
  
  const image3 = extractImage(event.eventDetails?.eventImage3)
  if (image3) images.push(image3)
  
  const image4 = extractImage(event.eventDetails?.eventImage4)
  if (image4) images.push(image4)
  
  const image5 = extractImage(event.eventDetails?.eventImage5)
  if (image5) images.push(image5)
  
  const image6 = extractImage(event.eventDetails?.eventImage6)
  if (image6) images.push(image6)
  
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
            contactInfo
            eventTheme
            paymentStatus
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
        contactInfo
        eventTheme
        paymentStatus
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

const CREATE_EVENT = `
  mutation CreateEvent($title: String!, $content: String, $excerpt: String) {
    createEvent(input: {
      title: $title
      content: $content
      excerpt: $excerpt
      status: PUBLISH
    }) {
      event {
        id
        databaseId
        title
      }
    }
  }
`

const UPDATE_EVENT = `
  mutation UpdateEvent($id: ID!, $title: String, $content: String, $excerpt: String) {
    updateEvent(input: {
      id: $id
      title: $title
      content: $content
      excerpt: $excerpt
    }) {
      event {
        id
        databaseId
        title
        modified
      }
    }
  }
`

const DELETE_EVENT = `
  mutation DeleteEvent($id: ID!) {
    deleteEvent(input: {
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
      contact_info: input.contactInfo || '',
      event_theme: input.eventTheme || '',
      payment_status: input.paymentStatus || 'need_to_pay',
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
    await updateChecklistACF(input.id, input.eventDate, input.eventTimeStart, input.eventTimeEnd, input.eventAddress, input.eventMapsLink, input.contactInfo, input.eventTheme, input.paymentStatus, input.items)
    
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
async function updateChecklistACF(id: number, eventDate?: string, eventTimeStart?: string, eventTimeEnd?: string, eventAddress?: string, eventMapsLink?: string, contactInfo?: string, eventTheme?: string, paymentStatus?: 'free' | 'need_to_pay', items?: ChecklistItem[]): Promise<void> {
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
    console.log('Contact info:', contactInfo);
    console.log('Event theme:', eventTheme);
    console.log('Payment status:', paymentStatus);
    console.log('Items count:', items?.length || 0);
    
    const payload = {
      event_date: eventDate || '',
      event_time_start: eventTimeStart || '',
      event_time_end: eventTimeEnd || '',
      event_address: eventAddress || '',
      event_maps_link: eventMapsLink || '',
      contact_info: contactInfo || '',
      event_theme: eventTheme || '',
      payment_status: paymentStatus || 'need_to_pay',
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

// Event Management Functions

export interface CreateEventInput {
  title: string
  content?: string
  excerpt?: string
  eventDate: string
  eventTime: string
  eventEndDate?: string
  locationName: string
  address: string
  eventType: 'festival' | 'party' | 'corporate' | 'community'
  isFeatured?: boolean
  maxAttendees?: number
  registrationLink?: string
  price?: string
  featuredImageId?: number
  eventImages?: number[] // Array of image IDs
}

export interface UpdateEventInput extends Partial<CreateEventInput> {
  id: number
}

// Create new event
export async function createEvent(input: CreateEventInput, token: string): Promise<number | null> {
  try {
    console.log('Creating event with input:', input);
    
    const wpUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL || ''
    
    if (!wpUrl) {
      throw new Error('NEXT_PUBLIC_WORDPRESS_URL is not configured');
    }
    
    // First create the event post with ACF fields in the same request
    const createUrl = `${wpUrl}/wp-json/wp/v2/events`;
    console.log('Creating event at:', createUrl);
    
    const postPayload: any = {
      title: input.title,
      content: input.content || '',
      excerpt: input.excerpt || '',
      status: 'publish',
      // Include ACF fields directly in the creation payload
      event_date: input.eventDate,
      event_time: input.eventTime,
      event_end_date: input.eventEndDate || '',
      location_name: input.locationName,
      address: input.address,
      event_type: input.eventType,
      is_featured: input.isFeatured || false,
      max_attendees: input.maxAttendees || '',
      registration_link: input.registrationLink || '',
      price: input.price || 'Free',
      event_status: 'upcoming'
    };
    
    // Add event images if provided
    const inputAny = input as any;
    for (let i = 1; i <= 6; i++) {
      const imageKey = `event_image_${i}`;
      if (inputAny[imageKey]) {
        postPayload[imageKey] = inputAny[imageKey];
      }
    }
    
    if (input.featuredImageId) {
      postPayload.featured_media = input.featuredImageId;
    }
    
    console.log('Create payload:', JSON.stringify(postPayload, null, 2));
    
    const createResponse = await fetch(createUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(postPayload)
    });
    
    console.log('Create response status:', createResponse.status);
    
    if (!createResponse.ok) {
      const errorText = await createResponse.text();
      console.error('Failed to create event:', createResponse.status, errorText);
      throw new Error(`Failed to create event: ${createResponse.status} - ${errorText}`);
    }
    
    const createResult = await createResponse.json();
    const eventId = createResult.id;
    console.log('Created event with ID:', eventId);
    
    return eventId
  } catch (error) {
    console.error('Error creating event:', error)
    throw error;
  }
}

// Update existing event
export async function updateEvent(input: UpdateEventInput, token: string): Promise<boolean> {
  try {
    console.log('Updating event with input:', input);
    
    const wpUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL || ''
    
    if (!wpUrl) {
      throw new Error('NEXT_PUBLIC_WORDPRESS_URL is not configured');
    }
    
    // Update the event post with ACF fields in the same request
    const updateUrl = `${wpUrl}/wp-json/wp/v2/events/${input.id}`;
    console.log('Updating event at:', updateUrl);
    
    const postPayload: any = {};
    
    if (input.title) postPayload.title = input.title;
    if (input.content !== undefined) postPayload.content = input.content;
    if (input.excerpt !== undefined) postPayload.excerpt = input.excerpt;
    if (input.featuredImageId) postPayload.featured_media = input.featuredImageId;
    
    // Include ACF fields directly in the update payload
    if (input.eventDate !== undefined) postPayload.event_date = input.eventDate;
    if (input.eventTime !== undefined) postPayload.event_time = input.eventTime;
    if (input.eventEndDate !== undefined) postPayload.event_end_date = input.eventEndDate || '';
    if (input.locationName !== undefined) postPayload.location_name = input.locationName;
    if (input.address !== undefined) postPayload.address = input.address;
    if (input.eventType !== undefined) postPayload.event_type = input.eventType;
    if (input.isFeatured !== undefined) postPayload.is_featured = input.isFeatured;
    if (input.maxAttendees !== undefined) postPayload.max_attendees = input.maxAttendees || '';
    if (input.registrationLink !== undefined) postPayload.registration_link = input.registrationLink || '';
    if (input.price !== undefined) postPayload.price = input.price || 'Free';
    
    // Add event images if provided
    const inputAny = input as any;
    for (let i = 1; i <= 6; i++) {
      const imageKey = `event_image_${i}`;
      if (inputAny[imageKey] !== undefined) {
        postPayload[imageKey] = inputAny[imageKey];
      }
    }
    
    console.log('Update payload:', JSON.stringify(postPayload, null, 2));
    
    const updateResponse = await fetch(updateUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(postPayload)
    });
    
    if (!updateResponse.ok) {
      const errorText = await updateResponse.text();
      console.error('Failed to update event post:', updateResponse.status, errorText);
      throw new Error(`Failed to update event: ${updateResponse.status} - ${errorText}`);
    }
    
    console.log('Event updated successfully');
    
    return true
  } catch (error) {
    console.error('Error updating event:', error)
    throw error;
  }
}

// Delete event
export async function deleteEvent(id: number, token: string): Promise<boolean> {
  try {
    console.log('Deleting event with ID:', id);
    
    const wpUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL || ''
    
    if (!wpUrl) {
      throw new Error('NEXT_PUBLIC_WORDPRESS_URL is not configured');
    }
    
    const deleteUrl = `${wpUrl}/wp-json/wp/v2/events/${id}?force=true`;
    console.log('Deleting event at:', deleteUrl);
    
    const deleteResponse = await fetch(deleteUrl, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    
    console.log('Delete response status:', deleteResponse.status);
    
    if (!deleteResponse.ok) {
      const errorText = await deleteResponse.text();
      console.error('Failed to delete event:', deleteResponse.status, errorText);
      throw new Error(`Failed to delete event: ${deleteResponse.status} - ${errorText}`);
    }
    
    const deleteResult = await deleteResponse.json();
    console.log('Successfully deleted event:', deleteResult);
    
    return true
  } catch (error) {
    console.error('Error deleting event:', error)
    return false
  }
}

// Helper function to update Event ACF fields
async function updateEventACF(id: number, input: Partial<CreateEventInput>, token: string): Promise<void> {
  try {
    const wpUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL || ''
    
    if (!wpUrl) {
      throw new Error('NEXT_PUBLIC_WORDPRESS_URL is not configured');
    }
    
    console.log('updateEventACF called with input:', JSON.stringify(input, null, 2));
    
    // ACF fields are updated directly via ACF REST API
    const acfFields: any = {};
    
    if (input.eventDate !== undefined) acfFields.event_date = input.eventDate;
    if (input.eventTime !== undefined) acfFields.event_time = input.eventTime;
    if (input.eventEndDate !== undefined) acfFields.event_end_date = input.eventEndDate || '';
    if (input.locationName !== undefined) acfFields.location_name = input.locationName;
    if (input.address !== undefined) acfFields.address = input.address;
    if (input.eventType !== undefined) acfFields.event_type = input.eventType;
    if (input.isFeatured !== undefined) acfFields.is_featured = input.isFeatured;
    if (input.maxAttendees !== undefined) acfFields.max_attendees = input.maxAttendees || '';
    if (input.registrationLink !== undefined) acfFields.registration_link = input.registrationLink || '';
    if (input.price !== undefined) acfFields.price = input.price || 'Free';
    
    // Handle event images
    if (input.eventImages) {
      const imageFields = ['event_image_1', 'event_image_2', 'event_image_3', 'event_image_4', 'event_image_5', 'event_image_6'];
      input.eventImages.forEach((imageId, index) => {
        if (index < 6) {
          acfFields[imageFields[index]] = imageId;
        }
      });
    }
    
    console.log('Updating event ACF fields for event ID:', id);
    console.log('ACF fields to update:', JSON.stringify(acfFields, null, 2));
    
    // Use custom ACF endpoint
    const url = `${wpUrl}/wp-json/hearthand/v1/event/${id}/acf`;
    console.log('Sending request to:', url);
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(acfFields)
    });
    
    console.log('ACF update response status:', response.status);
    console.log('ACF update response headers:', Object.fromEntries(response.headers.entries()));
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('ACF update failed:', response.status, errorText);
      throw new Error(`Failed to update event ACF fields: ${response.status} - ${errorText}`);
    }
    
    const result = await response.json();
    console.log('ACF update successful:', result);
  } catch (error) {
    console.error('Error updating event ACF fields:', error);
    throw error;
  }
}
