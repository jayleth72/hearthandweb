# WordPress User Roles Plugin Installation

This plugin exposes user roles in the WordPress REST API, which is required for the Next.js frontend to properly authenticate administrators.

## Installation Steps

### Option 1: Upload via WordPress Admin (Recommended)

1. **Zip the plugin file:**
   ```bash
   cd wordpress-plugin
   zip heart-hand-user-roles.zip heart-hand-user-roles.php
   ```

2. **Upload to WordPress:**
   - Go to your WordPress admin panel: `http://handheartecobodyart.local/wp-admin`
   - Navigate to **Plugins → Add New → Upload Plugin**
   - Choose the `heart-hand-user-roles.zip` file
   - Click **Install Now**
   - Click **Activate Plugin**

### Option 2: Manual Installation via FTP/File Manager

1. Copy the `heart-hand-user-roles.php` file to your WordPress plugins directory:
   ```
   /wp-content/plugins/heart-hand-user-roles/heart-hand-user-roles.php
   ```

2. Go to WordPress admin → **Plugins**
3. Find "Heart & Hand User Roles API"
4. Click **Activate**

### Option 3: Local WordPress Development (Current Setup)

If you're using Local by Flywheel or similar:

1. Locate your WordPress installation directory for `handheartecobodyart.local`
2. Copy the file to:
   ```
   [WordPress Root]/wp-content/plugins/heart-hand-user-roles/heart-hand-user-roles.php
   ```
3. Activate in WordPress admin

## Verification

After activating the plugin:

1. **Test the API endpoint:**
   ```bash
   # Get a JWT token first by logging in
   TOKEN="your-jwt-token-here"
   
   # Then test the user endpoint
   curl -H "Authorization: Bearer $TOKEN" \
        http://handheartecobodyart.local/wp-json/wp/v2/users/me
   ```

2. **Check the response includes:**
   ```json
   {
     "id": 3,
     "name": "linda letheby",
     "roles": ["administrator"],
     "capabilities": { ... }
   }
   ```

3. **Test in your Next.js app:**
   - Clear your browser cookies
   - Visit: `http://localhost:3000/login`
   - Log in with your admin credentials
   - Check browser console for:
     - "Login successful, user data:" showing roles array
     - "isAdmin computed: true"
   - Visit: `http://localhost:3000/events/manage`
   - You should now see the "Add New Event" button
   - Delete buttons should be visible on event cards

## Troubleshooting

### Roles still undefined?

1. **Clear WordPress cache** (if using a caching plugin)
2. **Deactivate and reactivate** the plugin
3. **Check PHP error logs** in WordPress for any errors
4. **Verify JWT plugin is active** and working

### CORS errors?

The plugin includes CORS headers for development. If you get CORS errors:

1. Verify your Next.js dev server URL is in the `$allowed_origins` array in the plugin
2. For production, remove the CORS headers from the plugin and configure them in your web server (Nginx/Apache)

## What This Plugin Does

✅ Exposes `roles` array in `/wp-json/wp/v2/users/me` endpoint
✅ Exposes `capabilities` object for granular permissions
✅ Adds role information to JWT token response
✅ Adds CORS headers for local development
✅ Handles OPTIONS preflight requests

## Security Notes

- The plugin only exposes roles for authenticated users
- Roles are only visible to the logged-in user (via /users/me endpoint)
- CORS is configured for development domains only
- For production, properly configure CORS in your web server config
