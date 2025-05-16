/* eslint-disable @wordpress/no-unsafe-wp-apis */
/**
 * WordPress dependencies
 */
import { Dropdown } from '@wordpress/components';
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

	return (
		<>
			<Dropdown
				popoverProps={ {
					placement: 'left-start',
					offset: 36,
				} }
				renderToggle={ ( { isOpen, onToggle } ) => (
					<>Render something here for the button</>
				) }
				renderContent={ () => {
					return <div>Modal content</div>;
				} }
			/>
		</>
	);
};
export default DropdownExample;
