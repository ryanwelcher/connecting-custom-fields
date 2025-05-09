<?php
/**
 * Plugin Name:       Block Development Examples - Ui Options 7f51b6
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       block-development-examples
 *
 * @package           block-development-examples
 */
add_action(
	'enqueue_block_editor_assets',
	function () {
		$ui_options_7f51b6_file = plugin_dir_path( __FILE__ ) . '/build/ui.asset.php';

		if ( file_exists( $ui_options_7f51b6_file ) ) {
			$assets = include $ui_options_7f51b6_file;
			wp_enqueue_script(
				'ui-options-7f51b6',
				plugin_dir_url( __FILE__ ) . '/build/ui.js',
				$assets['dependencies'],
				$assets['version'],
				true
			);
		}
	}
);

/**
 * Register the post meta for our Guest Author
 */
add_action(
	'init',
	function () {
		// Name.
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
		register_post_meta(
			'post',
			'author_birthdate',
			[
				'single'       => true,
				'show_in_rest' => true,
				'type'         => 'string',
			]
		);
		register_post_meta(
			'post',
			'author_favorite_color',
			[
				'single'       => true,
				'show_in_rest' => true,
				'type'         => 'string',
			]
		);
		// Block.
		register_block_type( __DIR__ . '/build/post-meta-block' );
	}
);
