/**
 * WordPress Dependencies
 */
import { useSelect } from '@wordpress/data';
import { useEntityProp } from '@wordpress/core-data';
import { store as editorStore } from '@wordpress/editor';
import { TextControl, TextareaControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const CoreMeta = () => {
	const currentPostType = useSelect(
		( select ) => select( editorStore ).getCurrentPostType(),
		[]
	);
	const [ meta, setMeta ] = useEntityProp(
		'postType',
		currentPostType,
		'meta'
	);
	return (
		<>
			<TextControl
				label={ __( 'Author Name' ) }
				value={ meta?.author_name }
				onChange={ ( author_name ) =>
					setMeta( { ...meta, author_name } )
				}
				__next40pxDefaultSize
				__nextHasNoMarginBottom
			/>
			<TextControl
				label={ __( 'Author Email' ) }
				value={ meta?.author_email }
				onChange={ ( author_email ) =>
					setMeta( { ...meta, author_email } )
				}
				__next40pxDefaultSize
				__nextHasNoMarginBottom
			/>
			<TextControl
				label={ __( 'Author Title' ) }
				value={ meta?.author_title }
				onChange={ ( author_title ) =>
					setMeta( { ...meta, author_title } )
				}
				__next40pxDefaultSize
				__nextHasNoMarginBottom
			/>

			<TextareaControl
				label={ __( 'Author Bio' ) }
				value={ meta?.author_bio }
				onChange={ ( author_bio ) =>
					setMeta( { ...meta, author_bio } )
				}
				__next40pxDefaultSize
				__nextHasNoMarginBottom
			/>
		</>
	);
};

export default CoreMeta;
