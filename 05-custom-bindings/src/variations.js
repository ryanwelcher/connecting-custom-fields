/**
 * WordPress dependencies
 */
import { registerBlockVariation } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

registerBlockVariation( 'core/paragraph', {
	name: 'ccf/post-data',
	title: __( 'Post Excerpt Binding', 'ccf' ),
	icon: 'text',
	description: __( 'Preset the excerpt from the custom binding', 'ccf' ),
	isActive: [
		'metadata.bindings.content.source',
		'metadata.bindings.content.args.key',
	],
	attributes: {
		placeholder: 'Post Excerpt',
		metadata: {
			bindings: {
				content: {
					source: 'ccf/post-data',
					args: {
						key: 'excerpt',
					},
				},
			},
		},
	},
	scope: [ 'inserter' ],
} );
