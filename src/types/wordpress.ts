export interface WordPressPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  date: string
  modified: string
  author: {
    node: {
      name: string
      avatar?: {
        url: string
      }
    }
  }
  featuredImage?: {
    node: {
      sourceUrl: string
      altText: string
      mediaDetails: {
        width: number
        height: number
      }
    }
  }
  categories: {
    nodes: Array<{
      name: string
      slug: string
    }>
  }
  tags?: {
    nodes: Array<{
      name: string
      slug: string
    }>
  }
}

export interface WordPressPostEdge {
  node: WordPressPost
}

export interface WordPressPostsResponse {
  posts: {
    edges: WordPressPostEdge[]
    pageInfo: {
      hasNextPage: boolean
      hasPreviousPage: boolean
      startCursor: string
      endCursor: string
    }
  }
}

export interface WordPressPostResponse {
  post: WordPressPost
}

export interface WordPressCategoriesResponse {
  categories: {
    nodes: Array<{
      name: string
      slug: string
      count: number
    }>
  }
}

// Event ACF Types
export interface EventImage {
  sourceUrl: string
  altText: string
  mediaDetails: {
    width: number
    height: number
  }
}

export interface EventACF {
  eventDate: string
  eventTime: string
  eventEndDate?: string
  locationName: string
  address: string
  eventType: 'festival' | 'party' | 'corporate' | 'community'
  isFeatured?: boolean
  eventStatus: 'upcoming' | 'past' | 'cancelled'
  attendeeCount?: number
  maxAttendees?: number
  registrationLink?: string
  price?: string
  eventImage1?: EventImage
  eventImage2?: EventImage
  eventImage3?: EventImage
  eventImage4?: EventImage
  eventImage5?: EventImage
  eventImage6?: EventImage
}

export interface WordPressEvent {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  date: string
  modified: string
  featuredImage?: {
    node: {
      sourceUrl: string
      altText: string
      mediaDetails: {
        width: number
        height: number
      }
    }
  }
  eventDetails?: EventACF
}

export interface WordPressEventEdge {
  node: WordPressEvent
}

export interface WordPressEventsResponse {
  events: {
    edges: WordPressEventEdge[]
    pageInfo: {
      hasNextPage: boolean
      hasPreviousPage: boolean
      startCursor: string
      endCursor: string
    }
  }
}

export interface WordPressEventResponse {
  event: WordPressEvent
}
