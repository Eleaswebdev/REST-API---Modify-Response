<?php
/**
 * Plugin Name: Modify Response REST API
 * Description: Example of modifying the response of a REST API endpoint
 * Version: 1.0
 * Author: Eleas Kanchon
 */

 /**
  * Modify the response using rest_prepare_post
  */

 // 1. Add a Custom Field to Post API Response
add_filter('rest_prepare_post', function($response, $post, $request) {
    // Add a custom field to the response
    $response->data['custom_field'] = 'This is a custom field';

    $author_id = $post->post_author;
    $author_name = get_the_author_meta('display_name', $author_id);

    $response->data['author_name'] = $author_name;

    return $response;
}, 10, 3);

// 2. Remove a Field from Response
add_filter('rest_prepare_post', function($response, $post, $request) {
    // Remove the 'content' field from the response
    unset($response->data['content']);

    return $response;
}, 10, 3);

//3. Modify an Existing Field (e.g., Title)
add_filter('rest_prepare_post', function($response, $post, $request) {
    // Modify the 'title' field in the response
    $response->data['title'] = 'Modified Title: ' . $response->data['title']['rendered'];

    return $response;
}, 10, 3);

// 4. Modify Custom Post Types
add_filter('rest_prepare_book', function($response, $post, $request) {
    // Modify the response for a custom post type
    $response->data['custom_field'] = 'This is a custom field for my custom post type';

    return $response;
}, 10, 3);

/**
 * Modify the response using register_post_meta
 */

 function nt_register_custom_meta_book() {
    // Register meta field 'publisher' for book CPT
    register_post_meta('book', 'publisher', [
        //'show_in_rest' => true,      // Expose in REST API
        'description' => 'Publisher of the book', // Description
        'single'       => true,      // Single value, not array
        'type'         => 'string',  // Data type
        'sanitize_callback' => 'sanitize_text_field',
        // 'auth_callback' => function() {
        //     return true;             // Allow public read access
        // },
        'auth_callback' => function() {
            return current_user_can('edit_posts'); // Only logged-in users who can edit posts
        },
        'show_in_rest' => [
            'schema' => [
                'type'        => 'string',
                'description' => 'The name of the publisher',
                'default'     => 'Unknown Publisher',
                'enum'        => ['Penguin', 'HarperCollins', 'O\'Reilly', 'Unknown Publisher'],
            ],
        ],
    ]);

    // Register meta field 'published_year' for book CPT
    register_post_meta('book', 'published_year', [
        'show_in_rest' => true,
        'single'       => true,
        'type'         => 'number',
        'auth_callback' => function() {
            return true;
        },
    ]);
 }
 add_action('init', 'nt_register_custom_meta_book');

 // Example of grouping multiple meta fields together under a single object
 add_action('init', function () {
    register_post_meta('book', 'publisher_details', [
        'show_in_rest' => [
            'schema' => [
                'type' => 'object',
                'properties' => [
                    'name' => [
                        'type' => 'string',
                        'description' => 'Publisher Name',
                        'default' => 'Unknown Publisher',
                    ],
                    'country' => [
                        'type' => 'string',
                        'description' => 'Country of Publisher',
                        'default' => 'Unknown',
                    ],
                    'year_established' => [
                        'type' => 'integer',
                        'description' => 'Year Publisher was established',
                        'default' => 0,
                    ],
                ],
                'description' => 'Details about the publisher',
            ],
        ],
        'single' => true,
        'type' => 'object',
        'default' => [
            'name' => 'Unknown Publisher',
            'country' => 'Unknown',
            'year_established' => 0,
        ],
        'auth_callback' => function() {
            return current_user_can('edit_posts'); // Security
        },
        'sanitize_callback' => function($meta_value) {
            // Optionally sanitize each field individually
            if (is_array($meta_value)) {
                $meta_value['name'] = sanitize_text_field($meta_value['name'] ?? '');
                $meta_value['country'] = sanitize_text_field($meta_value['country'] ?? '');
                $meta_value['year_established'] = intval($meta_value['year_established'] ?? 0);
            }
            return $meta_value;
        },
    ]);
});


/**
 * Modify the response using register_rest_field
 * GET /wp-json/wp/v2/book/123
 */

 add_action('rest_api_init', function () {
    register_rest_field('book', 'publisher_details', [
        'get_callback'    => function($post_arr) {
            // Get post ID
            $post_id = $post_arr['id'];

            // Get the publisher_details meta
            $publisher_details = get_post_meta($post_id, 'publisher_details', true);

            // If no value, fallback to default
            if (empty($publisher_details)) {
                $publisher_details = [
                    'name' => 'Unknown Publisher',
                    'country' => 'Unknown',
                    'year_established' => 0,
                ];
            }

            return $publisher_details;
        },
        'update_callback' => function($value, $post) {
            // Sanitize and save the value
            if (is_array($value)) {
                $value['name'] = sanitize_text_field($value['name'] ?? '');
                $value['country'] = sanitize_text_field($value['country'] ?? '');
                $value['year_established'] = intval($value['year_established'] ?? 0);

                update_post_meta($post->ID, 'publisher_details', $value);
            }
        },
        'schema'          => [
            'description' => 'Publisher details including name, country, and year established.',
            'type'        => 'object',
            'context'     => ['view', 'edit'],
            'properties'  => [
                'name' => [
                    'type' => 'string',
                    'description' => 'Publisher Name',
                ],
                'country' => [
                    'type' => 'string',
                    'description' => 'Publisher Country',
                ],
                'year_established' => [
                    'type' => 'integer',
                    'description' => 'Year Established',
                ],
            ],
        ],
    ]);
});
