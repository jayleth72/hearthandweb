# Image Troubleshooting Guide - Live Site

## Issues Preventing Images from Showing

### 1. **Next.js Image Configuration** ✅ FIXED
- Added Instagram CDN domains to `next.config.ts`
- You still need to add your LIVE WordPress domain

### 2. **Missing Environment Variables** ⚠️ ACTION REQUIRED

Your live deployment needs these environment variables:

```bash
# Instagram API (for gallery images)
INSTAGRAM_ACCESS_TOKEN=your_long_lived_token_here
INSTAGRAM_USER_ID=your_instagram_user_id_here

# WordPress GraphQL (if using WordPress images)
NEXT_PUBLIC_WORDPRESS_GRAPHQL_ENDPOINT=https://your-live-domain.com/graphql
NEXT_PUBLIC_WORDPRESS_URL=https://your-live-domain.com
```

**Where to set these:**
- **Vercel**: Project Settings → Environment Variables
- **Netlify**: Site Settings → Build & deploy → Environment
- **Other hosts**: Check your hosting provider's documentation

### 3. **Update next.config.ts with Your Live Domain**

In [next.config.ts](next.config.ts), line 19, replace:
```typescript
{
  protocol: 'https',
  hostname: '*.com', // Replace with your actual domain like 'yourdomain.com'
  port: '',
  pathname: '/wp-content/uploads/**',
},
```

With your actual WordPress domain:
```typescript
{
  protocol: 'https',
  hostname: 'handheartecobodyart.com', // or whatever your live domain is
  port: '',
  pathname: '/wp-content/uploads/**',
},
```

### 4. **Verify Instagram Token is Valid**

Test your Instagram token locally:
```bash
curl "https://graph.instagram.com/me/media?fields=id,media_type,media_url,thumbnail_url,caption,permalink,timestamp&access_token=YOUR_TOKEN_HERE&limit=1"
```

If you get an error:
- Token might be expired (they expire every 60 days)
- See [REFRESH_INSTAGRAM_TOKEN.md](REFRESH_INSTAGRAM_TOKEN.md) to refresh it

### 5. **Common Issues & Solutions**

#### Images work locally but not in production:
- ✅ Environment variables not set in production
- ✅ Image domains not whitelisted in next.config.ts
- ✅ Instagram token expired

#### Only logo shows, gallery doesn't:
- ✅ Instagram API credentials missing/invalid
- ✅ Instagram CDN domains not whitelisted
- Check browser console for specific errors

#### WordPress images don't show:
- ✅ WordPress domain not in next.config.ts
- ✅ CORS issues (check WordPress CORS settings)
- ✅ GraphQL endpoint not accessible publicly

## Quick Checklist

- [ ] Added Instagram CDN domains to next.config.ts (done)
- [ ] Added your live WordPress domain to next.config.ts
- [ ] Set INSTAGRAM_ACCESS_TOKEN in production environment
- [ ] Set INSTAGRAM_USER_ID in production environment
- [ ] Set NEXT_PUBLIC_WORDPRESS_GRAPHQL_ENDPOINT in production
- [ ] Set NEXT_PUBLIC_WORDPRESS_URL in production
- [ ] Verified Instagram token is valid and not expired
- [ ] Rebuilt and redeployed site after changes
- [ ] Cleared browser cache and tested

## Testing Steps

1. **Test Instagram API locally:**
   ```bash
   npm run dev
   # Open browser to http://localhost:3000/api/instagram-posts
   # Should see JSON with image URLs
   ```

2. **Check browser console on live site:**
   - Open DevTools (F12)
   - Go to Console tab
   - Look for errors related to images or CORS

3. **Check Network tab:**
   - Open DevTools → Network
   - Filter by "Img"
   - Look for failed image requests (red status codes)

## Need More Help?

1. Share your error messages from browser console
2. Tell me your hosting provider (Vercel, Netlify, etc.)
3. Confirm which images aren't working:
   - Logo on homepage?
   - Instagram gallery images?
   - WordPress blog images?
   - All images?
