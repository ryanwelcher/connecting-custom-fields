<?php
/**
 * Plugin Name: Retrieving and updating post meta
 * Description: A plugin to demonstrate how to retrieve post meta in the block editor
 */

// Enqueue getting-meta from a plugin.
add_action(
	'enqueue_block_editor_assets',
	function () {
		$assets_file = plugin_dir_path( __FILE__ ) . '/build/index.asset.php';

		if ( file_exists( $assets_file ) ) {
			$assets = include $assets_file;
			wp_enqueue_script(
				'script-handle',
				plugin_dir_url( __FILE__ ) . '/build/index.js',
				$assets['dependencies'],
				$assets['version'],
				true
			);
		}
	}
);

add_action(
	'init',
	function () {
		register_post_meta(
			'post',
			'author_name',
			[
				'single'       => true,
				'show_in_rest' => true,
				'type'         => 'string',
			]
		);
		register_post_meta(
			'post',
			'author_title',
			[
				'single'       => true,
				'show_in_rest' => true,
				'type'         => 'string',
			]
		);
		register_post_meta(
			'post',
			'author_email',
			[
				'single'       => true,
				'show_in_rest' => true,
				'type'         => 'string',
			]
		);
		register_post_meta(
			'post',
			'author_bio',
			[
				'single'       => true,
				'show_in_rest' => true,
				'type'         => 'string',
			]
		);
		// Register the rest of the post meta...
	}
);
