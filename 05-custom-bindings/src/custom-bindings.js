/**
 * WordPress dependencies
 */
import { registerBlockBindingsSource } from '@wordpress/blocks';

registerBlockBindingsSource( {
	name: 'ccf/post-data',
	usesContext: [ 'postType' ],
	getValues( { select, clientId, context, bindings } ) {
		const values = {};

		for ( const [ attributeName, source ] of Object.entries( bindings ) ) {
			values[ attributeName ] = select(
				'core/editor'
			).getEditedPostAttribute( source.args.key );
		}

		return values;
	},
	setValues( { select, clientId, dispatch, context, bindings } ) {
		const values = {};

		for ( const [ attributeName, source ] of Object.entries( bindings ) ) {
			values[ source.args.key ] = source.newValue;
		}

		if ( Object.keys( values ).length > 0 ) {
			dispatch( 'core/editor' ).editPost( values );
		}
	},
	canUserEditValue( { select, context, args } ) {
		return true;
	},
} );
