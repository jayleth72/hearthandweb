<?php
/**
 * Plugin Name: Heart & Hand Events
 * Plugin URI: https://heartandhand.com
 * Description: Custom post type for events with GraphQL and ACF support for Heart & Hand Face Painting
 * Version: 1.0.0
 * Author: Heart & Hand
 * Author URI: https://heartandhand.com
 * License: GPL v2 or later
 * Text Domain: heart-hand-events
 * Requires at least: 5.0
 * Requires PHP: 7.4
 */

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Register Events Custom Post Type
 */
function hh_register_events_post_type() {
    $labels = array(
        'name'                  => _x('Events', 'Post Type General Name', 'heart-hand-events'),
        'singular_name'         => _x('Event', 'Post Type Singular Name', 'heart-hand-events'),
        'menu_name'             => __('Events', 'heart-hand-events'),
        'name_admin_bar'        => __('Event', 'heart-hand-events'),
        'archives'              => __('Event Archives', 'heart-hand-events'),
        'attributes'            => __('Event Attributes', 'heart-hand-events'),
        'parent_item_colon'     => __('Parent Event:', 'heart-hand-events'),
        'all_items'             => __('All Events', 'heart-hand-events'),
        'add_new_item'          => __('Add New Event', 'heart-hand-events'),
        'add_new'               => __('Add New', 'heart-hand-events'),
        'new_item'              => __('New Event', 'heart-hand-events'),
        'edit_item'             => __('Edit Event', 'heart-hand-events'),
        'update_item'           => __('Update Event', 'heart-hand-events'),
        'view_item'             => __('View Event', 'heart-hand-events'),
        'view_items'            => __('View Events', 'heart-hand-events'),
        'search_items'          => __('Search Event', 'heart-hand-events'),
        'not_found'             => __('Not found', 'heart-hand-events'),
        'not_found_in_trash'    => __('Not found in Trash', 'heart-hand-events'),
        'featured_image'        => __('Featured Image', 'heart-hand-events'),
        'set_featured_image'    => __('Set featured image', 'heart-hand-events'),
        'remove_featured_image' => __('Remove featured image', 'heart-hand-events'),
        'use_featured_image'    => __('Use as featured image', 'heart-hand-events'),
        'insert_into_item'      => __('Insert into event', 'heart-hand-events'),
        'uploaded_to_this_item' => __('Uploaded to this event', 'heart-hand-events'),
        'items_list'            => __('Events list', 'heart-hand-events'),
        'items_list_navigation' => __('Events list navigation', 'heart-hand-events'),
        'filter_items_list'     => __('Filter events list', 'heart-hand-events'),
    );
    
    $args = array(
        'label'                 => __('Event', 'heart-hand-events'),
        'description'           => __('Events for Heart & Hand Face Painting', 'heart-hand-events'),
        'labels'                => $labels,
        'supports'              => array('title', 'editor', 'thumbnail', 'excerpt', 'custom-fields', 'revisions'),
        'taxonomies'            => array('event_category'),
        'hierarchical'          => false,
        'public'                => true,
        'show_ui'               => true,
        'show_in_menu'          => true,
        'menu_position'         => 5,
        'menu_icon'             => 'dashicons-calendar-alt',
        'show_in_admin_bar'     => true,
        'show_in_nav_menus'     => true,
        'can_export'            => true,
        'has_archive'           => true,
        'exclude_from_search'   => false,
        'publicly_queryable'    => true,
        'capability_type'       => 'post',
        'show_in_rest'          => true,
        'rest_base'             => 'events',
        'rest_controller_class' => 'WP_REST_Posts_Controller',
        'show_in_graphql'       => true,
        'graphql_single_name'   => 'event',
        'graphql_plural_name'   => 'events',
        'rewrite'               => array(
            'slug'       => 'events',
            'with_front' => false,
        ),
    );
    
    register_post_type('event', $args);
}
add_action('init', 'hh_register_events_post_type', 0);

/**
 * Register Event Categories Taxonomy
 */
