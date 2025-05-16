/**
 * WordPress dependencies
 */
import { registerBlockVariation } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

/**
 * Register a paragraph block variation with meta binding
 */
registerBlockVariation( 'core/paragraph', {
	name: 'ccf/guest-author-name',
	icon: 'text',
	title: __( 'Guest Author Name', 'ccf' ),
	description: __( 'Display the author name', 'ccf' ),
	attributes: {
		metadata: {
			bindings: {
				content: {
					source: 'core/post-meta',
					args: {
						key: 'author_name',
					},
				},
			},
		},
	},
	isActive: [ 'metadata.bindings.content.args.key' ],
	scope: [ 'inserter', 'transform' ],
} );
