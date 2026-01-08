#!/bin/bash

# Instagram Token Refresh Helper Script
# This script helps you refresh your Instagram access token

echo "==================================="
echo "Instagram Token Refresh Helper"
echo "==================================="
echo ""

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "❌ Error: .env.local file not found"
    exit 1
fi

# Extract current token
CURRENT_TOKEN=$(grep INSTAGRAM_ACCESS_TOKEN .env.local | cut -d '=' -f2)

if [ -z "$CURRENT_TOKEN" ]; then
    echo "❌ Error: INSTAGRAM_ACCESS_TOKEN not found in .env.local"
    exit 1
fi

echo "📋 Current token found (first 20 chars): ${CURRENT_TOKEN:0:20}..."
echo ""

# Check token validity
echo "🔍 Checking current token status..."
TOKEN_CHECK=$(curl -s "https://graph.instagram.com/me?fields=id,username&access_token=$CURRENT_TOKEN")

if echo "$TOKEN_CHECK" | grep -q "error"; then
    echo "❌ Current token is invalid or expired"
    echo ""
    echo "Error details:"
    echo "$TOKEN_CHECK" | jq '.'
    echo ""
    echo "⚠️  You need to generate a NEW token"
    echo ""
    echo "Follow these steps:"
    echo "1. Go to https://developers.facebook.com/"
    echo "2. Select your app → Instagram Basic Display"
    echo "3. Click 'User Token Generator'"
    echo "4. Generate a new token"
    echo "5. Run this script with the new token:"
    echo "   ./refresh_token.sh YOUR_NEW_SHORT_TOKEN"
else
    echo "✅ Current token is valid!"
    echo ""
    echo "Account details:"
    echo "$TOKEN_CHECK" | jq '.'
    echo ""
    echo "🔄 Attempting to refresh token..."
    
    REFRESH_RESPONSE=$(curl -s "https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=$CURRENT_TOKEN")
    
    if echo "$REFRESH_RESPONSE" | grep -q "access_token"; then
        NEW_TOKEN=$(echo "$REFRESH_RESPONSE" | jq -r '.access_token')
        EXPIRES_IN=$(echo "$REFRESH_RESPONSE" | jq -r '.expires_in')
        
        echo "✅ Token refreshed successfully!"
        echo ""
        echo "New token (first 20 chars): ${NEW_TOKEN:0:20}..."
        echo "Expires in: $EXPIRES_IN seconds (~$(($EXPIRES_IN / 86400)) days)"
        echo ""
        echo "📝 Updating .env.local..."
        
        # Backup current file
        cp .env.local .env.local.backup
        
        # Update token in .env.local
        sed -i "s|INSTAGRAM_ACCESS_TOKEN=.*|INSTAGRAM_ACCESS_TOKEN=$NEW_TOKEN|" .env.local
        
        echo "✅ .env.local updated!"
        echo "💾 Backup saved as .env.local.backup"
        echo ""
        echo "⚠️  Don't forget to also update your Vercel environment variable!"
        echo ""
        echo "New token to copy:"
        echo "$NEW_TOKEN"
    else
        echo "❌ Failed to refresh token"
        echo ""
        echo "Response:"
        echo "$REFRESH_RESPONSE" | jq '.'
    fi
fi

echo ""
echo "==================================="
