# Netlify Setup Checklist - Image Issues

## Current Status: Images Not Showing on Live Site

### Step 1: Verify Environment Variables in Netlify ⚠️

1. Go to https://app.netlify.com
2. Select your site
3. Go to **Site settings** → **Environment variables**
4. Verify these variables exist with correct values:

```bash
INSTAGRAM_ACCESS_TOKEN=IGAAWBt9YAOf9BZAGFpQ0R4WTJRRjBUdlQ0VUN5TU5jdmYyWTdzVmxZAdUlsR0dOb0JOZAU55V2tQRm1YOGp6cjhOaFp2eDBVNzRzVTU3Ujc3WHJxbm80b2V3UnlIX0wxV1hnUURCQThGS2s0SVdad3pCNFhHYXVrWC1kVmpFQWZAMVQZDZD
INSTAGRAM_USER_ID=17841459769571582
NEXT_PUBLIC_WORDPRESS_GRAPHQL_ENDPOINT=https://handheartecobodyart.com/graphql
NEXT_PUBLIC_WORDPRESS_URL=https://handheartecobodyart.com
```

**IMPORTANT**: Use `https://` (not `http://`) for live site WordPress URLs!

### Step 2: Check Instagram Token Validity

Your token might be expired. Test it:

```bash
curl "https://graph.instagram.com/17841459769571582/media?fields=id,media_type,media_url&access_token=YOUR_TOKEN&limit=1"
```

If you get an error about expired token:
- Tokens expire every 60 days
- Follow [REFRESH_INSTAGRAM_TOKEN.md](REFRESH_INSTAGRAM_TOKEN.md) to get a new one

### Step 3: Verify Netlify Build Settings

In Netlify **Site settings** → **Build & deploy**:
- Build command: `npm run build`
- Publish directory: `.next`
- Node version: 18.x or higher

### Step 4: Clear Netlify Cache and Redeploy

Sometimes old cached builds cause issues:

1. Go to **Deploys** tab
2. Click **Trigger deploy** → **Clear cache and deploy site**

### Step 5: Check Deploy Logs

After deploying, check the logs for errors:

1. Go to **Deploys** tab
2. Click on the latest deploy
3. Look for errors related to:
   - Environment variables
   - Image optimization
   - Build failures

### Step 6: Test the Live API Endpoint

Once deployed, test your API:
```bash
curl https://handheartecobodyart.com/api/instagram-posts
```

Should return JSON with Instagram posts and image URLs.

### Step 7: Check Browser Console

Visit your live site and:
1. Open Developer Tools (F12)
2. Go to **Console** tab
3. Look for errors like:
   - "Failed to load resource"
   - CORS errors
   - "Invalid src prop"
4. Go to **Network** tab
5. Filter by "Img"
6. Check which images are failing (red status codes)

### Common Issues & Solutions

#### Issue: "Failed to fetch Instagram posts" error on gallery
**Solution**: Environment variables not set or Instagram token expired

#### Issue: Logo shows but Instagram images don't
**Solution**: Instagram token expired or CDN domains blocked

#### Issue: No images show at all (including logo)
**Solution**: Build failed or public folder not deployed properly

#### Issue: Images work after refresh but not on first load
**Solution**: Add `priority` prop to critical images or use `unoptimized={true}`

### Debugging Command

Add this to your Instagram API route temporarily to debug on live site:

```typescript
console.log('Environment check:', {
  hasToken: !!process.env.INSTAGRAM_ACCESS_TOKEN,
  hasUserId: !!process.env.INSTAGRAM_USER_ID,
  nodeEnv: process.env.NODE_ENV
})
```

Then check Netlify **Functions** logs.

### Quick Test URLs

After deployment, test these:
- https://handheartecobodyart.com/ (homepage with logo)
- https://handheartecobodyart.com/gallery (Instagram images)
- https://handheartecobodyart.com/api/instagram-posts (API endpoint)

---

## Next Steps

1. [ ] Verify all environment variables in Netlify
2. [ ] Ensure WordPress URLs use `https://` not `http://`
3. [ ] Clear cache and redeploy
4. [ ] Test live API endpoint
5. [ ] Check browser console for specific errors
6. [ ] If still issues, share console errors
