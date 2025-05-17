/**
 * WordPress dependencies
 */
import { useSelect } from '@wordpress/data';
import { useEntityProp } from '@wordpress/core-data';
import { store as editorStore } from '@wordpress/editor';
import { useEffect } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import isEqual from 'lodash/isEqual';

/**
 * Custom hook to manage updating non-core meta.
 * @param {string} metaKey The meta key we need
 * @param {string} restType The REST API name of the post type we're going to update
 * @returns array
 */
const useUpdateNonCoreMeta = ( metaKey, restType = 'posts' ) => {
	// We need some information from the editor store.
	const { currentPostType, currentPostId, isSaving, edited, saved } =
		useSelect( ( select ) => {
			return {
				isSaving: select( editorStore ).isSavingPost(),
				edited: select( editorStore ).getEditedPostAttribute( metaKey ),
				saved: select( editorStore ).getCurrentPostAttribute( metaKey ),
				currentPostType: select( editorStore ).getCurrentPostType(),
				currentPostId: select( editorStore ).getCurrentPostId(),
			};
		} );

	// We need the meta and the updater function.
	const [ data, setData ] = useEntityProp(
		'postType',
		currentPostType,
		metaKey
	);

	// Save the meta when the posts saves and if it's changed.
	useEffect( () => {
		if ( isSaving && ! isEqual( edited, saved ) ) {
			return () =>
				apiFetch( {
					path: `/wp/v2/${ restType }/${ currentPostId }`,
					method: 'POST',
					data: {
						[ metaKey ]: data,
					},
				} ).then( ( response ) => console.log( response ) );
		}
	}, [ isSaving ] );

	// Return the meta and updater.
	return [ data, setData ];
};

export default useUpdateNonCoreMeta;
