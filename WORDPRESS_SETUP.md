# WordPress GraphQL Blog Integration

This document explains how to set up and use WordPress as a backend for the blog section of the Heart & Hand website.

## Overview

The blog system supports two modes:
1. **WordPress Mode**: Fetches blog posts from a WordPress backend via GraphQL
2. **Local Mode**: Falls back to local markdown files in `content/blog/`

## Prerequisites

To use WordPress as your blog backend, you need:

1. A WordPress installation with WPGraphQL plugin installed and activated
2. The GraphQL endpoint URL (usually `https://your-site.com/graphql`)

## Setting Up WordPress

### 1. Install Required WordPress Plugin

Install the **WPGraphQL** plugin on your WordPress site:

```bash
# Via WordPress Admin
# Navigate to Plugins > Add New
# Search for "WPGraphQL"
# Install and activate
```

Or download from: https://www.wpgraphql.com/

### 2. Configure Environment Variables

Create a `.env.local` file in the root of your project (or add to your deployment environment):

```bash
# For server-side only access
WORDPRESS_API_URL=https://your-wordpress-site.com/graphql

# OR for client-side access (if needed)
NEXT_PUBLIC_WORDPRESS_API_URL=https://your-wordpress-site.com/graphql
```

**Note**: Use `NEXT_PUBLIC_` prefix only if you need to access the endpoint from client-side code.

### 3. Verify Configuration

The blog will automatically:
- Try to fetch from WordPress if the environment variable is set
- Fall back to local markdown files if WordPress is not configured or fails
- Log which source it's using (check server console)

## WordPress Post Structure

The integration expects WordPress posts with:

### Required Fields
- **Title**: Post title
- **Content**: Post content (supports HTML from WordPress editor)
- **Excerpt**: Short description
- **Date**: Publication date
- **Author**: Author name
- **Categories**: At least one category

### Optional Fields
- **Featured Image**: Post thumbnail
- **Tags**: Post tags
- **Custom fields**: (Can be extended in `src/lib/wordpress.ts`)

## Data Flow

```
WordPress Backend (via GraphQL)
    ↓
Apollo Client (`src/lib/wordpress.ts`)
    ↓
Blog Pages (`src/app/blog/`)
    ↓
Rendered Components
```

## File Structure

```
src/
├── lib/
│   ├── wordpress.ts          # WordPress GraphQL client and queries
│   └── blog.ts                # Local markdown file reader (fallback)
├── types/
│   └── wordpress.ts           # TypeScript types for WordPress data
├── app/
│   └── blog/
│       ├── page.tsx           # Blog listing (server component)
│       └── [slug]/page.tsx    # Blog post detail (server component)
└── components/
    ├── BlogPageClient.tsx     # Client component for blog listing
    └── BlogPostClient.tsx     # Client component for blog post detail
```

## GraphQL Queries

### Get All Posts

```graphql
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
      }
    }
  }
}
```

### Get Single Post by Slug

```graphql
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
  }
}
```

## Caching

The blog pages use Next.js 15's built-in caching with `revalidate`:

```typescript
export const revalidate = 3600 // Revalidate every hour
```

This means:
- Posts are cached for 1 hour
- After 1 hour, the next request will trigger a new fetch
- Reduces load on WordPress backend
- Faster page loads for users

You can adjust this value in:
- `src/app/blog/page.tsx`
- `src/app/blog/[slug]/page.tsx`

## Development

### Testing with WordPress

1. Set up a WordPress site with WPGraphQL
2. Add some test posts
3. Configure the environment variable
4. Run the development server:

```bash
npm run dev
```

5. Visit `http://localhost:3000/blog`

### Testing with Local Files

1. Don't set the environment variable (or set it to empty string)
2. Add markdown files to `content/blog/`
3. The blog will automatically use local files

### Checking Which Source is Active

Check the server console logs:
- `"Fetched X posts from WordPress"` - Using WordPress
- `"Fetched X posts from local files"` - Using local markdown

## Troubleshooting

### Posts Not Showing

1. Check environment variable is set correctly
2. Verify WordPress GraphQL endpoint is accessible
3. Check server console for error messages
4. Test GraphQL endpoint directly in browser

### Images Not Loading

1. Verify featured images are set in WordPress
2. Check image URLs in GraphQL response
3. Add WordPress domain to `next.config.ts` `images.domains`

### Styling Issues

The blog uses:
- Tailwind CSS for styling
- Framer Motion for animations
- Custom prose styles for content

Check `src/components/BlogPageClient.tsx` and `src/components/BlogPostClient.tsx` for styling.

## Extending the Integration

### Adding Custom Fields

1. Add field to GraphQL query in `src/lib/wordpress.ts`
2. Update TypeScript types in `src/types/wordpress.ts`
3. Update transform function in `src/lib/wordpress.ts`
4. Use in components

### Adding Filtering/Search

The integration can be extended to support:
- Category filtering
- Tag filtering
- Search functionality
- Pagination
- Related posts

## Security Notes

- GraphQL endpoint should be public (read-only)
- No authentication required for reading posts
- Don't expose admin credentials
- Use HTTPS for WordPress site
- Keep WPGraphQL plugin updated

## Performance Tips

1. **Image Optimization**: Use WordPress image optimization plugins
2. **Caching**: Adjust `revalidate` time based on posting frequency
3. **CDN**: Use a CDN for WordPress media files
4. **Limit**: Query only necessary fields
5. **Pagination**: Implement pagination for large blogs

## Support

For issues related to:
- **WPGraphQL**: https://www.wpgraphql.com/docs/
- **Next.js**: https://nextjs.org/docs
- **Apollo Client**: https://www.apollographql.com/docs/react/

## License

This integration code is part of the Heart & Hand website project.