function hh_register_event_taxonomy() {
    $labels = array(
        'name'                       => _x('Event Categories', 'Taxonomy General Name', 'heart-hand-events'),
        'singular_name'              => _x('Event Category', 'Taxonomy Singular Name', 'heart-hand-events'),
        'menu_name'                  => __('Event Categories', 'heart-hand-events'),
        'all_items'                  => __('All Event Categories', 'heart-hand-events'),
        'parent_item'                => __('Parent Event Category', 'heart-hand-events'),
        'parent_item_colon'          => __('Parent Event Category:', 'heart-hand-events'),
        'new_item_name'              => __('New Event Category Name', 'heart-hand-events'),
        'add_new_item'               => __('Add New Event Category', 'heart-hand-events'),
        'edit_item'                  => __('Edit Event Category', 'heart-hand-events'),
        'update_item'                => __('Update Event Category', 'heart-hand-events'),
        'view_item'                  => __('View Event Category', 'heart-hand-events'),
        'separate_items_with_commas' => __('Separate categories with commas', 'heart-hand-events'),
        'add_or_remove_items'        => __('Add or remove categories', 'heart-hand-events'),
        'choose_from_most_used'      => __('Choose from the most used', 'heart-hand-events'),
        'popular_items'              => __('Popular Event Categories', 'heart-hand-events'),
        'search_items'               => __('Search Event Categories', 'heart-hand-events'),
        'not_found'                  => __('Not Found', 'heart-hand-events'),
        'no_terms'                   => __('No categories', 'heart-hand-events'),
        'items_list'                 => __('Event Categories list', 'heart-hand-events'),
        'items_list_navigation'      => __('Event Categories list navigation', 'heart-hand-events'),
    );
    
    $args = array(
        'labels'                     => $labels,
        'hierarchical'               => true,
        'public'                     => true,
        'show_ui'                    => true,
        'show_admin_column'          => true,
        'show_in_nav_menus'          => true,
        'show_tagcloud'              => true,
        'show_in_rest'               => true,
        'rest_base'                  => 'event-categories',
        'rest_controller_class'      => 'WP_REST_Terms_Controller',
        'show_in_graphql'            => true,
        'graphql_single_name'        => 'eventCategory',
        'graphql_plural_name'        => 'eventCategories',
        'rewrite'                    => array(
            'slug'         => 'event-category',
            'with_front'   => false,
            'hierarchical' => true,
        ),
    );
    
    register_taxonomy('event_category', array('event'), $args);
}
add_action('init', 'hh_register_event_taxonomy', 0);

/**
 * Register ACF Field Group for Events
 * This will create the field group programmatically if ACF is installed
 */
