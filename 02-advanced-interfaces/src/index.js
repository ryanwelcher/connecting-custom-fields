/**
 * WordPress dependencies
 */
import { useEntityProp } from '@wordpress/core-data';
import { useSelect } from '@wordpress/data';
import {
	store as editorStore,
	PluginDocumentSettingPanel,
	PluginPostStatusInfo,
	PluginSidebar,
} from '@wordpress/editor';
import { __ } from '@wordpress/i18n';
import { registerPlugin } from '@wordpress/plugins';

/**
 * internal dependencies
 */
import DropdownExample from './dropdown-example';
import ToolsPanelExample from './tools-panel-example';

// List of registered meta for reference
//'author_name', 'author_title', 'author_email', 'author_bio', 'author_favorite_color', 'author_birthday',

registerPlugin( 'advanced-uis', {
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
				<PluginPostStatusInfo>
					<DropdownExample meta={ meta } setMeta={ setMeta } />
				</PluginPostStatusInfo>
				<PluginSidebar name="tools-panel-ui" icon="businessperson">
					<ToolsPanelExample meta={ meta } setMeta={ setMeta } />
				</PluginSidebar>
			</>
		);
	},
} );
