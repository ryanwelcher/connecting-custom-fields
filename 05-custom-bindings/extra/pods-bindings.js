/**
 * WordPress dependencies
 */
import {
	registerBlockBindingsSource,
	registerBlockVariation,
} from '@wordpress/blocks';
import { store as coreDataStore } from '@wordpress/core-data';
import { _x, __ } from '@wordpress/i18n';

registerBlockBindingsSource( {
	name: 'pods/bindings-field',
	label: _x( 'PODS', 'wc-lisboa' ),
	usesContext: [ 'postType', 'postId' ],
	getValues( { select, clientId, context, bindings } ) {
		const value = select( coreDataStore ).getEditedEntityRecord(
			'postType',
			context?.postType,
			context?.postId
		)?.[ bindings.content.args?.field ];

		return { content: value };
	},
	setValues( { select, clientId, dispatch, context, bindings } ) {
		// we need to use the PODS api to set this value.
		window.PodsDFVAPI.setFieldValue(
			bindings.content.args?.field,
			bindings.content.newValue,
			context?.postType
		);
	},
	canUserEditValue( { select, context, args } ) {
		return true;
	},
} );

registerBlockVariation( 'core/paragraph', {
	name: 'ccf/pods-binding',
	title: __( 'Pods Block Binding', 'ccf' ),
	icon: 'text',
	description: __( 'Preset a message binding from Pods', 'ccf' ),
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
