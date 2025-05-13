<?php
/**
 * Plugin Name:       03 – A Custom Block that Writes to Meta
 * Description:       Create a testimonial block that stores its content in post meta.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           1.0.3
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       post-meta-testimonial
 *
 * @package           block-developers-cookbook
 */

namespace BlockDevelopersCookbook;

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function post_meta_testimonial_block_init() {
	// Register our block.
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', __NAMESPACE__ . '\post_meta_testimonial_block_init' );
