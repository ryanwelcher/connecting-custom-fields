/* eslint-disable @wordpress/no-unsafe-wp-apis */
/**
 * WordPress dependencies
 */
import {
	Button,
	Dropdown,
	TextControl,
	__experimentalDropdownContentWrapper as DropdownContentWrapper,
	TabPanel,
	PanelBody,
	DatePicker,
	ColorPicker,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const DropdownExample = ( { meta, updateMeta } ) => {
	const {
		guest_name: guestName,
		guest_email: guestEmail,
		guest_birthday: birthday,
		guest_favorite_color: favoriteColor,
	} = meta;

	return (
		<>
			<Dropdown
				popoverProps={ {
					placement: 'left-start',
					offset: 36,
				} }
				renderToggle={ ( { isOpen, onToggle } ) => (
					<>
						<Button
							variant="secondary"
							onClick={ onToggle }
							aria-haspopup="true"
							aria-expanded={ isOpen }
						>
							{ isOpen
								? __(
										'Hide Guest Author Information',
										'block-development-examples'
								  )
								: __(
										'Show Guest Author Information',
										'block-development-examples'
								  ) }
						</Button>
					</>
				) }
				renderContent={ () => (
					<DropdownContentWrapper
						paddingSize="none"
						style={ { width: '30rem' } }
					>
						<TabPanel
							className="my-tab-panel"
							activeClass="css-ms66sk"
							tabs={ [
								{
									name: 'info',
									title: 'Information',
								},
								{
									name: 'date',
									title: 'Birthday',
								},
								{
									name: 'color',
									title: 'Favorite Color',
								},
							] }
							children={ ( tab ) => {
								switch ( tab.name ) {
									case 'info': {
										return (
											<PanelBody>
												<TextControl
													label={ __(
														'Guest Name',
														'block-development-examples'
													) }
													value={ guestName }
													onChange={ ( value ) => {
														updateMeta( {
															...meta,
															guest_name: value,
														} );
													} }
												/>
												<TextControl
													label={ __(
														'Guest Email',
														'block-development-examples'
													) }
													value={ guestEmail }
													onChange={ ( value ) => {
														updateMeta( {
															...meta,
															guest_email: value,
														} );
													} }
												/>
											</PanelBody>
										);
									}
									case 'date': {
										return (
											<PanelBody>
												<DatePicker
													currentDate={ birthday }
													onChange={ ( value ) => {
														updateMeta( {
															...meta,
															guest_birthday: value,
														} );
													} }
												/>
											</PanelBody>
										);
									}
									case 'color': {
										return (
											<PanelBody>
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
											</PanelBody>
										);
									}
								}
							} }
						/>
					</DropdownContentWrapper>
				) }
			/>
		</>
	);
};
export default DropdownExample;
