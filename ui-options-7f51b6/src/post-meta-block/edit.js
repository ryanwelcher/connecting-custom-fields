/**
 * External dependencies
 */
import sha256 from 'crypto-js/sha256';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	RichText,
	InspectorControls,
} from '@wordpress/block-editor';
import { TextControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { useEntityProp } from '@wordpress/core-data';
import { useEffect, useState } from '@wordpress/element';
/**
 * Internal dependencies
 */
import ToolsPanelExample from '../tools-panel-example';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit() {
	const [ hash, setHash ] = useState();
	const postType = useSelect(
		( select ) => select( 'core/editor' ).getCurrentPostType(),
		[]
	);

	const [ meta, setMeta ] = useEntityProp( 'postType', postType, 'meta' );

	const {
		guest_name: guestName,
		guest_email: guestEmail,
		guest_birthday: birthday,
		guest_favorite_color: favoriteColor,
	} = meta;

	useEffect( () => {
		const emailHash = sha256( guestEmail ).toString();
		setHash( emailHash );

		return () => {
			setMeta( {
				...meta,
				...{
					guest_name: '',
				},
			} );
		};
	} );

	return (
		<section { ...useBlockProps() }>
			{ hash?.length > 0 && (
				<img
					src={ `https://www.gravatar.com/avatar/${ hash }` }
					alt="Guest avatar"
					style={ { borderRadius: '50%' } }
				/>
			) }

			<RichText
				value={ guestName }
				placeholder={ __( 'Guest Name', 'block-development-examples' ) }
				onChange={ ( newName ) =>
					setMeta( {
						...meta,
						guest_name: newName,
					} )
				}
			/>
			<RichText
				value={ guestEmail }
				placeholder={ __(
					'Guest Email',
					'block-development-examples'
				) }
				onChange={ ( newEmail ) =>
					setMeta( {
						...meta,
						guest_email: newEmail,
					} )
				}
			/>
			<InspectorControls>
				<ToolsPanelExample meta={ meta } updateMeta={ setMeta } />
			</InspectorControls>
		</section>
	);
}
