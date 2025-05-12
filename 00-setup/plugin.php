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
 * Generate a ASCF Field Group
 */
 add_action(
	'acf/include_fields',
	function() {

	if ( ! function_exists( 'acf_add_local_field_group' ) ) {
		return;
	}

	acf_add_local_field_group(
		array(
			'key' => 'group_681516b29f2e0',
			'title' => 'ASCF Custom Meta',
			'fields' => array(
				array(
					'key' => 'field_681516b2dcfa3',
					'label' => 'A Message',
					'name' => 'message',
					'aria-label' => '',
					'type' => 'text',
					'instructions' => '',
					'required' => 0,
					'conditional_logic' => 0,
					'wrapper' => array(
						'width' => '',
						'class' => '',
						'id' => '',
					),
					'default_value' => 'Hello from [A|S]CF :P',
					'maxlength' => '',
					'allow_in_bindings' => 1,
					'placeholder' => '',
					'prepend' => '',
					'append' => '',
				),
				array(
					'key' => 'field_68221dbc54045',
					'label' => 'Related Posts',
					'name' => 'related_posts',
					'aria-label' => '',
					'type' => 'post_object',
					'instructions' => '',
					'required' => 0,
					'conditional_logic' => 0,
					'wrapper' => array(
						'width' => '',
						'class' => '',
						'id' => '',
					),
					'post_type' => '',
					'post_status' => '',
					'taxonomy' => '',
					'return_format' => 'object',
					'multiple' => 1,
					'allow_null' => 0,
					'allow_in_bindings' => 0,
					'bidirectional' => 0,
					'ui' => 1,
					'bidirectional_target' => array(
					),
				),
			),
			'location' => array(
				array(
					array(
						'param' => 'post_type',
						'operator' => '==',
						'value' => 'post',
					),
				),
				array(
					array(
						'param' => 'post_type',
						'operator' => '==',
						'value' => 'post',
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
			'show_in_rest' => 1,
		)
	);
} );


// Generate Pods setup
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
