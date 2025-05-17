import isEqual from 'lodash/isEqual';
/**
 * WordPress Dependencies
 */
import { useSelect } from '@wordpress/data';
import { useEntityProp } from '@wordpress/core-data';
import { store as editorStore } from '@wordpress/editor';
import { TextControl } from '@wordpress/components';
import { useEffect } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';

const AscfMeta = () => {
	// Get a bunch of information about the current post
	const { currentPostType, currentPostId, isSaving, edited, saved } =
		useSelect( ( select ) => {
			return {
				isSaving: select( editorStore ).isSavingPost(),
				edited: select( editorStore ).getEditedPostAttribute( 'acf' ),
				saved: select( editorStore ).getCurrentPostAttribute( 'acf' ),
				currentPostType: select( editorStore ).getCurrentPostType(),
				currentPostId: select( editorStore ).getCurrentPostId(),
			};
		} );

	// Get the ASCF meta for the current post
	const [ ascf, setAscfMeta ] = useEntityProp(
		'postType',
		currentPostType,
		'acf'
	);

	// Save the ASCF meta when the post is saved
	useEffect( () => {
		if ( isSaving && ! isEqual( edited, saved ) ) {
			return () =>
				apiFetch( {
					path: `/wp/v2/posts/${ currentPostId }`,
					method: 'POST',
					data: {
						acf: {
							...ascf,
						},
					},
				} );
		}
	}, [ isSaving ] );
	return (
		<>
			<TextControl
				label="Meta to retrieve"
				value={ ascf?.message }
				onChange={ ( message ) => updateASCF( { ...ascf, message } ) }
				__next40pxDefaultSize
				__nextHasNoMarginBottom
			/>
		</>
	);
};

export default AscfMeta;
