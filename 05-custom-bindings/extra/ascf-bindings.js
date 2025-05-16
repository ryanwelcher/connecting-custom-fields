/**
 * WordPress dependencies
 */
import apiFetch from '@wordpress/api-fetch';
import {
	registerBlockBindingsSource,
	registerBlockVariation,
} from '@wordpress/blocks';
import { debounce } from '@wordpress/compose';
import { store as coreDataStore } from '@wordpress/core-data';
import { _x } from '@wordpress/i18n';

/**
 * Register the block binding source
 */
registerBlockBindingsSource( {
	name: 'acf/field',
	label: _x( '[A|S]CF Fields', 'wc-lisboa' ),
	usesContext: [ 'postType', 'postId' ],
	getValues( { select, clientId, context, bindings } ) {
		const value = select( coreDataStore ).getEditedEntityRecord(
			'postType',
			context?.postType,
			context?.postId
		).acf[ bindings.content.args.key ];
		return { content: value };
	},
	setValues( { select, clientId, dispatch, context, bindings } ) {
		const { postId, postType } = context;
		// Debounce the changes so we only make one request.
		const debounced = debounce( () => {
			// Send the values to the REST API.
			apiFetch( {
				path: `/wp/v2/${ postType }s/${ postId }`,
				method: 'POST',
				data: {
					acf: {
						[ bindings.content.args.key ]:
							bindings.content.newValue,
					},
				},
			} ).then( ( res ) => console.log( res ) );
		}, 3000 );
		debounced();
	},
	canUserEditValue( { select, context, args } ) {
		return true;
	},
} );

/**
 * Register a block variation.
 */
registerBlockVariation( 'core/paragraph', {
	name: 'ccf/ascf-binding',
	title: __( 'ASCF Block Binding', 'ccf' ),
	icon: 'text',
	description: __( 'Preset a message binding from ASCF', 'ccf' ),
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
						key: 'message',
					},
				},
			},
		},
	},
	scope: [ 'inserter' ],
} );
