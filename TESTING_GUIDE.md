# Testing Your WordPress GraphQL Blog

This guide will help you test your blog integration step by step.

## Pre-Test Checklist

Before testing, ensure:
- [ ] WPGraphQL plugin is installed on WordPress
- [ ] You have at least 2-3 published blog posts in WordPress
- [ ] Featured images are set on your posts
- [ ] Posts have categories assigned
- [ ] `.env.local` file exists with correct endpoint

## Step 1: Test WordPress GraphQL Endpoint

### Direct Browser Test

1. Open your browser
2. Navigate to: `https://your-wordpress-site.com/graphql`
3. You should see the GraphiQL interface (interactive GraphQL IDE)

If you see a 404 error, the WPGraphQL plugin may not be installed or activated.

### Test Query in GraphiQL

Paste this query in the GraphiQL interface:

```graphql
query TestQuery {
  posts(first: 5) {
    nodes {
      id
      title
      slug
      date
    }
  }
}
```

Click the "Play" button. You should see JSON response with your posts.

**Expected Result:**
```json
{
  "data": {
    "posts": {
      "nodes": [
        {
          "id": "cG9zdDox",
          "title": "My First Post",
          "slug": "my-first-post",
          "date": "2024-01-15T10:00:00"
        }
      ]
    }
  }
}
```

## Step 2: Configure Next.js Environment

### Create Environment File

```bash
cd /path/to/hearthandweb
cp .env.example .env.local
```

### Edit .env.local

Open `.env.local` and update:

```env
NEXT_PUBLIC_WORDPRESS_GRAPHQL_ENDPOINT=https://your-actual-wordpress-site.com/graphql
```

**Important:** 
- Replace `your-actual-wordpress-site.com` with your real domain
- Include `/graphql` at the end
- Use `https://` not `http://` if your site has SSL

## Step 3: Start Development Server

```bash
npm run dev
```

Watch for any error messages in the terminal.

**Expected Output:**
```
  ▲ Next.js 15.4.3
  - Local:        http://localhost:3000
  - Environments: .env.local

 ✓ Ready in 2.3s
```

## Step 4: Test Blog Listing Page

### Open in Browser

Navigate to: `http://localhost:3000/blog`

### What to Check

✅ **Page loads without errors**
- No blank screen
- No error messages
- Background gradient visible

✅ **Posts Display**
- Featured post shows at top
- Post grid shows remaining posts
- Post titles are visible
- Excerpts are visible

✅ **Images Load**
- Featured images display (not placeholders)
- Images are properly sized
- No broken image icons

✅ **Category Filter**
- Category buttons appear
- "All" button is highlighted
- Clicking categories filters posts

✅ **Responsive Design**
- Looks good on desktop
- Works on mobile (open DevTools → responsive mode)

### Common Issues

**No posts showing:**
```
Check browser console (F12) for errors
Verify .env.local has correct URL
Ensure WordPress posts are published (not drafts)
```

**Images not loading:**
```
Check WordPress featured images are set
Verify image URLs in console network tab
Ensure WordPress media library is accessible
```

**Categories not working:**
```
Check WordPress posts have categories assigned
Verify category names in WordPress match displayed names
```

## Step 5: Test Individual Post Page

### Click on a Post

Click any post title or "Read More" link.

### What to Check

✅ **Post Content**
- Full post title displays
- Post content renders correctly
- HTML formatting preserved
- Paragraphs and headings work

✅ **Metadata**
- Author name shows
- Date displays correctly
- Category badge appears
- Read time calculated

✅ **Featured Image**
- Displays if set in WordPress
- Proper aspect ratio
- No distortion

✅ **Tags**
- Tags appear below content (if set)
- Properly formatted

✅ **Navigation**
- "Back to Blog" button works
- Returns to blog listing

### Common Issues

**Content not formatting correctly:**
```
Check WordPress editor (use Classic or Block editor)
Verify HTML is valid in WordPress
Check browser console for errors
```

**404 errors:**
```
Verify post slug in URL matches WordPress
Check post is published
Restart dev server
```

## Step 6: Test Category Filtering

### On Blog Listing Page

1. Click different category buttons
2. Verify posts update
3. Check "All" shows all posts
4. Confirm each category shows correct posts

### What to Check

✅ Category button highlights when selected
✅ Only posts in that category display
✅ "All" button shows all posts
✅ Smooth transitions between categories

## Step 7: Test Sharing Functionality

### On Individual Post Page

1. Find the Share buttons (top of post)
2. Click the share icon
3. On mobile, native share sheet should appear
4. On desktop, check browser console (functionality may vary)

## Step 8: Test Build Process

### Create Production Build

```bash
npm run build
```

### What to Check

✅ Build completes without errors
✅ All blog routes are generated
✅ No warnings about missing data

**Expected Output:**
```
Route (app)                              Size     First Load JS
┌ ○ /blog                               142 B          XX kB
├ ○ /blog/[slug]                        142 B          XX kB
└ ○ /                                   142 B          XX kB

○  (Static) prerendered as static content
```

### Common Issues

**Build fails:**
```
Check WordPress is accessible from build machine
Verify GraphQL endpoint returns valid data
Review error message carefully
```

