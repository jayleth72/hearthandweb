# WordPress GraphQL Blog Integration - Quick Start

## Overview

The Heart & Hand website now fetches blog content from a WordPress backend via GraphQL, providing a powerful CMS for managing blog posts while maintaining the Next.js frontend.

## Quick Setup (5 Minutes)

### 1. Install WordPress Plugin

On your WordPress site:
- Go to **Plugins → Add New**
- Search for "**WPGraphQL**"
- Click **Install Now** then **Activate**

### 2. Configure Environment

In your Next.js project:

```bash
# Copy the example environment file
cp .env.example .env.local

# Edit .env.local and add your WordPress URL
NEXT_PUBLIC_WORDPRESS_GRAPHQL_ENDPOINT=https://your-site.com/graphql
```

### 3. Test Connection

```bash
npm run dev
```

Visit `http://localhost:3000/blog` to see your WordPress posts!

## How It Works

```
WordPress (Content) → GraphQL API → Next.js (Frontend)
     ↓                     ↓              ↓
  Posts, Images       Queries      Rendered Pages
```

## Key Features

✅ **Automatic Updates**: New posts appear within 1 hour (configurable)  
✅ **Featured Images**: WordPress media library images display automatically  
✅ **Categories & Tags**: Organize content with WordPress taxonomies  
✅ **SEO Friendly**: Server-side rendering with dynamic metadata  
✅ **Fast Performance**: Static generation + incremental regeneration  

## File Structure

```
src/
├── lib/
│   └── wordpress.ts          # GraphQL queries and API functions
├── types/
│   └── wordpress.ts          # TypeScript interfaces
└── app/
    └── blog/
        ├── page.tsx          # Blog listing (server component)
        ├── BlogClient.tsx    # Client-side interactions
        └── [slug]/
            ├── page.tsx      # Post detail (server component)
            └── BlogPostClient.tsx
```

## Creating Blog Posts in WordPress

1. Log into WordPress admin
2. Go to **Posts → Add New**
3. Write your content
4. Add a **Featured Image**
5. Set **Categories** and **Tags**
6. Click **Publish**

Your post will appear on the website within the revalidation period (default: 1 hour).

## Customization

### Change Revalidation Time

Edit `src/app/blog/page.tsx`:

```typescript
export const revalidate = 3600 // seconds (3600 = 1 hour)
```

Options:
- `60` = 1 minute (development)
- `3600` = 1 hour (recommended)
- `86400` = 1 day (static sites)
- `false` = never revalidate

### Add Custom Fields

1. Install Advanced Custom Fields (ACF) on WordPress
2. Install WPGraphQL for ACF plugin
3. Update queries in `src/lib/wordpress.ts`
4. Update types in `src/types/wordpress.ts`

## Troubleshooting

### "No posts found"
- Check WordPress has published posts (not drafts)
- Verify `.env.local` has correct WordPress URL
- Ensure WPGraphQL plugin is activated

### CORS Errors
- Install "WPGraphQL CORS" plugin on WordPress
- Add your Next.js domain to allowed origins

### Build Fails
- Verify WordPress site is accessible from build environment
- Check GraphQL endpoint returns valid JSON

## Testing Your GraphQL Endpoint

Visit your WordPress GraphQL IDE:
```
https://your-wordpress-site.com/graphql
```

Try this query:
```graphql
query {
  posts(first: 5) {
    nodes {
      title
      slug
      date
    }
  }
}
```

## Production Deployment

### Vercel/Netlify

Add environment variable in your hosting dashboard:
```
NEXT_PUBLIC_WORDPRESS_GRAPHQL_ENDPOINT=https://your-site.com/graphql
```

### Webhooks (Optional)

For instant updates, set up WordPress webhooks to trigger redeployment:
1. Install "WP Webhooks" plugin on WordPress
2. Configure webhook to trigger on post publish
3. Point to your hosting platform's deploy hook URL

## Additional Resources

- **WPGraphQL Documentation**: https://www.wpgraphql.com/docs
- **Next.js ISR Guide**: https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration
- **Complete Setup Guide**: See `WORDPRESS_BLOG_SETUP.md`

## Support

For detailed documentation, see:
- `WORDPRESS_BLOG_SETUP.md` - Complete setup guide
- `src/lib/wordpress.ts` - API implementation
- `src/types/wordpress.ts` - Data structures

Need help? Check the WPGraphQL documentation or create an issue in the repository.
