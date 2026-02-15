# WordPress Checklist Setup Guide

Checklist data is now stored in WordPress instead of MongoDB. This provides better integration, easier backup, and no need for external database services.

## Setup Steps

### 1. Install the WordPress Plugin

1. Copy the plugin file to your WordPress installation:
   ```bash
   cp wordpress-plugin/heart-hand-checklists.php /path/to/your/wordpress/wp-content/plugins/
   ```

2. Log in to WordPress admin (http://handheartecobodyart.local/wp-admin)

3. Go to **Plugins** → **Installed Plugins**

4. Find "Heart & Hand Event Checklists" and click **Activate**

### 2. Verify GraphQL Support

1. Make sure WPGraphQL plugin is active (already installed for blog/events)

2. Go to **GraphiQL IDE** in WordPress admin (should appear in sidebar)

3. Test the checklist query:
   ```graphql
   query {
     checklists {
       edges {
         node {
           id
           title
           checklistDetails {
             eventDate
             checklistItems {
               text
               completed
               category
             }
           }
         }
       }
     }
   }
   ```

### 3. Test Locally

1. Make sure your `.env.local` has the WordPress URL:
   ```env
   NEXT_PUBLIC_WORDPRESS_GRAPHQL_ENDPOINT=http://handheartecobodyart.local/graphql
   NEXT_PUBLIC_WORDPRESS_URL=http://handheartecobodyart.local
   ```

2. Start the dev server:
   ```bash
   npm run dev
   ```

3. Go to http://localhost:3000/login and log in

4. Go to http://localhost:3000/members

5. Try creating a new checklist

6. Verify it appears in WordPress admin under **Checklists**

### 4. Deploy to Production

1. Upload the plugin to your live WordPress site:
   - Via FTP: Upload to `/wp-content/plugins/`
   - Via WordPress admin: **Plugins** → **Add New** → **Upload Plugin**

2. Activate the plugin on the live site

3. Verify Netlify environment variables:
   - `NEXT_PUBLIC_WORDPRESS_GRAPHQL_ENDPOINT` = Your live WordPress GraphQL URL
   - `NEXT_PUBLIC_WORDPRESS_URL` = Your live WordPress URL

4. Deploy to Netlify (git push will auto-deploy)

5. Test checklist creation on the live site

## Features

### WordPress Admin

- **Checklists Menu**: View all event checklists in WordPress admin
- **Visual Editing**: Edit checklist items directly in WordPress
- **ACF Fields**: 
  - Event Date: Date picker
  - Checklist Items: Repeater field with text, completed status, and category
  - Last Modified: Auto-updated timestamp

### Data Structure

Each checklist is stored as a custom post type with:
- **Title**: Event name
- **Event Date**: ACF date field
- **Checklist Items**: ACF repeater with:
  - Text (required)
  - Completed (true/false)
  - Category (Planning, Supplies, Equipment, etc.)
- **Last Modified**: Auto-timestamp

### Benefits Over MongoDB

✅ **No external database needed** - Everything in WordPress
✅ **Easy backup** - Standard WordPress backups include checklists  
✅ **Visual editing** - Manage checklists in WordPress admin
✅ **No 502 errors** - No serverless function timeouts
✅ **Better integration** - Same system as blog and events
✅ **Simpler deployment** - No MongoDB environment variables needed

## What Changed

### Files Modified

1. **Created**: `wordpress-plugin/heart-hand-checklists.php`
   - Custom post type registration
   - ACF field definitions
   - GraphQL support

2. **Updated**: `src/types/wordpress.ts`
   - Added checklist TypeScript types

3. **Updated**: `src/lib/wordpress.ts`
   - Added GraphQL queries for checklists
   - Added functions: `getAllChecklists`, `createChecklist`, `updateChecklist`, `deleteChecklist`

4. **Updated**: `src/app/api/checklists/route.ts`
   - Switched from MongoDB to WordPress
   - Transforms WordPress data to match existing format

### Files No Longer Needed

- `src/lib/mongodb.ts` (can be deleted)
- `src/lib/checklistStorage.ts` (can be deleted)
- MongoDB environment variables (no longer needed)

### Members Page

- **No changes needed!** The Members page UI stays exactly the same
- Checklists now save to WordPress automatically
- All existing functionality preserved

## Troubleshooting

### Can't create checklists

1. Check WordPress plugin is activated
2. Verify WPGraphQL plugin is active
3. Check browser console for errors
4. Verify WordPress URL in environment variables

### Checklists not appearing

1. Go to WordPress admin → Checklists
2. Check if they're being created there
3. Verify GraphQL query works in GraphiQL IDE
4. Check Next.js server console for errors

### 404 errors

1. In WordPress admin, go to **Settings** → **Permalinks**
2. Click **Save Changes** (this flushes rewrite rules)
3. Try again

## Next Steps

1. Install and activate the plugin in WordPress
2. Test creating a checklist locally
3. Verify it appears in WordPress admin
4. Deploy to production when ready
5. Remove MongoDB dependencies (optional cleanup)
