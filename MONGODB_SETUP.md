# MongoDB Atlas Setup for Event Checklists

This guide walks you through setting up MongoDB Atlas (free tier) for both local development and Netlify production deployment.

## Step 1: Create MongoDB Atlas Account

1. Go to [https://www.mongodb.com/cloud/atlas/register](https://www.mongodb.com/cloud/atlas/register)
2. Sign up for a free account (no credit card required)
3. Verify your email address

## Step 2: Create a Free Cluster

1. After logging in, click **"Build a Database"**
2. Choose **"M0 Free"** tier (512MB storage)
3. Select a **cloud provider and region** closest to you (AWS, Google Cloud, or Azure)
4. Keep the default cluster name or change it (e.g., "Cluster0")
5. Click **"Create"**

Wait 1-3 minutes for the cluster to be created.

## Step 3: Create Database User

1. Click **"Database Access"** in the left sidebar
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication method
4. Enter a username (e.g., `hearthand-admin`)
5. Click **"Autogenerate Secure Password"** and **COPY IT** (save it somewhere safe)
6. Set privileges to **"Read and write to any database"**
7. Click **"Add User"**

## Step 4: Whitelist IP Addresses

1. Click **"Network Access"** in the left sidebar
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (0.0.0.0/0)
   - This is necessary for Netlify deployment
   - MongoDB Atlas has built-in security, so this is safe
4. Click **"Confirm"**

## Step 5: Get Connection String

1. Go back to **"Database"** in the left sidebar
2. Click **"Connect"** on your cluster
3. Choose **"Connect your application"**
4. Select **"Node.js"** as the driver
5. Copy the connection string (looks like: `mongodb+srv://username:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`)

## Step 6: Configure Local Development

1. In your project root, create `.env.local`:
   ```bash
   touch .env.local
   ```

2. Add your MongoDB connection string to `.env.local`:
   ```env
   MONGODB_URI=mongodb+srv://hearthand-admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/hearthand-dev?retryWrites=true&w=majority
   ```
   
   **Replace:**
   - `YOUR_PASSWORD` with the password you copied in Step 3
   - `cluster0.xxxxx` with your actual cluster address
   - `/hearthand-dev` is the database name (use this for local development)

3. Save the file

## Step 7: Test Locally

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Go to `http://localhost:3000/members`
3. Try creating a new checklist
4. Verify it saves and persists after page refresh

## Step 8: Configure Netlify Production

1. Log in to your Netlify dashboard
2. Go to your site's settings
3. Navigate to **"Site configuration"** → **"Environment variables"**
4. Click **"Add a variable"**
5. Add:
   - **Key:** `MONGODB_URI`
   - **Value:** `mongodb+srv://hearthand-admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/hearthand-prod?retryWrites=true&w=majority`
   
   **Note:** Use `/hearthand-prod` for production (different from local)

6. Click **"Save"**
7. Redeploy your site for changes to take effect

## Database Structure

MongoDB will automatically create the following:

- **Database:** `hearthand-dev` (local) or `hearthand-prod` (Netlify)
- **Collection:** `checklists`
- **Documents:** Each checklist with these fields:
  ```json
  {
    "_id": "ObjectId(auto-generated)",
    "eventName": "Birthday Party",
    "eventDate": "2026-01-15",
    "items": [
      {
        "id": "1",
        "text": "Contact client 1-2 weeks before event",
        "checked": false,
        "category": "Planning"
      }
    ],
    "lastModified": "2026-01-09T10:30:00.000Z"
  }
  ```

## Viewing Your Data

1. In MongoDB Atlas dashboard, click **"Browse Collections"**
2. Select your database (`hearthand-dev` or `hearthand-prod`)
3. View the `checklists` collection
4. You can manually edit, add, or delete documents here

## Free Tier Limits

- **Storage:** 512 MB
- **RAM:** Shared
- **Connections:** 100 concurrent connections
- **Backups:** Not included (can upgrade if needed)

This is **more than enough** for your checklist application. 512MB can store thousands of checklists.

## Troubleshooting

### Error: "MongoServerError: bad auth"
- Double-check your username and password in the connection string
- Make sure you copied the password correctly (no extra spaces)

### Error: "connect ETIMEDOUT"
- Check Network Access whitelist (should include 0.0.0.0/0)
- Verify your internet connection

### Checklists not saving
- Check browser console for errors
- Verify `MONGODB_URI` is set in `.env.local` (local) or Netlify environment variables (production)
- Restart dev server after adding `.env.local`

### Can't see data in Atlas
- Make sure you're looking at the correct database (`hearthand-dev` or `hearthand-prod`)
- The collection `checklists` is created automatically after first save

## Security Notes

1. **Never commit `.env.local` to git** (it's already in `.gitignore`)
2. Use different databases for dev and prod (`hearthand-dev` vs `hearthand-prod`)
3. If you ever expose your password, regenerate it in Database Access settings
4. Consider adding IP whitelisting for production if you know your server IPs

## Upgrading (Optional)

If you need more storage or features later:
- Go to your cluster → "..."  → "Edit Configuration"
- Upgrade to M2 or M5 tier (paid)
- Get automated backups, higher connection limits, and more storage
