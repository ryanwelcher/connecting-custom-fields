<?php
/**
 * Plugin Name: 00 - Workshop setup. Please activate before we get started
 * Description: This plugin does some basic setup for the things we're going to be working on today.
 */

/**
 * This is a workshop about post meta, I guess we need some.
 */
add_action(
	'init',
	function () {

		$string_meta = [
			'author_name',
			'author_title',
			'author_email',
			'author_bio',
			'author_favorite_color',
			'author_birthday',
		];

		foreach ( $string_meta as $meta_key ) {
			register_post_meta(
				'post',
				$meta_key,
				[
					'single'       => true,
					'show_in_rest' => true,
					'type'         => 'string',
				]
			);
		}
	}
);

/**
 * Generate Pods setup.
 */
function register_my_pods_config_93319791() {
	if ( ! function_exists( 'pods_register_type' ) ) {
		return;
	}

	$pod = array(
		'name' => 'post',
		'label' => 'Posts',
		'description' => '',
		'type' => 'post_type',
		'storage' => 'meta',
		'object' => 'post',
		'_migrated_28' => '1',
		'rest_enable' => '1',
		'rest_api_field_mode' => 'value',
		'rest_api_field_location' => 'object',
		'dynamic_features_allow' => 'inherit',
		'restrict_dynamic_features' => '1',
		'restricted_dynamic_features' => array(
			'form',
		),
		'restricted_dynamic_features_forms' => array(
			'edit',
		),
		'show_access_restricted_messages' => 'inherit',
		'show_access_admin_notices' => 'inherit',
	);

	pods_register_type( $pod['type'], $pod['name'], $pod );

	$group = array(
		'name' => 'more_fields',
		'label' => 'More Fields',
		'description' => '',
		'weight' => 0,
	);

	$group_fields = array(
		'a_message_from_pods' => array(
			'name' => 'a_message_from_pods',
			'label' => 'A message from PODS',
			'description' => '',
			'weight' => 0,
			'type' => 'text',
			'text_allowed_html_tags' => 'strong em a ul ol li b i',
			'text_max_length' => '255',
			'repeatable' => '0',
			'repeatable_format' => 'default',
			'default_evaluate_tags' => '0',
			'default_empty_fields' => '0',
			'roles_allowed' => 'administrator',
			'revisions_revision_field' => '0',
			'enable_conditional_logic' => '0',
			'rest_pick_response' => 'array',
			'rest_pick_depth' => '1',
			'required' => '0',
			'required_help_boolean' => '0',
			'rest_read' => '1',
			'rest_read_access' => '0',
			'rest_write' => '1',
			'text_trim' => '1',
			'text_trim_lines' => '0',
			'text_trim_p_brs' => '0',
			'text_trim_extra_lines' => '0',
			'text_allow_html' => '0',
			'text_sanitize_html' => '1',
			'text_allow_shortcode' => '0',
			'logged_in_only' => '0',
			'admin_only' => '0',
			'restrict_role' => '0',
			'restrict_capability' => '0',
			'hidden' => '0',
			'read_only' => '0',
		),
		'related_posts' => array(
			'name' => 'related_posts',
			'label' => 'Related Posts',
			'description' => '',
			'weight' => 1,
			'type' => 'pick',
			'pick_object' => 'post_type',
			'pick_val' => 'post',
			'pick_format_type' => 'multi',
			'pick_format_single' => 'dropdown',
			'pick_format_multi' => 'list',
			'pick_display_format_multi' => 'default',
			'pick_display_format_separator' => ', ',
			'pick_allow_add_new' => '0',
			'pick_taggable' => '0',
			'pick_show_icon' => '1',
			'pick_show_edit_link' => '1',
			'pick_show_view_link' => '1',
			'pick_limit' => '0',
			'pick_user_role' => 'Administrator',
			'pick_sync_taxonomy' => '0',
			'pick_sync_taxonomy_hide_taxonomy_ui' => '0',
			'pick_post_status' => 'publish',
			'pick_post_author' => '0',
			'repeatable' => '0',
			'repeatable_format' => 'default',
			'default_evaluate_tags' => '0',
			'default_empty_fields' => '0',
			'roles_allowed' => 'administrator',
			'revisions_revision_field' => '0',
			'enable_conditional_logic' => '0',
			'rest_pick_response' => 'id',
			'rest_pick_depth' => '1',
			'required' => '0',
			'required_help_boolean' => '0',
			'logged_in_only' => '0',
			'admin_only' => '0',
			'restrict_role' => '0',
			'restrict_capability' => '0',
			'hidden' => '0',
			'read_only' => '0',
			'rest_read' => '1',
			'rest_write' => '1',
		),
	);

	pods_register_group( $group, $pod['name'], $group_fields );

}
add_action( 'init', 'register_my_pods_config_93319791' );