function hh_register_event_acf_fields() {
    if (function_exists('acf_add_local_field_group')) {
        acf_add_local_field_group(array(
            'key' => 'group_event_details',
            'title' => 'Event Details',
            'fields' => array(
                array(
                    'key' => 'field_event_date',
                    'label' => 'Event Date',
                    'name' => 'event_date',
                    'type' => 'date_picker',
                    'instructions' => 'Select the date of the event',
                    'required' => 1,
                    'display_format' => 'F j, Y',
                    'return_format' => 'Y-m-d',
                    'first_day' => 0,
                    'show_in_graphql' => 1,
                    'graphql_field_name' => 'eventDate',
                ),
                array(
                    'key' => 'field_event_time',
                    'label' => 'Event Time',
                    'name' => 'event_time',
                    'type' => 'text',
                    'instructions' => 'Enter the event time (e.g., "10:00 AM - 6:00 PM")',
                    'required' => 1,
                    'default_value' => '',
                    'placeholder' => '10:00 AM - 6:00 PM',
                    'show_in_graphql' => 1,
                    'graphql_field_name' => 'eventTime',
                ),
                array(
                    'key' => 'field_event_end_date',
                    'label' => 'Event End Date',
                    'name' => 'event_end_date',
                    'type' => 'date_picker',
                    'instructions' => 'Optional: For multi-day events',
                    'required' => 0,
                    'display_format' => 'F j, Y',
                    'return_format' => 'Y-m-d',
                    'first_day' => 0,
                    'show_in_graphql' => 1,
                    'graphql_field_name' => 'endDate',
                ),
                array(
                    'key' => 'field_location_name',
                    'label' => 'Location Name',
                    'name' => 'location_name',
                    'type' => 'text',
                    'instructions' => 'Name of the venue or location',
                    'required' => 1,
                    'default_value' => '',
                    'placeholder' => 'Central Park Community Center',
                    'show_in_graphql' => 1,
                    'graphql_field_name' => 'locationName',
                ),
                array(
                    'key' => 'field_address',
                    'label' => 'Address',
                    'name' => 'address',
                    'type' => 'textarea',
                    'instructions' => 'Full address of the event location',
                    'required' => 1,
                    'default_value' => '',
                    'placeholder' => '123 Park Avenue, Your City, State ZIP',
                    'rows' => 3,
                    'show_in_graphql' => 1,
                    'graphql_field_name' => 'address',
                ),
                array(
                    'key' => 'field_event_type',
                    'label' => 'Event Type',
                    'name' => 'event_type',
                    'type' => 'select',
                    'instructions' => 'Select the type of event',
                    'required' => 1,
                    'choices' => array(
                        'festival' => 'Festival',
                        'party' => 'Party',
                        'corporate' => 'Corporate Event',
                        'community' => 'Community Event',
                    ),
                    'default_value' => 'community',
                    'allow_null' => 0,
                    'multiple' => 0,
                    'ui' => 1,
                    'return_format' => 'value',
                    'show_in_graphql' => 1,
                    'graphql_field_name' => 'eventType',
                ),
                array(
                    'key' => 'field_is_featured',
                    'label' => 'Featured Event',
                    'name' => 'is_featured',
                    'type' => 'true_false',
                    'instructions' => 'Mark this event as featured on the website',
                    'required' => 0,
                    'default_value' => 0,
                    'ui' => 1,
                    'ui_on_text' => 'Yes',
                    'ui_off_text' => 'No',
                    'show_in_graphql' => 1,
                    'graphql_field_name' => 'isFeatured',
                ),
                array(
                    'key' => 'field_max_attendees',
                    'label' => 'Maximum Attendees',
                    'name' => 'max_attendees',
                    'type' => 'number',
                    'instructions' => 'Optional: Maximum number of attendees',
                    'required' => 0,
                    'default_value' => '',
                    'placeholder' => '100',
                    'min' => 0,
                    'show_in_graphql' => 1,
                    'graphql_field_name' => 'maxAttendees',
                ),
                array(
                    'key' => 'field_registration_link',
                    'label' => 'Registration Link',
                    'name' => 'registration_link',
                    'type' => 'url',
                    'instructions' => 'Optional: Link to event registration or tickets',
                    'required' => 0,
                    'default_value' => '',
                    'placeholder' => 'https://example.com/register',
                    'show_in_graphql' => 1,
                    'graphql_field_name' => 'registrationLink',
                ),
                array(
                    'key' => 'field_price',
                    'label' => 'Price',
                    'name' => 'price',
                    'type' => 'text',
                    'instructions' => 'Event price or "Free"',
                    'required' => 0,
                    'default_value' => 'Free',
                    'placeholder' => 'Free or $10',
                    'show_in_graphql' => 1,
                    'graphql_field_name' => 'price',
                ),
                array(
                    'key' => 'field_event_image_1',
                    'label' => 'Event Image 1',
                    'name' => 'event_image_1',
                    'type' => 'image',
                    'instructions' => 'Upload first event image',
                    'required' => 0,
                    'return_format' => 'array',
                    'preview_size' => 'medium',
                    'library' => 'all',
                    'show_in_graphql' => 1,
                    'graphql_field_name' => 'eventImage1',
                ),
                array(
                    'key' => 'field_event_image_2',
                    'label' => 'Event Image 2',
                    'name' => 'event_image_2',
                    'type' => 'image',
                    'instructions' => 'Upload second event image',
                    'required' => 0,
                    'return_format' => 'array',
                    'preview_size' => 'medium',
                    'library' => 'all',
                    'show_in_graphql' => 1,
                    'graphql_field_name' => 'eventImage2',
                ),
                array(
                    'key' => 'field_event_image_3',
                    'label' => 'Event Image 3',
                    'name' => 'event_image_3',
                    'type' => 'image',
                    'instructions' => 'Upload third event image',
                    'required' => 0,
                    'return_format' => 'array',
                    'preview_size' => 'medium',
                    'library' => 'all',
                    'show_in_graphql' => 1,
                    'graphql_field_name' => 'eventImage3',
                ),
                array(
                    'key' => 'field_event_image_4',
                    'label' => 'Event Image 4',
                    'name' => 'event_image_4',
                    'type' => 'image',
                    'instructions' => 'Upload fourth event image (optional)',
                    'required' => 0,
                    'return_format' => 'array',
                    'preview_size' => 'medium',
                    'library' => 'all',
                    'show_in_graphql' => 1,
                    'graphql_field_name' => 'eventImage4',
                ),
                array(
                    'key' => 'field_event_image_5',
                    'label' => 'Event Image 5',
                    'name' => 'event_image_5',
                    'type' => 'image',
                    'instructions' => 'Upload fifth event image (optional)',
                    'required' => 0,
                    'return_format' => 'array',
                    'preview_size' => 'medium',
                    'library' => 'all',
                    'show_in_graphql' => 1,
                    'graphql_field_name' => 'eventImage5',
                ),
                array(
                    'key' => 'field_event_image_6',
                    'label' => 'Event Image 6',
                    'name' => 'event_image_6',
                    'type' => 'image',
                    'instructions' => 'Upload sixth event image (optional)',
                    'required' => 0,
                    'return_format' => 'array',
                    'preview_size' => 'medium',
                    'library' => 'all',
                    'show_in_graphql' => 1,
                    'graphql_field_name' => 'eventImage6',
                ),
                array(
                    'key' => 'field_attendee_count',
                    'label' => 'Attendee Count',
                    'name' => 'attendee_count',
                    'type' => 'number',
                    'instructions' => 'For past events: How many people attended?',
                    'required' => 0,
                    'default_value' => '',
                    'placeholder' => '200',
                    'min' => 0,
                    'show_in_graphql' => 1,
                    'graphql_field_name' => 'attendeeCount',
                ),
                array(
                    'key' => 'field_event_status',
                    'label' => 'Event Status',
                    'name' => 'event_status',
                    'type' => 'select',
                    'instructions' => 'Current status of the event',
                    'required' => 1,
                    'choices' => array(
                        'upcoming' => 'Upcoming',
                        'past' => 'Past Event',
                        'cancelled' => 'Cancelled',
                    ),
                    'default_value' => 'upcoming',
                    'allow_null' => 0,
                    'multiple' => 0,
                    'ui' => 1,
                    'return_format' => 'value',
                    'show_in_graphql' => 1,
                    'graphql_field_name' => 'eventStatus',
                ),
            ),
            'location' => array(
                array(
                    array(
                        'param' => 'post_type',
                        'operator' => '==',
                        'value' => 'event',
                    ),
                ),
            ),
            'menu_order' => 0,
            'position' => 'normal',
            'style' => 'default',
            'label_placement' => 'top',
            'instruction_placement' => 'label',
            'hide_on_screen' => '',
            'active' => true,
            'description' => '',
            'show_in_graphql' => 1,
            'graphql_field_name' => 'eventDetails',
        ));
    }
}
add_action('acf/init', 'hh_register_event_acf_fields');

