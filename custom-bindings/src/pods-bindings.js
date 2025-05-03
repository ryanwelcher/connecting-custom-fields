/**
 * WordPress dependencies
 */
import apiFetch from '@wordpress/api-fetch';
import { registerBlockBindingsSource } from '@wordpress/blocks';
import { debounce } from '@wordpress/compose';
import { store as coreDataStore } from '@wordpress/core-data';
import { _x } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { store as editorStore } from '@wordpress/block-editor';

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
		const postType =
			context?.postType || select( editorStore ).getCurrentPostType();

		// Check that editing is happening in the post editor and not a template.
		if ( postType === 'wp_template' ) {
			return false;
		}

		// Check that the custom field is not protected and available in the REST API.
		const isFieldExposed = !! select( coreDataStore ).getEntityRecord(
			'postType',
			postType,
			context?.postId
		)?.[ args?.key ];

		if ( ! isFieldExposed ) {
			return false;
		}

		// Check that the user has the capability to edit post meta.
		const canUserEdit = select( coreDataStore ).canUserEditEntityRecord(
			'postType',
			context?.postType,
			context?.postId
		);
		if ( ! canUserEdit ) {
			return false;
		}

		return true;
	},
} );
