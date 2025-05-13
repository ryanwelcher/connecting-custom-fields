/* eslint-disable @wordpress/no-unsafe-wp-apis */
/**
 * WordPress dependencies
 */
import {
	ColorPicker,
	DatePicker,
	TextareaControl,
	TextControl,
	__experimentalToolsPanel as ToolsPanel,
	__experimentalToolsPanelItem as ToolsPanelItem,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const ToolsPanelExample = ( { meta, setMeta } ) => {
	const {
		author_name: name,
		author_title: title,
		author_email: email,
		author_bio: bio,
		author_favorite_color: favoriteColor,
		author_birthday: birthday,
	} = meta;
	return (
		<ToolsPanel
			label={ __( 'Guest Author', 'ccf' ) }
			resetAll={ () => null }
			dropdownMenuProps={ {
				popoverProps: {
					placement: 'left-start',
					offset: 259,
				},
			} }
		>
			<ToolsPanelItem
				hasValue={ () =>
					name.length > 0 ||
					email.length > 0 ||
					title.length > 0 ||
					bio.length > 0
				}
				isShownByDefault
				label={ __( 'Information', 'ccf' ) }
				onDeselect={ () => null }
			>
				<TextControl
					label={ __( 'Name' ) }
					value={ name }
					onChange={ ( author_name ) => {
						setMeta( {
							...meta,
							author_name,
						} );
					} }
				/>
				<TextControl
					label={ __( 'Title' ) }
					value={ title }
					onChange={ ( author_title ) => {
						setMeta( {
							...meta,
							author_title,
						} );
					} }
				/>
				<TextControl
					label={ __( 'Email' ) }
					value={ email }
					onChange={ ( author_email ) => {
						setMeta( {
							...meta,
							author_email,
						} );
					} }
				/>
				<TextareaControl
					label={ __( 'Biography' ) }
					value={ bio }
					onChange={ ( author_bio ) => {
						setMeta( {
							...meta,
							author_bio,
						} );
					} }
				/>
			</ToolsPanelItem>
			<ToolsPanelItem
				hasValue={ () => birthday.length > 0 }
				label={ __( 'Birthday', 'ccf' ) }
				onDeselect={ () => null }
			>
				<h3>{ __( 'Birthday', 'ccf' ) }</h3>
				<DatePicker
					currentDate={ birthday }
					onChange={ ( value ) => {
						updateMeta( {
							...meta,
							guest_birthday: value,
						} );
					} }
				/>
			</ToolsPanelItem>
			<ToolsPanelItem
				hasValue={ () => favoriteColor.length > 0 }
				label={ __( 'Favorite Color', 'ccf' ) }
				onDeselect={ () => null }
			>
				<h3>{ __( 'Favorite Color', 'ccf' ) }</h3>

				<ColorPicker
					color={ favoriteColor }
					onChange={ ( value ) => {
						updateMeta( {
							...meta,
							guest_favorite_color: value,
						} );
					} }
					enableAlpha
					defaultValue="#000"
				/>
			</ToolsPanelItem>
		</ToolsPanel>
	);
};

export default ToolsPanelExample;
