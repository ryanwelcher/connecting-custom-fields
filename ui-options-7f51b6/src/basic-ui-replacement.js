/* eslint-disable @wordpress/no-unsafe-wp-apis */
/**
 * WordPress dependencies
 */
import { TextControl, TextareaControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const BasicUIReplacement = ( { meta, updateMeta } ) => {
	const {
		author_name: name,
		author_email: email,
		author_title: title,
		author_bio: bio,
		author_birthdate: birthday,
		author_favorite_color: favoriteColor,
	} = meta;
	return (
		<>
			<TextControl
				label={ __( 'Name' ) }
				value={ name }
				onChange={ ( value ) => {
					updateMeta( { ...meta, author_name: value } );
				} }
			/>
			<TextControl
				label={ __( 'Email' ) }
				value={ email }
				onChange={ ( value ) => {
					updateMeta( { ...meta, author_email: value } );
				} }
			/>
			<TextControl
				label={ __( 'Title' ) }
				value={ title }
				onChange={ ( value ) => {
					updateMeta( { ...meta, author_title: value } );
				} }
			/>
			<TextareaControl
				label={ __( 'Bio' ) }
				value={ bio }
				onChange={ ( value ) =>
					updateMeta( { ...meta, author_bio: value } )
				}
				__next40pxDefaultSize
				__nextHasNoMarginBottom
			/>
			{ /* <TextControl
				label={ __( 'Author Birthday' ) }
				value={ birthday }
				onChange={ ( value ) => {
					updateMeta( {
						...meta,
						author_birthdate: value,
					} );
				} }
			/>
			<TextControl
				label={ __( 'Favorite Color' ) }
				value={ favoriteColor }
				onChange={ ( value ) => {
					updateMeta( { ...meta, author_favorite_color: value } );
				} }
			/> */ }
		</>
	);
};

export default BasicUIReplacement;
