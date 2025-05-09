/* eslint-disable @wordpress/no-unsafe-wp-apis */
/**
 * WordPress dependencies
 */
import {
	TextControl,
	__experimentalToolsPanel as ToolsPanel,
	__experimentalToolsPanelItem as ToolsPanelItem,
	DatePicker,
	ColorPicker,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const ToolsPanelExample = ( { meta, updateMeta } ) => {
	const {
		guest_name: guestName,
		guest_email: guestEmail,
		guest_birthday: birthday,
		guest_favorite_color: favoriteColor,
	} = meta;
	return (
		<ToolsPanel
			label={ __(
				'Tools Panel Component',
				'block-development-examples'
			) }
			resetAll={ () => null }
			dropdownMenuProps={ {
				popoverProps: {
					placement: 'left-start',
					offset: 259,
				},
			} }
		>
			<ToolsPanelItem
				hasValue={ () => guestName.length > 0 || guestEmail.length > 0 }
				label={ __( 'Information', 'block-development-examples' ) }
				onDeselect={ () => null }
			>
				<TextControl
					label={ __( 'Guest Name', 'block-development-examples' ) }
					value={ guestName }
					onChange={ ( value ) => {
						updateMeta( {
							...meta,
							guest_name: value,
						} );
					} }
				/>
				<TextControl
					label={ __( 'Guest Email', 'block-development-examples' ) }
					value={ guestEmail }
					onChange={ ( value ) => {
						updateMeta( {
							...meta,
							guest_email: value,
						} );
					} }
				/>
			</ToolsPanelItem>
			<ToolsPanelItem
				hasValue={ () => birthday.length > 0 }
				label={ __( 'Birthday', 'block-development-examples' ) }
				onDeselect={ () => null }
			>
				<h3>{ __( 'Birthday', 'block-development-examples' ) }</h3>
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
				label={ __( 'Favorite Color', 'block-development-examples' ) }
				onDeselect={ () => null }
			>
				<h3>
					{ __( 'Favorite Color', 'block-development-examples' ) }
				</h3>

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