/**
 * Add custom columns to Events admin list
 */
function hh_events_custom_columns($columns) {
    $new_columns = array();
    $new_columns['cb'] = $columns['cb'];
    $new_columns['title'] = $columns['title'];
    $new_columns['event_date'] = __('Event Date', 'heart-hand-events');
    $new_columns['event_type'] = __('Type', 'heart-hand-events');
    $new_columns['event_status'] = __('Status', 'heart-hand-events');
    $new_columns['location'] = __('Location', 'heart-hand-events');
    $new_columns['date'] = $columns['date'];
    return $new_columns;
}
add_filter('manage_event_posts_columns', 'hh_events_custom_columns');

/**
 * Populate custom columns
 */
function hh_events_custom_column_content($column, $post_id) {
    switch ($column) {
        case 'event_date':
            $event_date = get_field('event_date', $post_id);
            if ($event_date) {
                echo date('M j, Y', strtotime($event_date));
            } else {
                echo '—';
            }
            break;
        case 'event_type':
            $event_type = get_field('event_type', $post_id);
            if ($event_type) {
                echo '<span class="event-type-badge">' . ucfirst($event_type) . '</span>';
            } else {
                echo '—';
            }
            break;
        case 'event_status':
            $event_status = get_field('event_status', $post_id);
            if ($event_status) {
                echo '<span class="event-status-' . $event_status . '">' . ucfirst($event_status) . '</span>';
            } else {
                echo '—';
            }
            break;
        case 'location':
            $location = get_field('location_name', $post_id);
            if ($location) {
                echo esc_html($location);
            } else {
                echo '—';
            }
            break;
    }
}
add_action('manage_event_posts_custom_column', 'hh_events_custom_column_content', 10, 2);

