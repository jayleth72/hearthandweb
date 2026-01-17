<?php
/**
 * Plugin Name: Heart & Hand Event Checklists
 * Description: Manages event checklists for Heart & Hand Eco Body Art with GraphQL support
 * Version: 1.0.0
 * Author: Heart & Hand Eco Body Art
 */

if (!defined('ABSPATH')) {
    exit;
}

// Register Checklist Custom Post Type
function hh_register_checklist_post_type() {
    $labels = array(
        'name' => 'Event Checklists',
        'singular_name' => 'Event Checklist',
        'menu_name' => 'Checklists',
        'add_new' => 'Add New Checklist',
        'add_new_item' => 'Add New Checklist',
        'edit_item' => 'Edit Checklist',
        'new_item' => 'New Checklist',
        'view_item' => 'View Checklist',
        'search_items' => 'Search Checklists',
        'not_found' => 'No checklists found',
        'not_found_in_trash' => 'No checklists found in trash'
    );

    $args = array(
        'labels' => $labels,
        'public' => true,
        'has_archive' => false,
        'publicly_queryable' => true,
        'show_ui' => true,
        'show_in_menu' => true,
        'show_in_nav_menus' => false,
        'show_in_rest' => true,
        'show_in_graphql' => true,
        'graphql_single_name' => 'checklist',
        'graphql_plural_name' => 'checklists',
        'menu_icon' => 'dashicons-yes-alt',
        'supports' => array('title', 'custom-fields', 'editor'),
        'capability_type' => 'post',
        'map_meta_cap' => true,
        'rewrite' => array('slug' => 'checklists'),
        'capabilities' => array(
            'create_posts' => 'edit_posts',
        ),
    );

    register_post_type('checklist', $args);
}
add_action('init', 'hh_register_checklist_post_type');

// Register ACF Fields for Checklists
if (function_exists('acf_add_local_field_group')) {
    acf_add_local_field_group(array(
        'key' => 'group_checklist',
        'title' => 'Checklist Details',
        'fields' => array(
            array(
                'key' => 'field_event_date',
                'label' => 'Event Date',
                'name' => 'event_date',
                'type' => 'date_picker',
                'required' => 0,
                'display_format' => 'Y-m-d',
                'return_format' => 'Y-m-d',
                'show_in_graphql' => 1,
            ),
            array(
                'key' => 'field_event_time_start',
                'label' => 'Event Start Time',
                'name' => 'event_time_start',
                'type' => 'text',
                'required' => 0,
                'show_in_graphql' => 1,
            ),
            array(
                'key' => 'field_event_time_end',
                'label' => 'Event End Time',
                'name' => 'event_time_end',
                'type' => 'text',
                'required' => 0,
                'show_in_graphql' => 1,
            ),
            array(
                'key' => 'field_event_address',
                'label' => 'Event Address',
                'name' => 'event_address',
                'type' => 'textarea',
                'required' => 0,
                'rows' => 3,
                'show_in_graphql' => 1,
            ),
            array(
                'key' => 'field_event_maps_link',
                'label' => 'Maps Link',
                'name' => 'event_maps_link',
                'type' => 'url',
                'required' => 0,
                'placeholder' => 'https://maps.google.com/...',
                'show_in_graphql' => 1,
            ),
            array(
                'key' => 'field_checklist_items',
                'label' => 'Checklist Items',
                'name' => 'checklist_items',
                'type' => 'repeater',
                'required' => 0,
                'layout' => 'table',
                'button_label' => 'Add Item',
                'show_in_graphql' => 1,
                'sub_fields' => array(
                    array(
                        'key' => 'field_item_text',
                        'label' => 'Item Text',
                        'name' => 'text',
                        'type' => 'text',
                        'required' => 1,
                        'show_in_graphql' => 1,
                    ),
                    array(
                        'key' => 'field_item_completed',
                        'label' => 'Completed',
                        'name' => 'completed',
                        'type' => 'true_false',
                        'default_value' => 0,
                        'ui' => 1,
                        'show_in_graphql' => 1,
                    ),
                    array(
                        'key' => 'field_item_category',
                        'label' => 'Category',
                        'name' => 'category',
                        'type' => 'select',
                        'choices' => array(
                            'Planning' => 'Planning',
                            'Supplies' => 'Supplies',
                            'Equipment' => 'Equipment',
                            'Day Before' => 'Day Before',
                            'Day Of Event' => 'Day Of Event',
                            'Post Event' => 'Post Event',
                            'Custom' => 'Custom',
                        ),
                        'default_value' => 'Planning',
                        'show_in_graphql' => 1,
                    ),
                ),
            ),
            array(
                'key' => 'field_last_modified',
                'label' => 'Last Modified',
                'name' => 'last_modified',
                'type' => 'date_time_picker',
                'required' => 0,
                'display_format' => 'Y-m-d H:i:s',
                'return_format' => 'Y-m-d H:i:s',
                'show_in_graphql' => 1,
            ),
        ),
        'location' => array(
            array(
                array(
                    'param' => 'post_type',
                    'operator' => '==',
                    'value' => 'checklist',
                ),
            ),
        ),
        'menu_order' => 0,
        'position' => 'normal',
        'style' => 'default',
        'show_in_graphql' => 1,
    ));
}

