# Migrating Local by Flywheel WordPress to Live Server

Complete guide for moving your `handheartecobodyart.local` WordPress site to production.

## Prerequisites

- Live hosting account with cPanel or similar
- Domain name configured and pointing to your server
- SSH/FTP access to your server
- Database access (phpMyAdmin or MySQL)

## Method 1: Using All-in-One WP Migration Plugin (Easiest)

### Step 1: Install Plugin on Local Site

1. Open your Local site: http://handheartecobodyart.local/wp-admin
2. Go to **Plugins → Add New**
3. Search for "All-in-One WP Migration"
4. Install and activate the plugin

### Step 2: Export Your Site

1. Go to **All-in-One WP Migration → Export**
2. Choose **Export to → File**
3. Wait for the export to complete
4. Download the `.wpress` file (save it somewhere safe)

### Step 3: Prepare Live Server

1. Install WordPress on your live server (most hosts have 1-click installers)
2. Access your live site's WordPress admin
3. Install "All-in-One WP Migration" plugin
4. Activate the plugin

### Step 4: Import to Live Site

1. Go to **All-in-One WP Migration → Import**
2. Click **Import From → File**
3. Upload your `.wpress` file
4. Wait for import to complete
5. Click **Proceed** and **Finish**
6. Log in with your local site credentials

### Step 5: Update URLs

The plugin should handle URLs automatically, but verify:
- Check **Settings → General** - ensure URLs are correct
- Clear cache if using caching plugins

---

## Method 2: Manual Migration (More Control)

### Step 1: Export Database from Local

```bash
# Navigate to your Local site directory
cd ~/Local\ Sites/handheartecobodyart/app/public

# Export database (find credentials in Local app)
/Applications/Local.app/Contents/Resources/extraResources/mysql/bin/mysqldump \
  -u root -proot local > ~/Desktop/handheartecobodyart.sql
```

Or use **Adminer** in Local by Flywheel:
1. Right-click site in Local → Open Site Shell
2. Run: `wp db export ~/Desktop/handheartecobodyart.sql`

### Step 2: Prepare Database File

Edit the exported SQL file to replace local URLs:

```bash
# Use search and replace (on the SQL file)
# Replace: http://handheartecobodyart.local
# With: https://yourdomain.com
```

**Better option:** Use WP-CLI or plugin after upload to avoid serialized data issues.

### Step 3: Upload Files to Live Server

**Via FTP/SFTP:**
```bash
# Compress WordPress files first
cd ~/Local\ Sites/handheartecobodyart/app/public
zip -r wordpress.zip . -x "wp-config.php"

# Upload wordpress.zip via FTP to your server's public_html
# Then extract on server
```

**Via SSH (if available):**
```bash
# On your local machine
rsync -avz --exclude 'wp-config.php' \
  ~/Local\ Sites/handheartecobodyart/app/public/ \
  username@yourserver.com:/path/to/public_html/
```

### Step 4: Create Database on Live Server

1. Log into cPanel
2. Go to **MySQL Databases**
3. Create new database (e.g., `hearthand_wp`)
4. Create database user with strong password
5. Assign user to database with ALL PRIVILEGES

### Step 5: Import Database

**Via phpMyAdmin:**
1. Open phpMyAdmin in cPanel
2. Select your new database
3. Click **Import** tab
4. Upload your SQL file
5. Click **Go**

**Via SSH (faster for large databases):**
```bash
mysql -u your_db_user -p your_db_name < handheartecobodyart.sql
```

### Step 6: Configure wp-config.php

Create/edit `wp-config.php` on your live server:

```php
<?php
/** Database Settings */
define( 'DB_NAME', 'hearthand_wp' );
define( 'DB_USER', 'your_db_user' );
define( 'DB_PASSWORD', 'your_db_password' );
define( 'DB_HOST', 'localhost' ); // Usually localhost
define( 'DB_CHARSET', 'utf8mb4' );
define( 'DB_COLLATE', '' );

/** Authentication Unique Keys and Salts */
// Generate new ones at: https://api.wordpress.org/secret-key/1.1/salt/
define('AUTH_KEY',         'put your unique phrase here');
define('SECURE_AUTH_KEY',  'put your unique phrase here');
define('LOGGED_IN_KEY',    'put your unique phrase here');
define('NONCE_KEY',        'put your unique phrase here');
define('AUTH_SALT',        'put your unique phrase here');
define('SECURE_AUTH_SALT', 'put your unique phrase here');
define('LOGGED_IN_SALT',   'put your unique phrase here');
define('NONCE_SALT',       'put your unique phrase here');

/** JWT Authentication (for your Next.js login) */
define('JWT_AUTH_SECRET_KEY', 'your-super-secret-key-here');
define('JWT_AUTH_CORS_ENABLE', true);

/** WordPress Database Table prefix */
$table_prefix = 'wp_';

/** Debugging (disable for production) */
define( 'WP_DEBUG', false );

/** Absolute path to the WordPress directory */
if ( ! defined( 'ABSPATH' ) ) {
    define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files */
require_once ABSPATH . 'wp-settings.php';
```

### Step 7: Update URLs in Database

**Option A: Using WP-CLI (if available):**
```bash
wp search-replace 'http://handheartecobodyart.local' 'https://yourdomain.com' --all-tables
```

**Option B: Using Better Search Replace Plugin:**
1. Install "Better Search Replace" plugin on live site
2. Go to **Tools → Better Search Replace**
3. Search for: `http://handheartecobodyart.local`
4. Replace with: `https://yourdomain.com`
5. Select all tables
6. Check "Run as dry run" first to test
7. Uncheck dry run and run for real

**Option C: SQL Commands:**
```sql
UPDATE wp_options SET option_value = REPLACE(option_value, 'http://handheartecobodyart.local', 'https://yourdomain.com');
UPDATE wp_posts SET post_content = REPLACE(post_content, 'http://handheartecobodyart.local', 'https://yourdomain.com');
UPDATE wp_posts SET guid = REPLACE(guid, 'http://handheartecobodyart.local', 'https://yourdomain.com');
UPDATE wp_postmeta SET meta_value = REPLACE(meta_value, 'http://handheartecobodyart.local', 'https://yourdomain.com');
```

### Step 8: Set Correct File Permissions

```bash
# For directories
find /path/to/public_html -type d -exec chmod 755 {} \;

# For files
find /path/to/public_html -type f -exec chmod 644 {} \;

# Special for wp-config.php
chmod 600 wp-config.php
```

### Step 9: Update .htaccess

Ensure your `.htaccess` includes JWT support:

```apache
# BEGIN WordPress
<IfModule mod_rewrite.c>
RewriteEngine On
RewriteBase /
RewriteRule ^index\.php$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.php [L]

# JWT Authentication
RewriteCond %{HTTP:Authorization} ^(.*)
RewriteRule ^(.*) - [E=HTTP_AUTHORIZATION:%1]
</IfModule>

# Enable CORS for Next.js
<IfModule mod_headers.c>
SetEnvIf Origin "^https?://(yourdomain\.com|www\.yourdomain\.com)$" AccessControlAllowOrigin=$0
Header add Access-Control-Allow-Origin %{AccessControlAllowOrigin}e env=AccessControlAllowOrigin
Header merge Vary Origin
</IfModule>
# END WordPress
```

---

## Post-Migration Checklist

### Verify WordPress Site

- [ ] Can you access the live site?
- [ ] Can you log into wp-admin?
- [ ] Are all plugins activated?
- [ ] Are images displaying correctly?
- [ ] Are custom post types (Events) working?
- [ ] Is WPGraphQL endpoint accessible?
- [ ] Test JWT authentication endpoint

### Test JWT Authentication

```bash
curl -X POST https://yourdomain.com/wp-json/jwt-auth/v1/token \
  -H "Content-Type: application/json" \
  -d '{"username":"your-username","password":"your-password"}'
```

### Test GraphQL Endpoint