**Routes not generated:**
```
Ensure posts exist in WordPress
Check generateStaticParams function
Verify GraphQL queries return data
```

## Step 9: Test Production Server

### Start Production Server

```bash
npm run start
```

### Test Same as Development

Repeat Steps 4-6 on `http://localhost:3000`

## Step 10: Test Revalidation (ISR)

### How to Test

1. Start production server (`npm run start`)
2. View a blog post
3. Edit that post in WordPress
4. Wait for revalidation period (default: 1 hour)
5. Refresh page in browser

**For Faster Testing:**

Edit `src/app/blog/page.tsx`:
```typescript
export const revalidate = 60 // 1 minute instead of 1 hour
```

Then:
1. Rebuild (`npm run build`)
2. Start (`npm run start`)
3. Edit post in WordPress
4. Wait 1 minute
5. Refresh - changes should appear

## Testing Checklist

### WordPress Setup
- [ ] WPGraphQL plugin installed
- [ ] Posts published (not drafts)
- [ ] Featured images set
- [ ] Categories assigned
- [ ] Tags added
- [ ] GraphQL endpoint accessible

### Next.js Configuration
- [ ] Dependencies installed (`npm install`)
- [ ] `.env.local` created
- [ ] Correct GraphQL endpoint URL
- [ ] No typos in environment variable

### Development Testing
- [ ] Dev server starts without errors
- [ ] Blog listing page loads
- [ ] Posts display correctly
- [ ] Images load
- [ ] Categories filter works
- [ ] Individual posts open
- [ ] Content renders properly
- [ ] Navigation works
- [ ] Mobile responsive

### Production Testing
- [ ] Build completes successfully
- [ ] All routes generated
- [ ] Production server starts
- [ ] All features work in production
- [ ] Revalidation works (ISR)

## Debugging Tips

### Enable Verbose Logging

Add to `src/lib/wordpress.ts`:

```typescript
const client = new GraphQLClient(endpoint, {
  headers: {
    'Content-Type': 'application/json',
  },
  // Add this for debugging:
  requestMiddleware: (request) => {
    console.log('GraphQL Request:', request)
    return request
  },
  responseMiddleware: (response) => {
    console.log('GraphQL Response:', response)
  }
})
```

### Check Network Requests

1. Open browser DevTools (F12)
2. Go to Network tab
3. Reload page
4. Look for requests to your WordPress GraphQL endpoint
5. Click request to see details
6. Check response data

### Test GraphQL Queries Directly

Use this Node.js script to test queries:

```javascript
// test-graphql.js
const { GraphQLClient } = require('graphql-request')

const endpoint = 'https://your-site.com/graphql'
const client = new GraphQLClient(endpoint)

const query = `
  query {
    posts(first: 5) {
      nodes {
        title
        slug
      }
    }
  }
`

client.request(query)
  .then(data => console.log(JSON.stringify(data, null, 2)))
  .catch(error => console.error('Error:', error))
```

Run: `node test-graphql.js`

## Performance Testing

### Check Load Times

1. Open DevTools → Lighthouse
2. Run audit on blog pages
3. Check performance scores
4. Review recommendations

### Image Optimization

1. Check image sizes in Network tab
2. Verify Next.js Image optimization working
3. Confirm WebP format used when supported

## Security Testing

### Check for Exposed Data

1. Review API responses for sensitive data
2. Ensure no credentials in code
3. Verify environment variables not exposed
4. Check CORS configuration

## Success Criteria

Your blog is working correctly if:

✅ GraphQL endpoint responds
✅ Blog listing shows WordPress posts
✅ Individual posts display correctly
✅ Images load from WordPress
✅ Categories and tags work
✅ Build process succeeds
✅ Production build works
✅ No errors in console
✅ Responsive on mobile
✅ Revalidation updates content

## Getting Help

If tests fail:

1. **Check Console Errors**: Browser DevTools → Console
2. **Review Terminal Output**: Look for error messages
3. **Test GraphQL Directly**: Use GraphiQL interface
4. **Verify WordPress**: Check posts are published
5. **Review Documentation**: See WORDPRESS_BLOG_SETUP.md
6. **Check Environment**: Verify .env.local is correct

## Next Steps After Successful Testing

1. **Customize Design**: Adjust colors, layouts
2. **Add Features**: Comments, search, pagination
3. **Optimize Performance**: Caching, image sizes
4. **Setup Analytics**: Track blog traffic
5. **Configure SEO**: Meta tags, sitemaps
6. **Deploy to Production**: Vercel, Netlify, etc.

## Automated Testing (Optional)

Create test file `__tests__/blog.test.tsx`:

```typescript
import { getAllPosts } from '@/lib/wordpress'

describe('Blog Integration', () => {
  it('should fetch posts from WordPress', async () => {
    const posts = await getAllPosts()
    expect(posts).toBeDefined()
    expect(posts.length).toBeGreaterThan(0)
  })
})
```

Run: `npm test` (requires Jest setup)

---

**Need Help?** 
- Check WORDPRESS_BLOG_SETUP.md for detailed setup
- Review GRAPHQL_QUERIES.md for query examples
- See IMPLEMENTATION_SUMMARY.md for architecture details