// Auto-update last_modified timestamp when checklist is saved
function hh_update_checklist_timestamp($post_id) {
    // Only for checklist post type
    if (get_post_type($post_id) !== 'checklist') {
        return;
    }

    // Don't update during autosave
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }

    // Update last modified timestamp
    update_field('last_modified', current_time('Y-m-d H:i:s'), $post_id);
}
add_action('acf/save_post', 'hh_update_checklist_timestamp', 20);

// Add REST API endpoint for updating checklist data (no auth required for testing)
function hh_register_checklist_rest_api() {
    // Create checklist endpoint
    register_rest_route('hearthand/v1', '/checklist/create', array(
        'methods' => 'POST',
        'callback' => 'hh_create_checklist',
        'permission_callback' => '__return_true', // Allow public access for now
    ));
    
    // Update checklist endpoint
    register_rest_route('hearthand/v1', '/checklist/(?P<id>\d+)', array(
        'methods' => 'POST',
        'callback' => 'hh_update_checklist_data',
        'permission_callback' => '__return_true', // Allow public access for now
        'args' => array(
            'id' => array(
                'required' => true,
                'validate_callback' => function($param) {
                    return is_numeric($param);
                }
            ),
        ),
    ));
    
    // Delete checklist endpoint
    register_rest_route('hearthand/v1', '/checklist/(?P<id>\d+)/delete', array(
        'methods' => 'POST',
        'callback' => 'hh_delete_checklist',
        'permission_callback' => '__return_true', // Allow public access for now
        'args' => array(
            'id' => array(
                'required' => true,
                'validate_callback' => function($param) {
                    return is_numeric($param);
                }
            ),
        ),
    ));
}
add_action('rest_api_init', 'hh_register_checklist_rest_api');

function hh_create_checklist($request) {
    error_log('Heart & Hand: REST API endpoint called for checklist creation');
    
    $title = $request->get_param('title');
    $event_date = $request->get_param('event_date');
    $event_time_start = $request->get_param('event_time_start');
    $event_time_end = $request->get_param('event_time_end');
    $event_address = $request->get_param('event_address');
    $event_maps_link = $request->get_param('event_maps_link');
    $checklist_items = $request->get_param('checklist_items');
    
    error_log('Title: ' . $title);
    error_log('Event date: ' . $event_date);
    error_log('Event time start: ' . $event_time_start);
    error_log('Event time end: ' . $event_time_end);
    error_log('Event address: ' . $event_address);
    error_log('Event maps link: ' . $event_maps_link);
    error_log('Checklist items: ' . print_r($checklist_items, true));
    
    // Create the checklist post
    $post_data = array(
        'post_title' => $title,
        'post_type' => 'checklist',
        'post_status' => 'publish',
        'post_content' => ''
    );
    
    $post_id = wp_insert_post($post_data);
    
    if (is_wp_error($post_id)) {
        error_log('Failed to create checklist: ' . $post_id->get_error_message());
        return new WP_Error('create_failed', $post_id->get_error_message(), array('status' => 500));
    }
    
    error_log('Created checklist with ID: ' . $post_id);
    
    // Check if ACF is available
    if (!function_exists('update_field')) {
        error_log('ACF update_field function not available');
        return new WP_Error('acf_not_available', 'ACF is not available', array('status' => 500));
    }
    
    // Update ACF fields
    if ($event_date !== null) {
        $result = update_field('event_date', $event_date, $post_id);
        error_log('Event date update result: ' . ($result ? 'success' : 'failed'));
    }
    
    if ($event_time_start !== null) {
        $result = update_field('event_time_start', $event_time_start, $post_id);
        error_log('Event time start update result: ' . ($result ? 'success' : 'failed'));
    }
    
    if ($event_time_end !== null) {
        $result = update_field('event_time_end', $event_time_end, $post_id);
        error_log('Event time end update result: ' . ($result ? 'success' : 'failed'));
    }
    
    if ($event_address !== null) {
        $result = update_field('event_address', $event_address, $post_id);
        error_log('Event address update result: ' . ($result ? 'success' : 'failed'));
    }
    
    if ($event_maps_link !== null) {
        $result = update_field('event_maps_link', $event_maps_link, $post_id);
        error_log('Event maps link update result: ' . ($result ? 'success' : 'failed'));
    }
    
    if ($checklist_items !== null) {
        $result = update_field('checklist_items', $checklist_items, $post_id);
        error_log('Checklist items update result: ' . ($result ? 'success' : 'failed'));
    }
    
    $result = update_field('last_modified', current_time('Y-m-d H:i:s'), $post_id);
    error_log('Last modified update result: ' . ($result ? 'success' : 'failed'));
    
    return array(
        'success' => true,
        'post_id' => $post_id,
        'message' => 'Checklist created successfully',
        'event_date' => get_field('event_date', $post_id),
        'event_time_start' => get_field('event_time_start', $post_id),
        'event_time_end' => get_field('event_time_end', $post_id),
        'event_address' => get_field('event_address', $post_id),
        'event_maps_link' => get_field('event_maps_link', $post_id),
        'items_count' => is_array($checklist_items) ? count($checklist_items) : 0
    );
}