```bash
curl -X POST https://yourdomain.com/graphql \
  -H "Content-Type: application/json" \
  -d '{"query": "{ generalSettings { title url } }"}'
```

### Update Next.js Configuration

Update your Next.js `.env.local` (and `.env.production`):

```env
NEXT_PUBLIC_WORDPRESS_URL=https://yourdomain.com
NEXT_PUBLIC_WORDPRESS_GRAPHQL_ENDPOINT=https://yourdomain.com/graphql
```

### Update DNS (if needed)

If using a subdomain for WordPress:
1. Create A record pointing `wp.yourdomain.com` to your server IP
2. Update Next.js environment variables accordingly

### Enable SSL Certificate

1. In cPanel, go to **SSL/TLS Status**
2. Click **Run AutoSSL**
3. Or install Let's Encrypt certificate
4. Force HTTPS redirects in .htaccess:

```apache
# Force HTTPS
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

---

## Method 3: Using Local's Built-in Tools (New)

Local by Flywheel has a "Live Link" feature:

1. Right-click your site in Local
2. Select **Share**
3. This creates a temporary public URL for testing
4. **Note:** This is temporary and not for production

---

## Troubleshooting Common Issues

### White Screen of Death

```bash
# Enable debugging temporarily
define( 'WP_DEBUG', true );
define( 'WP_DEBUG_LOG', true );
define( 'WP_DEBUG_DISPLAY', false );
```

Check `/wp-content/debug.log` for errors.

### Database Connection Error

- Verify database credentials in `wp-config.php`
- Check if database user has proper permissions
- Confirm database exists

### Mixed Content Errors

Run search-replace again ensuring all `http://` are changed to `https://`

### Permalinks Not Working

1. Log into WordPress admin
2. Go to **Settings → Permalinks**
3. Click **Save Changes** (without changing anything)
4. This regenerates `.htaccess` rules

### Images/Media Not Loading

- Check file permissions (should be 644 for files, 755 for directories)
- Verify wp-content/uploads directory exists and is writable
- Run search-replace to update media URLs

### JWT Authentication Not Working

- Verify JWT_AUTH_SECRET_KEY is in wp-config.php
- Check .htaccess includes Authorization header rules
- Test endpoint with curl command above
- Check PHP error logs

---

## Performance Optimization (Post-Launch)

### Install Caching Plugin

- **WP Super Cache** or **W3 Total Cache**
- Configure with default settings

### CDN Setup (Optional)

- Cloudflare (free tier available)
- Improves speed and security

### Database Optimization

```bash
wp db optimize
```

---

## Backup Strategy

### Before Migration

Always backup your Local site:
1. Right-click site in Local
2. Go to site folder
3. Copy entire directory somewhere safe

### After Migration

Set up automated backups:
- **UpdraftPlus** plugin
- cPanel backup tools
- Database exports via cron

---

## Security Hardening

1. **Change Database Prefix** (if still wp_)
2. **Disable File Editing:**
   ```php
   define( 'DISALLOW_FILE_EDIT', true );
   ```
3. **Limit Login Attempts** - Install "Limit Login Attempts Reloaded"
4. **Install Security Plugin** - Wordfence or Sucuri
5. **Keep Everything Updated**
6. **Strong Passwords** - For all users
7. **Two-Factor Authentication** - Use 2FA plugin

---

## Final Steps

1. Test your Next.js login at your production URL
2. Update any hardcoded URLs in your Next.js code
3. Deploy Next.js with updated environment variables
4. Monitor error logs for first 24 hours
5. Set up uptime monitoring (UptimeRobot, Pingdom, etc.)

---

## Support Resources

- **WordPress Migration:** https://wordpress.org/support/article/moving-wordpress/
- **Local by Flywheel Docs:** https://localwp.com/help-docs/
- **WP-CLI:** https://wp-cli.org/
- **Your hosting provider's migration guides**

---

## Need Help?

If you encounter issues:
1. Check error logs (PHP and WordPress)
2. Google the specific error message
3. WordPress.org support forums
4. Your hosting provider's support
5. Consider hiring a WordPress migration specialist
