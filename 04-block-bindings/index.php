<?php
/**
 * Plugin Name: 04 – Binding Core Blocks to Meta
 */

// Enqueue the JS we need to add Block Editor support for the various frameworks.
add_action(
	'enqueue_block_editor_assets',
	function () {
		$assets_file = plugin_dir_path( __FILE__ ) . '/build/index.asset.php';
		if ( file_exists( $assets_file ) ) {
			$assets = include $assets_file;
			wp_enqueue_script(
				'preset-variations',
				plugin_dir_url( __FILE__ ) . '/build/index.js',
				$assets['dependencies'],
				$assets['version'],
				true
			);
		}
	}
);
