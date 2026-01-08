# Instagram API Integration Setup

This document explains how to connect your website to Instagram's API to display real Instagram posts in your gallery.

## Current Status
- ✅ Gallery page created with Instagram API integration
- ✅ API route configured for Instagram Basic Display API
- ✅ Fallback to demo content when API is not configured
- ⏳ Instagram API credentials need to be set up

## Instagram Basic Display API Setup

### Step 1: Create Facebook App
1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Click "My Apps" → "Create App"
3. Choose "Consumer" as app type
4. Fill in app details

### Step 2: Add Instagram Basic Display Product
1. In your Facebook app dashboard
2. Go to "Products" → "Instagram Basic Display"
3. Click "Set Up"

### Step 3: Create Instagram Test User
1. Go to Instagram Basic Display → Basic Display
2. Click "Create New App"
3. Add Instagram Tester → Enter your Instagram username
4. Accept the invite in your Instagram app

### Step 4: Generate Access Token
1. In Basic Display settings
2. Generate token for your test user
3. Copy the access token (keep it secure!)

### Step 5: Get Your Instagram User ID
1. Use the access token to call: `https://graph.instagram.com/me?fields=id&access_token=YOUR_ACCESS_TOKEN`
2. Copy the user ID from the response

### Step 6: Configure Environment Variables
Create a `.env.local` file in your project root:

```bash
# Instagram API Configuration
INSTAGRAM_ACCESS_TOKEN=your_long_lived_access_token_here
INSTAGRAM_USER_ID=your_instagram_user_id_here
```

## Features

### What Works Now
- ✅ Gallery page loads with demo content
- ✅ Responsive grid layout for Instagram posts
- ✅ Click-through to actual Instagram posts
- ✅ Loading states and error handling
- ✅ Fallback to demo content when API unavailable

### What Will Work With API Setup
- 🔄 Real Instagram posts from @handhearthenna
- 🔄 Automatic updates (cached for 1 hour)
- 🔄 Post captions and timestamps
- 🔄 Direct links to Instagram posts

## API Endpoint
- **URL**: `/api/instagram-posts`
- **Method**: GET
- **Response**: JSON with posts array
- **Caching**: 1 hour cache for performance

## Demo Mode
When Instagram API is not configured, the gallery shows:
- Sample post data with realistic captions
- Placeholder images (you can replace with actual photos)
- All links point to your Instagram profile
- Demo notice displayed to indicate sample content

## Next Steps
1. Follow Instagram API setup steps above
2. Add your access token and user ID to `.env.local`
3. Test the integration
4. Replace placeholder images with actual work photos (optional)

## Security Notes
- Never commit `.env.local` to version control
- Access tokens should be kept secure
- Consider setting up token refresh for production use
- Instagram API has rate limits - the current setup respects these

## Troubleshooting
- Check browser console for API errors
- Verify environment variables are set correctly
- Ensure Instagram account is connected to Facebook app
- Test API endpoint directly: `/api/instagram-posts`
