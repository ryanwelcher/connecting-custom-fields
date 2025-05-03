/**
 * WordPress dependencies
 */
import { registerBlockVariation } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

registerBlockVariation( 'core/paragraph', {
	name: 'wc-lisboa/ascf-binding',
	title: __( 'ASCF Block Binding', 'wc-lisboa' ),
	icon: 'text',
	description: __( 'Preset a message binding from ASCF', 'wc-lisboa' ),
	isActive: [
		'metadata.bindings.content.source',
		'metadata.bindings.content.args.key',
	],
	attributes: {
		placeholder: 'A/S Custom Fields binding will go here',
		metadata: {
			bindings: {
				content: {
					source: 'acf/field',
					args: {
						key: 'ascf_message',
					},
				},
			},
		},
	},
	scope: [ 'inserter' ],
} );

registerBlockVariation( 'core/paragraph', {
	name: 'wc-lisboa/pods-binding',
	title: __( 'Pods Block Binding', 'wc-lisboa' ),
	icon: 'text',
	description: __( 'Preset a message binding from Pods', 'wc-lisboa' ),
	isActive: [
		'metadata.bindings.content.source',
		'metadata.bindings.content.args.field',
	],
	attributes: {
		content: 'Pods bindings will go here',
		metadata: {
			bindings: {
				content: {
					source: 'pods/bindings-field',
					args: {
						field: 'pods_message',
					},
				},
			},
		},
	},
	scope: [ 'inserter' ],
} );