/**
 * Make custom columns sortable
 */
function hh_events_sortable_columns($columns) {
    $columns['event_date'] = 'event_date';
    $columns['event_type'] = 'event_type';
    $columns['event_status'] = 'event_status';
    return $columns;
}
add_filter('manage_edit-event_sortable_columns', 'hh_events_sortable_columns');

/**
 * Flush rewrite rules on plugin activation
 */
function hh_events_activate() {
    hh_register_events_post_type();
    hh_register_event_taxonomy();
    flush_rewrite_rules();
}
register_activation_hook(__FILE__, 'hh_events_activate');

/**
 * Flush rewrite rules on plugin deactivation
 */
function hh_events_deactivate() {
    flush_rewrite_rules();
}
register_deactivation_hook(__FILE__, 'hh_events_deactivate');

/**
 * Add admin notice if ACF is not installed
 */
function hh_events_acf_notice() {
    if (!function_exists('acf_add_local_field_group')) {
        ?>
        <div class="notice notice-warning is-dismissible">
            <p>
                <strong>Heart & Hand Events:</strong> 
                <?php _e('Advanced Custom Fields (ACF) plugin is required for full functionality. Please install and activate ACF.', 'heart-hand-events'); ?>
            </p>
        </div>
        <?php
    }
}
add_action('admin_notices', 'hh_events_acf_notice');

/**
 * Add admin notice if WPGraphQL is not installed
 */
function hh_events_graphql_notice() {
    if (!function_exists('graphql')) {
        ?>
        <div class="notice notice-warning is-dismissible">
            <p>
                <strong>Heart & Hand Events:</strong> 
                <?php _e('WPGraphQL plugin is recommended for API functionality. Please install and activate WPGraphQL.', 'heart-hand-events'); ?>
            </p>
        </div>
        <?php
    }
}
add_action('admin_notices', 'hh_events_graphql_notice');
/**
 * Register ACF fields to REST API
 * This allows updating ACF fields via the WordPress REST API
 */
function hh_register_acf_to_rest_api() {
    // Make sure ACF is installed
    if (!function_exists('acf_add_local_field_group')) {
        return;
    }
    
    // Get all ACF field groups
    $field_groups = acf_get_field_groups(array(
        'post_type' => 'event'
    ));
    
    foreach ($field_groups as $group) {
        // Get all fields in this group
        $fields = acf_get_fields($group['key']);
        
        if ($fields) {
            foreach ($fields as $field) {
                // Register each field to the REST API
                register_rest_field('event', $field['name'], array(
                    'get_callback' => function($object) use ($field) {
                        return get_field($field['name'], $object['id']);
                    },
                    'update_callback' => function($value, $object) use ($field) {
                        $post_id = is_object($object) ? $object->ID : $object['id'];
                        $result = update_field($field['name'], $value, $post_id);
                        error_log("Updating ACF field {$field['name']} with value: " . print_r($value, true) . " for post $post_id - Result: " . ($result ? 'success' : 'failed'));
                        return $result;
                    },
                    'schema' => null,
                ));
            }
        }
    }
}
add_action('rest_api_init', 'hh_register_acf_to_rest_api');

/**
 * Register custom REST API endpoint for updating event ACF fields
 * This provides a dedicated endpoint for ACF field updates
 */
