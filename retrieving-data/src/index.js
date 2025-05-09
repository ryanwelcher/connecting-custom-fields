/**
 * WordPress dependencies
 */
import { registerPlugin } from '@wordpress/plugins';
import { PluginDocumentSettingPanel } from '@wordpress/editor';
import { TextControl, TextareaControl } from '@wordpress/components';

registerPlugin( 'simple-metabox-replacement', {
	render: () => {
		const [ meta, setMeta ] = useEntityProp( 'postType', 'post', 'meta' );
		return (
			<PluginDocumentSettingPanel
				name="guest-author"
				title="Guest Author"
			>
				<TextControl
					label="Name"
					value={ meta?.author_name }
					onChange={ ( author_name ) => {
						setMeta( { ...meta, author_name } );
					} }
				/>
				{ /* Other fields removed to save screen space */ }
				<TextareaControl
					label="Bio"
					value={ meta?.bio }
					onChange={ ( author_bio ) =>
						updateMeta( { ...meta, author_bio } )
					}
					__next40pxDefaultSize
					__nextHasNoMarginBottom
				/>
			</PluginDocumentSettingPanel>
		);
	},
} );









/**
 * Internal Dependencies
 */
import CoreMeta from './retrieve-core-meta';
import AscfMeta from './retrieve-ascf-meta';
import PodsMeta from './retrieve-pods-meta';

// // Pods
// apiFetch( {
// 	path: `/wp/v2/post/1`,
// 	method: 'POST',
// 	data: {
// 		a_message_from_pods: 'Hello from Pods',
// 	},
// } );

// // ASCF
// apiFetch( {
// 	path: `/wp/v2/post/1`,
// 	method: 'POST',
// 	data: {
// 		acf: {
// 			message: 'Hi there from ASCF!',
// 		},
// 	},
// } );
