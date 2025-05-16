/* eslint-disable @wordpress/no-unsafe-wp-apis */
/**
 * WordPress dependencies
 */
import {
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
			// Props for the Popover component - https://developer.wordpress.org/block-editor/reference-guides/components/popover/
			dropdownMenuProps={ {
				popoverProps: {
					placement: 'left-start',
					offset: 259,
				},
			} }
		>
			<ToolsPanelItem
				hasValue={ () => true }
				isShownByDefault
				label={ __( 'Panel Title', 'ccf' ) }
				onDeselect={ () => null }
			>
				<div>Panel Content goes here</div>
			</ToolsPanelItem>
		</ToolsPanel>
	);
};

export default ToolsPanelExample;