function hh_register_event_acf_endpoint() {
    register_rest_route('hearthand/v1', '/event/(?P<id>\d+)/acf', array(
        'methods' => 'POST',
        'callback' => 'hh_update_event_acf_fields',
        'permission_callback' => function($request) {
            // Check if user is authenticated and can edit posts
            return is_user_logged_in() && current_user_can('edit_posts');
        },
        'args' => array(
            'id' => array(
                'required' => true,
                'validate_callback' => function($param, $request, $key) {
                    return is_numeric($param);
                }
            ),
        ),
    ));
}
add_action('rest_api_init', 'hh_register_event_acf_endpoint');

/**
 * Callback function to update event ACF fields
 */
function hh_update_event_acf_fields($request) {
    $event_id = (int) $request['id'];
    $params = $request->get_json_params();
    
    error_log("=== EVENT ACF UPDATE START ===");
    error_log("Event ID: $event_id");
    error_log("Params: " . print_r($params, true));
    
    // Verify the post exists and is an event
    $post = get_post($event_id);
    if (!$post || $post->post_type !== 'event') {
        error_log("ERROR: Invalid event ID or wrong post type");
        return new WP_Error('invalid_event', 'Invalid event ID', array('status' => 404));
    }
    
    // Check if ACF is available
    if (!function_exists('update_field')) {
        error_log("ERROR: ACF update_field function not available");
        return new WP_Error('acf_not_available', 'ACF is not available', array('status' => 500));
    }
    
    // Update ACF fields
    $updated_fields = array();
    $failed_fields = array();
    
    foreach ($params as $field_name => $field_value) {
        error_log("Updating field: $field_name = " . print_r($field_value, true));
        
        // Update the field
        $result = update_field($field_name, $field_value, $event_id);
        
        if ($result) {
            $updated_fields[] = $field_name;
            error_log("SUCCESS: Updated field $field_name");
            
            // Verify the update
            $verify = get_field($field_name, $event_id);
            error_log("Verification - field $field_name now has value: " . print_r($verify, true));
        } else {
            $failed_fields[] = $field_name;
            error_log("FAILED: Could not update field $field_name");
        }
    }
    
    error_log("=== EVENT ACF UPDATE END ===");
    
    return rest_ensure_response(array(
        'success' => true,
        'event_id' => $event_id,
        'updated_fields' => $updated_fields,
        'failed_fields' => $failed_fields,
        'message' => 'ACF fields processed'
    ));
}

/**
 * Hook into WordPress REST API insert/update to automatically save ACF fields
 * This allows ACF fields to be saved when creating or updating events via REST API
 */
function hh_save_event_acf_fields_on_rest($post, $request, $creating) {
    // Only process event post type
    if ($post->post_type !== 'event') {
        return;
    }
    
    error_log("=== SAVE EVENT ACF FIELDS (REST) ===");
    error_log("Post ID: " . $post->ID);
    error_log("Creating: " . ($creating ? 'yes' : 'no'));
    
    // Get the request body
    $params = $request->get_json_params();
    if (!$params) {
        $params = $request->get_body_params();
    }
    
    error_log("Request params: " . print_r($params, true));
    
    // Check if ACF is available
    if (!function_exists('update_field')) {
        error_log("ERROR: ACF not available");
        return;
    }
    
    // List of ACF field names we expect
    $acf_fields = array(
        'event_date',
        'event_time',
        'event_end_date',
        'location_name',
        'address',
        'event_type',
        'is_featured',
        'max_attendees',
        'registration_link',
        'price',
        'event_status',
        'event_image_1',
        'event_image_2',
        'event_image_3',
        'event_image_4',
        'event_image_5',
        'event_image_6',
        'attendee_count'
    );
    
    // Update each ACF field if present in the request
    foreach ($acf_fields as $field_name) {
        if (isset($params[$field_name])) {
            $value = $params[$field_name];
            error_log("Updating ACF field: $field_name = " . print_r($value, true));
            $result = update_field($field_name, $value, $post->ID);
            error_log("Update result for $field_name: " . ($result ? 'success' : 'failed'));
        }
    }
    
    error_log("=== SAVE EVENT ACF FIELDS END ===");
}
add_action('rest_insert_event', 'hh_save_event_acf_fields_on_rest', 10, 3);
add_action('rest_after_insert_event', 'hh_save_event_acf_fields_on_rest', 10, 3);