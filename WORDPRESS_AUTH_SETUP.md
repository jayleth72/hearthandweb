# WordPress Authentication Setup Guide

This guide will help you set up WordPress JWT authentication for your Heart & Hand website.

## Prerequisites

- WordPress site running (currently at: http://handheartecobodyart.local)
- WPGraphQL plugin installed
- Admin access to WordPress

## Step 1: Install JWT Authentication Plugin

### Option A: Install from WordPress Plugin Directory

1. Log into your WordPress admin panel
2. Go to **Plugins → Add New**
3. Search for "JWT Authentication for WP REST API"
4. Install and activate the plugin by **Useful Team**

### Option B: Manual Installation

Download the plugin from:
https://wordpress.org/plugins/jwt-authentication-for-wp-rest-api/

## Step 2: Configure WordPress

Add these lines to your `wp-config.php` file (before the "That's all, stop editing!" line):

```php
// JWT Authentication Configuration
define('JWT_AUTH_SECRET_KEY', 'your-super-secret-key-here-change-this');
define('JWT_AUTH_CORS_ENABLE', true);
```

**Important:** Replace `'your-super-secret-key-here-change-this'` with a secure random string. You can generate one at: https://api.wordpress.org/secret-key/1.1/salt/

## Step 3: Configure .htaccess (Apache) or nginx

### For Apache (.htaccess)

Add this to your WordPress `.htaccess` file:

```apache
# JWT Authentication
RewriteEngine On
RewriteCond %{HTTP:Authorization} ^(.*)
RewriteRule ^(.*) - [E=HTTP_AUTHORIZATION:%1]

# Enable CORS
SetEnvIf Origin "http(s)?://(localhost:3000|your-nextjs-domain.com)$" AccessControlAllowOrigin=$0
Header add Access-Control-Allow-Origin %{AccessControlAllowOrigin}e env=AccessControlAllowOrigin
Header merge Vary Origin
```

### For nginx

**Important:** The proper way to handle JWT authentication in nginx is to pass the Authorization header to PHP-FPM, not use `if` statements which can cause 502 errors.

Add this to your PHP location block in your nginx server configuration:

```nginx
location ~ \.php$ {
    fastcgi_pass unix:/var/run/php/php8.1-fpm.sock;  # Adjust PHP version/socket as needed
    fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
    include fastcgi_params;
    
    # Pass Authorization header to PHP
    fastcgi_param HTTP_AUTHORIZATION $http_authorization;
}
```

If you don't have a PHP location block yet, your complete nginx server block should look like this:

```nginx
server {
    listen 80;
    server_name handheartecobodyart.local;
    root /path/to/wordpress;
    index index.php index.html;

    location / {
        try_files $uri $uri/ /index.php?$args;
    }

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.1-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        include fastcgi_params;
        fastcgi_param HTTP_AUTHORIZATION $http_authorization;
    }
}
```

**Remove any `if` statements** from your configuration as they cause 502 errors with nginx.

## Step 4: Test JWT Authentication

Test your JWT setup with this curl command:

```bash
curl -X POST http://handheartecobodyart.local/wp-json/jwt-auth/v1/token \
  -H "Content-Type: application/json" \
  -d '{"username":"your-username","password":"your-password"}'
```

You should receive a response like:

```json
{
  "token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "user_email": "user@example.com",
  "user_nicename": "username",
  "user_display_name": "Display Name",
  "user_id": 1
}
```

## Step 5: Update Environment Variables

The `.env.local` file has been updated with:

```env
NEXT_PUBLIC_WORDPRESS_URL=http://handheartecobodyart.local
```

**For production**, update this to your live WordPress URL:

```env
NEXT_PUBLIC_WORDPRESS_URL=https://your-wordpress-site.com
```

## Step 6: Create WordPress Users

Create user accounts in WordPress (Users → Add New) for anyone who needs access to protected areas of your Next.js site.

## Usage

### Access the Login Page

Navigate to: http://localhost:3000/login

### Protected Routes

The following routes are now protected and require authentication:
- `/dashboard` - Main dashboard for authenticated users
- `/admin/*` - Any admin routes
- `/members/*` - Member-only content

### Adding More Protected Routes

Edit `src/middleware.ts` and add routes to the `matcher` array:

```typescript
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/admin/:path*',
    '/members/:path*',
    '/your-new-route/:path*', // Add your route here
  ],
};
```

## Using Authentication in Components

### Check if User is Logged In

```typescript
'use client';

import { useAuth } from '@/components/WordPressAuthProvider';

export default function MyComponent() {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;

  if (!isAuthenticated) {
    return <div>Please log in</div>;
  }

  return <div>Welcome, {user?.displayName}!</div>;
}
```

### Logout Button

```typescript
'use client';

import { useAuth } from '@/components/WordPressAuthProvider';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
}
```

## Files Created

1. **API Routes:**
   - `src/app/api/auth/wordpress-login/route.ts` - Login endpoint
   - `src/app/api/auth/wordpress-validate/route.ts` - Token validation
   - `src/app/api/auth/wordpress-logout/route.ts` - Logout endpoint

2. **Components:**
   - `src/components/WordPressAuthProvider.tsx` - Auth context provider

3. **Pages:**
   - `src/app/login/page.tsx` - Login page
   - `src/app/dashboard/page.tsx` - Protected dashboard

4. **Middleware:**
   - `src/middleware.ts` - Route protection

## Troubleshooting

### "Invalid token" errors

1. Check that JWT_AUTH_SECRET_KEY is set in wp-config.php
2. Verify .htaccess or nginx configuration
3. Clear browser cookies and try again

### CORS errors

1. Ensure JWT_AUTH_CORS_ENABLE is true in wp-config.php
2. Check that your Next.js URL is allowed in server configuration
3. Verify headers are being sent correctly

### Login redirects not working

1. Check that middleware.ts is in the correct location (src/middleware.ts)
2. Verify the matcher patterns include your protected routes
3. Ensure cookies are being set correctly (check browser dev tools)

## Security Notes

1. Always use HTTPS in production
2. Keep JWT_AUTH_SECRET_KEY secret and unique
3. Set secure cookie flags in production
4. Regularly update WordPress and plugins
5. Use strong passwords for WordPress users
6. Consider implementing rate limiting for login attempts

## Next Steps

1. Install the JWT Authentication plugin on WordPress
2. Configure wp-config.php with secret key
3. Test the login at http://localhost:3000/login
4. Create additional protected pages as needed
5. Customize the dashboard for your business needs

## Support

For issues with:
- JWT plugin: https://wordpress.org/support/plugin/jwt-authentication-for-wp-rest-api/
- WPGraphQL: https://www.wpgraphql.com/docs/intro
- Next.js: https://nextjs.org/docs
