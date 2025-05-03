/**
 * WordPress dependencies
 */
import apiFetch from '@wordpress/api-fetch';
import { registerBlockBindingsSource } from '@wordpress/blocks';
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
