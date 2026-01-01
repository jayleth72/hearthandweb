export interface WordPressPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  date: string
  author: {
    node: {
      name: string
    }
  }
  categories: {
    nodes: Array<{
      name: string
    }>
  }
  featuredImage?: {
    node: {
      sourceUrl: string
      altText: string
    }
  }
  tags?: {
    nodes: Array<{
      name: string
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
      endCursor: string
    }
  }
}

export interface WordPressPostResponse {
  post: WordPressPost
}

export interface BlogPostData {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  date: string
  author: string
  category: string
  categories: string[]
  image?: string
  imageAlt?: string
  tags?: string[]
  readTime?: string
}
