# WordPress GraphQL Blog Setup

This blog is configured to fetch posts from a WordPress backend using GraphQL.

## Prerequisites

Your WordPress site must have the **WPGraphQL** plugin installed and activated.

### Install WPGraphQL Plugin

1. Go to your WordPress admin panel
2. Navigate to **Plugins > Add New**
3. Search for "WPGraphQL"
4. Install and activate the plugin by **WPGraphQL**

## Configuration

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Update the WordPress GraphQL endpoint in `.env.local`:
   ```
   NEXT_PUBLIC_WORDPRESS_GRAPHQL_ENDPOINT=https://your-wordpress-site.com/graphql
   ```

## WordPress Setup

### Required WordPress Configuration

1. **Install WPGraphQL Plugin**: This is the main plugin that exposes your WordPress data via GraphQL
   - Download from: https://www.wpgraphql.com/
   - Or install via WordPress admin: Plugins > Add New > Search "WPGraphQL"

2. **Verify GraphQL Endpoint**: After installation, your GraphQL endpoint will be at:
   ```
   https://your-wordpress-site.com/graphql
   ```

3. **Test Your Endpoint**: Visit the GraphQL IDE (GraphiQL) at:
   ```
   https://your-wordpress-site.com/graphql
   ```

### Optional Plugins for Enhanced Features

- **WPGraphQL for Advanced Custom Fields (ACF)**: If you use ACF for custom fields
- **WPGraphQL JWT Authentication**: For authenticated requests
- **WPGraphQL CORS**: To configure CORS settings if needed

## Features

The blog integration includes:

- ✅ Fetches all blog posts from WordPress
- ✅ Dynamic routing based on post slugs
- ✅ Featured images support
- ✅ Categories and tags
- ✅ Author information
- ✅ Post excerpts and full content
- ✅ Server-side rendering with revalidation
- ✅ Automatic static generation for all posts

## Data Flow

1. **Build Time**: All blog posts are fetched and statically generated
2. **Runtime**: Pages are revalidated every hour (configurable)
3. **New Posts**: Automatically appear after revalidation period

## Available GraphQL Queries

The integration uses the following queries:

### Get All Posts
```graphql
query GetAllPosts($first: Int = 100) {
  posts(first: $first, where: { orderby: { field: DATE, order: DESC } }) {
    edges {
      node {
        id
        title
        slug
        excerpt
        date
        author { node { name } }
        featuredImage { node { sourceUrl } }
        categories { nodes { name, slug } }
      }
    }
  }
}
```

### Get Post by Slug
```graphql
query GetPostBySlug($slug: String!) {
  post: postBy(slug: $slug) {
    id
    title
    content
    excerpt
    date
    author { node { name } }
    featuredImage { node { sourceUrl } }
    categories { nodes { name, slug } }
    tags { nodes { name, slug } }
  }
}
```

## Customization

### Adjusting Revalidation Time

In `src/app/blog/page.tsx` and `src/app/blog/[slug]/page.tsx`, modify:

```typescript
export const revalidate = 3600 // Time in seconds (3600 = 1 hour)
```

### Adding Custom Fields

To fetch custom fields from WordPress, update the GraphQL queries in `src/lib/wordpress.ts` and add them to the TypeScript interfaces in `src/types/wordpress.ts`.

## Troubleshooting

### Posts Not Appearing

1. Verify your WordPress GraphQL endpoint is accessible
2. Check that posts are published (not drafts)
3. Ensure WPGraphQL plugin is active
4. Check browser console for error messages

### CORS Issues

If you encounter CORS errors:

1. Install the "WPGraphQL CORS" plugin on WordPress
2. Configure allowed origins in WordPress settings
3. Or add CORS headers to your WordPress server

### Build Errors

If you see build errors related to missing data:

1. Ensure `.env.local` is configured correctly
2. Verify WordPress site is accessible
3. Check GraphQL endpoint returns valid data

## Development

To develop locally with a WordPress backend:

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Production Deployment

When deploying to production:

1. Set the `NEXT_PUBLIC_WORDPRESS_GRAPHQL_ENDPOINT` environment variable
2. Ensure your WordPress site is publicly accessible
3. Configure ISR (Incremental Static Regeneration) as needed

## API Reference

### Functions in `src/lib/wordpress.ts`

- `getAllPosts()`: Fetches all published posts
- `getPostBySlug(slug)`: Fetches a single post by slug
- `getCategories()`: Fetches all categories with post counts
- `getPostsByCategory(categorySlug)`: Fetches posts in a specific category
- `calculateReadTime(content)`: Calculates estimated reading time
- `formatDate(dateString)`: Formats date strings

## Support

For issues with:
- **WPGraphQL Plugin**: Visit https://www.wpgraphql.com/docs/
- **Next.js Integration**: Check Next.js documentation at https://nextjs.org/docs
- **This Setup**: Create an issue in the repository
