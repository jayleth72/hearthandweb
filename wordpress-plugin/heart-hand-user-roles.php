<?php
/**
 * Plugin Name: Heart & Hand User Roles API
 * Plugin URI: https://heartandhand.com
 * Description: Exposes user roles in WordPress REST API for authentication
 * Version: 1.0.0
 * Author: Heart & Hand
 * Author URI: https://heartandhand.com
 * License: GPL v2 or later
 * Text Domain: heart-hand-user-roles
 * Requires at least: 5.0
 * Requires PHP: 7.4
 */

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Add user roles to REST API user response
 * This is required for the Next.js frontend to check if a user is an administrator
 */
add_filter('rest_prepare_user', function($response, $user, $request) {
    // Add roles to the response
    $response->data['roles'] = $user->roles;
    
    // Also add capabilities for more granular permission checking
    $response->data['capabilities'] = $user->allcaps;
    
    return $response;
}, 10, 3);

/**
 * Ensure the /wp-json/wp/v2/users/me endpoint includes roles
 * This is specifically for JWT authentication
 */
add_filter('jwt_auth_token_before_dispatch', function($data, $user) {
    // Add roles to JWT token data
    $data['user_roles'] = $user->roles;
    $data['is_admin'] = in_array('administrator', $user->roles);
    
    return $data;
}, 10, 2);

/**
 * Add CORS headers to allow authentication from Next.js frontend
 */
add_action('rest_api_init', function() {
    // Only add CORS headers in development
    // In production, configure this properly in your web server
    $allowed_origins = [
        'http://localhost:3000',
        'http://localhost:3001',
        'http://handheartecobodyart.local'
    ];
    
    $origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';
    
    if (in_array($origin, $allowed_origins)) {
        header('Access-Control-Allow-Origin: ' . $origin);
        header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
        header('Access-Control-Allow-Headers: Authorization, Content-Type');
        header('Access-Control-Allow-Credentials: true');
    }
});

/**
 * Handle preflight OPTIONS requests
 */
add_action('rest_pre_serve_request', function($served, $result, $request) {
    if ($request->get_method() === 'OPTIONS') {
        header('HTTP/1.1 200 OK');
        exit;
    }
    return $served;
}, 10, 3);