function hh_update_checklist_data($request) {
    error_log('Heart & Hand: REST API endpoint called for checklist update');
    
    $post_id = $request->get_param('id');
    $event_date = $request->get_param('event_date');
    $event_time_start = $request->get_param('event_time_start');
    $event_time_end = $request->get_param('event_time_end');
    $event_address = $request->get_param('event_address');
    $event_maps_link = $request->get_param('event_maps_link');
    $checklist_items = $request->get_param('checklist_items');
    
    error_log('Post ID: ' . $post_id);
    error_log('Event date: ' . $event_date);
    error_log('Event time start: ' . $event_time_start);
    error_log('Event time end: ' . $event_time_end);
    error_log('Event address: ' . $event_address);
    error_log('Event maps link: ' . $event_maps_link);
    error_log('Checklist items: ' . print_r($checklist_items, true));
    
    // Verify post exists and is a checklist
    $post = get_post($post_id);
    if (!$post || $post->post_type !== 'checklist') {
        error_log('Invalid checklist ID: ' . $post_id);
        return new WP_Error('invalid_post', 'Invalid checklist ID', array('status' => 404));
    }
    
    // Check if ACF is available
    if (!function_exists('update_field')) {
        error_log('ACF update_field function not available');
        return new WP_Error('acf_not_available', 'ACF is not available', array('status' => 500));
    }
    
    // Update ACF fields
    if ($event_date !== null) {
        $result = update_field('event_date', $event_date, $post_id);
        error_log('Event date update result: ' . ($result ? 'success' : 'failed'));
    }
    
    if ($event_time_start !== null) {
        $result = update_field('event_time_start', $event_time_start, $post_id);
        error_log('Event time start update result: ' . ($result ? 'success' : 'failed'));
    }
    
    if ($event_time_end !== null) {
        $result = update_field('event_time_end', $event_time_end, $post_id);
        error_log('Event time end update result: ' . ($result ? 'success' : 'failed'));
    }
    
    if ($event_address !== null) {
        $result = update_field('event_address', $event_address, $post_id);
        error_log('Event address update result: ' . ($result ? 'success' : 'failed'));
    }
    
    if ($event_maps_link !== null) {
        $result = update_field('event_maps_link', $event_maps_link, $post_id);
        error_log('Event maps link update result: ' . ($result ? 'success' : 'failed'));
    }
    
    if ($checklist_items !== null) {
        $result = update_field('checklist_items', $checklist_items, $post_id);
        error_log('Checklist items update result: ' . ($result ? 'success' : 'failed'));
    }
    
    $result = update_field('last_modified', current_time('Y-m-d H:i:s'), $post_id);
    error_log('Last modified update result: ' . ($result ? 'success' : 'failed'));
    
    return array(
        'success' => true,
        'post_id' => $post_id,
        'message' => 'Checklist updated successfully',
        'event_date' => get_field('event_date', $post_id),
        'event_time_start' => get_field('event_time_start', $post_id),
        'event_time_end' => get_field('event_time_end', $post_id),
        'event_address' => get_field('event_address', $post_id),
        'event_maps_link' => get_field('event_maps_link', $post_id),
        'items_count' => is_array($checklist_items) ? count($checklist_items) : 0
    );
}

function hh_delete_checklist($request) {
    error_log('Heart & Hand: REST API endpoint called for checklist deletion');
    
    $post_id = $request->get_param('id');
    
    error_log('Deleting checklist ID: ' . $post_id);
    
    // Verify post exists and is a checklist
    $post = get_post($post_id);
    if (!$post || $post->post_type !== 'checklist') {
        error_log('Invalid checklist ID: ' . $post_id);
        return new WP_Error('invalid_post', 'Invalid checklist ID', array('status' => 404));
    }
    
    // Delete the post (move to trash)
    $result = wp_trash_post($post_id);
    
    if (!$result) {
        error_log('Failed to delete checklist: ' . $post_id);
        return new WP_Error('delete_failed', 'Failed to delete checklist', array('status' => 500));
    }
    
    error_log('Successfully deleted checklist: ' . $post_id);
    
    return array(
        'success' => true,
        'post_id' => $post_id,
        'message' => 'Checklist deleted successfully'
    );
}

