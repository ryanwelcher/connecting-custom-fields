<?php
/**
 * Plugin Name: 02 - Building Custom UIs for Meta Fields
 * Description: In this exercise, we're going to learn the basics of reading and writing post meta in the block editor.
 * Text Domain: ccf
 */

// Enqueue the JS files we need for the block editor.
add_action(
	'enqueue_block_editor_assets',
	function () {
		$assets_file = plugin_dir_path( __FILE__ ) . '/build/index.asset.php';

		if ( file_exists( $assets_file ) ) {
			$assets = include $assets_file;
			wp_enqueue_script(
				'advanced-meta-ui',
				plugin_dir_url( __FILE__ ) . '/build/index.js',
				$assets['dependencies'],
				$assets['version'],
				true
			);
		}
	}
);
