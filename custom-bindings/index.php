<?php
/**
 * Plugin Name: Custom Block Bindings
 * Description: Code to demonstrate custom bindings
 */

// Enqueue the JS we need to add Block Editor support for the various frameworks.
add_action(
    'enqueue_block_editor_assets',
    function() {

        // Add our variations
        $assets_file = plugin_dir_path( __FILE__ ) . '/build/variations.asset.php';
        if ( file_exists( $assets_file ) ) {
            $assets = include $assets_file;
            wp_enqueue_script(
                'variations',
                plugin_dir_url( __FILE__ ) . '/build/variations.js',
                $assets['dependencies'],
                $assets['version'],
                true
            );
        }
        // Is Pods runnings?
        if ( is_plugin_active( 'pods/init.php' ) ) {
            $pods_assets_file = plugin_dir_path( __FILE__ ) . '/build/pods.asset.php';
            if ( file_exists( $pods_assets_file ) ) {
                $pods_assets = include $pods_assets_file;
                wp_enqueue_script(
                    'pods-bindings',
                    plugin_dir_url( __FILE__ ) . '/build/pods.js',
                    $pods_assets['dependencies'],
                    $pods_assets['version'],
                    true
                );
            }
        }
        // IS ACF or SCF runnings?
        if ( is_plugin_active( 'advanced-custom-fields/acf.php' ) || is_plugin_active( 'secure-custom-fields/secure-custom-fields.php' ) ) {
            $ascf_assets_file = plugin_dir_path( __FILE__ ) . '/build/ascf.asset.php';
            if ( file_exists( $ascf_assets_file ) ) {
                $ascf_assets = include $ascf_assets_file;
                wp_enqueue_script(
                    'ascf-bindings',
                    plugin_dir_url( __FILE__ ) . '/build/ascf.js',
                    $ascf_assets['dependencies'],
                    $ascf_assets['version'],
                    true
                );
            }
        }
    }
);


/**
 * Hijack the $_POST object so the meta box doesn't override the set value.
 * @see https://www.advancedcustomfields.com/resources/acf-save_post/#examples
 */
add_action(
    'acf/save_post',
    function( $post_id ){
         // This is a SLEDGEHAMMER. Might want to get more subtle in here...
        // Get all the fields for this post
        $fields = get_field_objects( $post_id );
        // Unset the hidden field value in the $_POST object stored in the key property.
        unset( $_POST['acf'][$fields['ascf_message']['key']]);
    }, 
    5 // Run this action BEFORE the save happens 
);