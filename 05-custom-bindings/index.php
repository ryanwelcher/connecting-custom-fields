<?php
/**
 * Plugin Name: 05 - Custom Block Bindings in Action
 */

/**
 * Register a custom block binding source
 */
add_action(
	'init',
	function() {
		register_block_bindings_source( 'ccf/post-data', [
			'label'              => __( 'Post Data', 'ccf' ),
			'get_value_callback' => 'ccf_post_data_callback',
			'uses_context'       => [ 'postId' ],
		]);
	}
);

function ccf_post_data_callback( $args, $block, $name ) {
	if ( ! isset( $args['key'] ) ) {
		return null;
	}

	$post_id = $block->context['postId'] ?? get_the_ID();

	if ( 'title' === $args['key'] ) {
		return get_post_field( 'post_title', $post_id );
	} elseif ( 'excerpt' === $args['key'] ) {
		return get_post_field( 'post_excerpt', $post_id );
	} elseif ( 'permalink' === $args['key'] ) {
		return get_permalink( $post_id );
	}

	return null;
}

add_action(
	'enqueue_block_editor_assets',
	function () {
		// Add our variation.
		$assets_file = plugin_dir_path( __FILE__ ) . '/build/variations.asset.php';
		if ( file_exists( $assets_file ) ) {
			$assets = include $assets_file;
			wp_enqueue_script(
				'variations',
				trailingslashit( plugin_dir_url( __FILE__ ) ) . 'build/variations.js',
				$assets['dependencies'],
				$assets['version'],
				true
			);
		}

		// Add the custom binding client side code.
		$bindings_assets_file = plugin_dir_path( __FILE__ ) . '/build/custom.asset.php';
		if ( file_exists( $bindings_assets_file ) ) {
			$bindings_assets = include $bindings_assets_file;
			wp_enqueue_script(
				'custom-bindings',
				trailingslashit( plugin_dir_url( __FILE__ ) ) . 'build/custom.js',
				$bindings_assets['dependencies'],
				$bindings_assets['version'],
				true
			);
		}
	}
);

// Uncomment below for some extra goodies for Pods and ASCF.
require_once trailingslashit( plugin_dir_path( __FILE__ ) ) . 'extra.php';