// Register a Classic Meta box
if ( ! is_plugin_active( '02-advanced-interfaces/plugin.php' ) && ! is_plugin_active( '03-custom-block/plugin.php' ) ) {
	add_action(
		'add_meta_boxes',
		function ( $post_type ) {
			// Register the meta box.
			if ( 'post' === $post_type ) {
				add_meta_box(
					'some_meta_box_name',
					__( 'Guest Author' ),
					'render_meta_box_content',
					$post_type,
					'side'
				);
			}
		}
	);

	/**
	 * Render the meta box in the admin,
	 *
	 * @param object $post The post being saved.
	 */
	function render_meta_box_content( $post ) {
		// Add an nonce field so we can check for it later.
		wp_nonce_field( 'classic_meta_box_approach', 'classic_meta_box_approach_nonce' );

		// Use get_post_meta to retrieve an existing value from the database.
		$author_name  = get_post_meta( $post->ID, 'author_name', true );
		$author_email = get_post_meta( $post->ID, 'author_email', true );
		$author_title = get_post_meta( $post->ID, 'author_title', true );
		$author_bio   = get_post_meta( $post->ID, 'author_bio', true );

		// Display the form.
		?>
		<label for="guest_author_name">
			<?php esc_html_e( 'Name' ); ?>
			<input type="text" id="guest_author_name" name="guest_author_name" class="widefat" value="<?php echo esc_attr( $author_name ); ?>" size="25" />
		</label><br/><br/>
		<label for="guest_author_email">
			<?php esc_html_e( 'Email' ); ?>
			<input type="email" id="guest_author_email" name="guest_author_email" class="widefat" value="<?php echo esc_attr( $author_email ); ?>" size="25" />
		</label><br/><br/>
		<label for="guest_author_title">
			<?php esc_html_e( 'Title' ); ?>
			<input type="text" id="guest_author_title" name="guest_author_title" class="widefat" value="<?php echo esc_attr( $author_title ); ?>" size="25" />
		</label><br/><br/>
		<label for="guest_author_bio">
			<?php esc_html_e( 'Biography' ); ?>
			<textarea id="guest_author_bio" name="guest_author_bio" class="widefat" rows="5"><?php echo esc_textarea( $author_bio ); ?></textarea>
		</label>

		<?php
	}

	// Manage saving the meta box.
	add_action(
		'save_post',
		function ( $post_id ) {
			if ( ! isset( $_POST['classic_meta_box_approach_nonce'] ) ) {
				return $post_id;
			}

			// Verify that the nonce is valid.
			if ( ! wp_verify_nonce( sanitize_key( $_POST['classic_meta_box_approach_nonce'] ), 'classic_meta_box_approach' ) ) {
				return $post_id;
			}

			/*
			* If this is an autosave, our form has not been submitted,
			* so we don't want to do anything.
			*/
			if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
				return $post_id;
			}

			// Check the user's permissions.
			if ( isset( $_POST['post_type'] ) && 'page' === $_POST['post_type'] ) {
				if ( ! current_user_can( 'edit_page', $post_id ) ) {
					return $post_id;
				}
			} else {
				if ( ! current_user_can( 'edit_post', $post_id ) ) {
					return $post_id;
				}
			}

			// Update the meta field.
			// Sanitize the user input.
			$new_author_name  = isset( $_POST['guest_author_name'] ) ? sanitize_text_field( wp_unslash( $_POST['guest_author_name'] ) ) : false;
			$new_author_email = isset( $_POST['guest_author_email'] ) ? sanitize_text_field( wp_unslash( $_POST['guest_author_email'] ) ) : false;
			$new_author_title = isset( $_POST['guest_author_title'] ) ? sanitize_text_field( wp_unslash( $_POST['guest_author_title'] ) ) : false;
			$new_author_bio   = isset( $_POST['guest_author_bio'] ) ? sanitize_text_field( wp_unslash( $_POST['guest_author_bio'] ) ) : false;
			if ( $new_author_name ) {
				update_post_meta( $post_id, 'author_name', $new_author_name );
			}
			if ( $new_author_email ) {
				update_post_meta( $post_id, 'author_email', $new_author_email );
			}
			if ( $new_author_title ) {
				update_post_meta( $post_id, 'author_title', $new_author_title );
			}
			if ( $new_author_bio ) {
				update_post_meta( $post_id, 'author_bio', $new_author_bio );
			}
		}
	);
}
