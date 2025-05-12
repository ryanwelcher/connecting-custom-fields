/**
 * WordPress dependencies
 */
import { registerPlugin } from '@wordpress/plugins';
import { PluginDocumentSettingPanel } from '@wordpress/editor';
import { __ } from '@wordpress/i18n';
import {
	TextControl,
	TextareaControl,
	DatePicker,
	ColorPicker,
	BaseControl,
} from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { useEntityProp } from '@wordpress/core-data';
import { store as editorStore } from '@wordpress/editor';

// List of registered meta for reference
//'author_name', 'author_title', 'author_email', 'author_bio', 'author_favorite_color', 'author_birthday',

/**
 * Register a SlotFill to the custom UI to the document settings panel.
 */
registerPlugin( 'simple-metabox-replacement', {
	render: () => {
		// We need some information from the editor store.
		const currentPostType = useSelect(
			( select ) => select( editorStore ).getCurrentPostType(),
			[]
		);

		// We need the meta and the updater function.
		const [ meta, setMeta ] = useEntityProp(
			'postType',
			currentPostType,
			'meta'
		);

		// This should only show on posts.
		if ( currentPostType !== 'post' ) {
			return null;
		}

		return (
			<>
				<PluginDocumentSettingPanel
					name="guest-author-meta"
					title={ __( 'Guest Author', 'ccf' ) }
				>
					<TextControl
						label="Name"
						value={ meta?.author_name }
						onChange={ ( author_name ) => {
							setMeta( { ...meta, author_name } );
						} }
						__next40pxDefaultSize
					/>

					<TextControl
						label="Email"
						value={ meta?.author_email }
						onChange={ ( author_email ) => {
							setMeta( { ...meta, author_email } );
						} }
						__next40pxDefaultSize
					/>

					<TextControl
						label="Title"
						value={ meta?.author_title }
						onChange={ ( author_title ) => {
							setMeta( { ...meta, author_title } );
						} }
						__next40pxDefaultSize
					/>

					<TextareaControl
						label={ __( 'Biography' ) }
						value={ meta?.author_bio }
						onChange={ ( author_bio ) =>
							setMeta( { ...meta, author_bio } )
						}
						__next40pxDefaultSize
					/>

					<BaseControl label={ __( 'Birthday' ) }>
						<DatePicker
							currentDate={ meta?.author_birthday }
							onChange={ ( author_birthday ) => {
								updateMeta( {
									...meta,
									author_birthday,
								} );
							} }
						/>
					</BaseControl>
					<BaseControl label={ __( 'Favorite Color' ) }>
						<ColorPicker
							color={ meta?.author_favorite_color }
							onChange={ ( author_favorite_color ) => {
								setMeta( {
									...meta,
									author_favorite_color,
								} );
							} }
							copyFormat="hex"
							defaultValue="#000"
						/>
					</BaseControl>
				</PluginDocumentSettingPanel>
			</>
		);
	},
} );
