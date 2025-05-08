/**
 * WordPress Dependencies
 */
import { useSelect } from '@wordpress/data';
import { useEntityProp } from '@wordpress/core-data';
import { store as editorStore } from '@wordpress/editor';
import { SelectControl } from '@wordpress/components';
import { useState } from 'react';
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';

const CoreMeta = () => {
	const [ metaType, setMetaType ] = useState( 'meta' );
	const { postType, postID } = useSelect( ( select ) => {
		const post = select( editorStore ).getCurrentPost();
		const postType = select( editorStore ).getCurrentPostType();

		return {
			postType,
			postID: post?.id,
		};
	}, [] );
	const [ coreMeta, updateCoreMeta ] = useEntityProp(
		'postType',
		postType,
		metaType,
		postID
	);

	console.log( coreMeta );

	// apiFetch( {
	// 	path: addQueryArgs( '/pods/v1/pods', { return_type: 'full' } ),
	// } ).then( ( res ) => {
	// 	console.log( res );
	// } );
	// apiFetch( {
	// 	path: addQueryArgs( '/pods/v1/pods/22', { include_fields: true } ),
	// } ).then( ( pods ) => {
	// 	console.log( pods );
	// } );
	return (
		<>
			<SelectControl
				label="Meta to retrieve"
				onChange={ ( newMeta ) => setMetaType( newMeta ) }
				options={ [
					{
						label: 'Core',
						value: 'meta',
					},
					{
						label: 'ASCF',
						value: 'acf',
					},
					{
						label: 'Pods',
						value: 'pods_message',
					},
				] }
				__next40pxDefaultSize
				__nextHasNoMarginBottom
			/>
		</>
	);
};

export default CoreMeta;
