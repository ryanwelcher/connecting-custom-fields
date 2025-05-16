/* eslint-disable @wordpress/no-unsafe-wp-apis */
/**
 * WordPress dependencies
 */
import {
	Button,
	ColorPicker,
	DatePicker,
	Dropdown,
	__experimentalDropdownContentWrapper as DropdownContentWrapper,
	PanelBody,
	TabPanel,
	TextControl,
	TextareaControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

// List of registered meta for reference
//'author_name', 'author_title', 'author_email', 'author_bio', 'author_favorite_color', 'author_birthday',

/**
 * An example of a dropdown component that shows guest author information.
 * @param {*} param0
 * @param {Object} param0.meta - The meta object containing the data.
 * @param {Function} param0.updateMeta - The function to update the meta object.
 */
const DropdownExample = ( { meta, setMeta } ) => {
	const {
		author_name: name,
		author_title: title,
		author_email: email,
		author_bio: bio,
		author_favorite_color: favoriteColor,
		author_birthday: birthday,
	} = meta;
w
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
									title: __( 'Information' ),
								},
								{
									name: 'date',
									title: __( 'Birthday' ),
								},
								{
									name: 'color',
									title: __( 'Favorite Color' ),
								},
							] }
							children={ ( tab ) => {
								switch ( tab.name ) {
									case 'info': {
										return (
											<PanelBody>
												<TextControl
													label={ __( 'Name' ) }
													value={ name }
													onChange={ (
														author_name
													) => {
														setMeta( {
															...meta,
															author_name,
														} );
													} }
												/>
												<TextControl
													label={ __( 'Title' ) }
													value={ title }
													onChange={ (
														author_title
													) => {
														setMeta( {
															...meta,
															author_title,
														} );
													} }
												/>
												<TextControl
													label={ __( 'Email' ) }
													value={ email }
													onChange={ (
														author_email
													) => {
														setMeta( {
															...meta,
															author_email,
														} );
													} }
												/>
												<TextareaControl
													label={ __( 'Biography' ) }
													value={ bio }
													onChange={ (
														author_bio
													) => {
														setMeta( {
															...meta,
															author_bio,
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
													onChange={ (
														author_birthday
													) => {
														setMeta( {
															...meta,
															author_birthday,
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
													onChange={ (
														author_favorite_color
													) => {
														setMeta( {
															...meta,
															author_favorite_color,
														} );
													} }
													copyFormat="hex"
													__next40pxDefaultSize
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
