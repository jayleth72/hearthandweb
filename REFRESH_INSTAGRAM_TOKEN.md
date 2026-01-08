# How to Refresh Your Instagram Access Token

## Why Your Token Expired

Instagram access tokens come in two types:
- **Short-lived tokens**: Expire in 1 hour
- **Long-lived tokens**: Expire in 60 days

Your current token has expired (Error 190: "Failed to decode"), which is why your local environment isn't fetching posts.

## Method 1: Generate a New Long-Lived Token (Easiest)

### Step 1: Get a New Short-Lived Token
1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Navigate to your app → Instagram Basic Display
3. Go to "User Token Generator"
4. Click "Generate Token" next to your Instagram account
5. Copy the short-lived token

### Step 2: Convert to Long-Lived Token
Use this URL in your browser (replace `YOUR_SHORT_TOKEN` with the token from Step 1):

```
https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=YOUR_APP_SECRET&access_token=YOUR_SHORT_TOKEN
```

**To find your App Secret:**
- Go to Settings → Basic in your Facebook App
- Copy the "App Secret" (you may need to click "Show")

**Response will look like:**
```json
{
  "access_token": "NEW_LONG_LIVED_TOKEN",
  "token_type": "bearer",
  "expires_in": 5183944  // ~60 days in seconds
}
```

### Step 3: Update Your Environment Variables

**For Local Development:**
Update `.env.local`:
```bash
INSTAGRAM_ACCESS_TOKEN=NEW_LONG_LIVED_TOKEN_HERE
```

**For Production (Vercel):**
1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Update `INSTAGRAM_ACCESS_TOKEN` with the new token
5. Redeploy your site

## Method 2: Refresh Your Existing Long-Lived Token

If your token hasn't expired yet (but will soon), you can refresh it:

```
https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=YOUR_CURRENT_TOKEN
```

**Response:**
```json
{
  "access_token": "REFRESHED_TOKEN",
  "token_type": "bearer",
  "expires_in": 5183944
}
```

## Method 3: Quick Test with Graph API Explorer

1. Go to [Graph API Explorer](https://developers.facebook.com/tools/explorer/)
2. Select your app
3. Select "Instagram Basic Display" from permissions
4. Click "Generate Access Token"
5. Use the Graph API Explorer to test: `me/media?fields=id,media_type,media_url`

## Automated Token Refresh (Recommended for Production)

To avoid tokens expiring, set up automatic refresh:

### Create a Refresh API Endpoint

Create `/api/refresh-instagram-token`:

```typescript
import { NextResponse } from 'next/server';

export async function GET() {
  const currentToken = process.env.INSTAGRAM_ACCESS_TOKEN;
  
  const url = `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${currentToken}`;
  
  const response = await fetch(url);
  const data = await response.json();
  
  return NextResponse.json(data);
}
```

### Set Up a Cron Job (Vercel)

Create `vercel.json`:

```json
{
  "crons": [{
    "path": "/api/refresh-instagram-token",
    "schedule": "0 0 1 * *"
  }]
}
```

This runs monthly to refresh your token automatically.

## Verification

After updating your token, test it:

### Test Locally:
```bash
npm run dev
curl http://localhost:3000/api/instagram-posts
```

### Test the Token Directly:
```bash
curl "https://graph.instagram.com/me/media?fields=id,caption,media_url&access_token=YOUR_NEW_TOKEN"
```

## Important Notes

1. **Tokens expire after 60 days** - set a calendar reminder to refresh
2. **Keep tokens secure** - never commit to git
3. **Sync local and production** - update both environments
4. **Test after updating** - verify posts are loading
5. **Token refresh** - can only be done once per day, and tokens can be refreshed before they expire

## Current Token Status

To check when your token expires:

```bash
curl "https://graph.instagram.com/access_token/debug?input_token=YOUR_TOKEN&access_token=YOUR_TOKEN"
```

Response shows:
- `expires_at`: Unix timestamp when token expires
- `is_valid`: true/false

## Troubleshooting

### Error 190: "Failed to decode"
- Token is expired or invalid
- Generate a new long-lived token

### Error 400: "Invalid OAuth access token"
- Token format is incorrect
- Check for extra spaces or line breaks in `.env.local`

### Posts loading in production but not locally
- Different tokens in local vs production
- Copy production token to local `.env.local`

### "User ID not found"
- Verify `INSTAGRAM_USER_ID` is set correctly
- Get it from: `https://graph.instagram.com/me?fields=id&access_token=YOUR_TOKEN`
